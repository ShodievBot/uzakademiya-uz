import 'server-only';
import {createHmac, scryptSync, timingSafeEqual} from 'node:crypto';
import {cookies} from 'next/headers';
import {prisma} from '@/lib/prisma';

const ADMIN_SESSION_COOKIE = 'admin_session';

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      'ADMIN_SESSION_SECRET must be set and contain at least 32 characters'
    );
  }

  return secret;
}

export function verifyPassword(
  password: string,
  passwordHash: string
) {
  const parts = passwordHash.split(':');

  if (parts.length !== 3 || parts[0] !== 'scrypt') {
    return false;
  }

  const [, salt, storedHash] = parts;
  const derived = scryptSync(password, salt, 64).toString('hex');

  const a = Buffer.from(derived, 'hex');
  const b = Buffer.from(storedHash, 'hex');

  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

function signSessionValue(value: string) {
  const secret = getAdminSessionSecret();
  const signature = createHmac('sha256', secret).update(value).digest('hex');
  return `${value}.${signature}`;
}

function verifySignedSessionValue(signedValue: string) {
  const lastDot = signedValue.lastIndexOf('.');

  if (lastDot === -1) return null;

  const value = signedValue.slice(0, lastDot);
  const signature = signedValue.slice(lastDot + 1);

  const expected = createHmac('sha256', getAdminSessionSecret())
    .update(value)
    .digest('hex');

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;

  return value;
}

type AdminSessionPayload = {
  userId: string;
  email: string;
  role: string;
};

function encodePayload(payload: AdminSessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function decodePayload(value: string): AdminSessionPayload | null {
  try {
    const json = Buffer.from(value, 'base64url').toString('utf8');
    return JSON.parse(json) as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function createAdminSession(payload: AdminSessionPayload) {
  const cookieStore = await cookies();
  const encoded = encodePayload(payload);
  const signed = signSessionValue(encoded);

  cookieStore.set(ADMIN_SESSION_COOKIE, signed, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!raw) return null;

  const verified = verifySignedSessionValue(raw);
  if (!verified) return null;

  return decodePayload(verified);
}

export async function getCurrentAdminUser() {
  const session = await getAdminSession();

  if (!session?.userId) return null;

  const user = await prisma.user.findUnique({
    where: {id: session.userId}
  });

  if (!user || !user.isActive) return null;

  return user;
}
