'use server';

import {redirect} from 'next/navigation';
import {prisma} from '@/lib/prisma';
import {createAdminSession, verifyPassword} from '@/lib/admin-auth';

export type LoginFormState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = String(formData.get('email') || '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return {error: 'Email and password are required.'};
  }

  const user = await prisma.user.findUnique({
    where: {email}
  });

  if (!user || !user.isActive) {
    return {error: 'Invalid credentials.'};
  }

  const isValid = verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return {error: 'Invalid credentials.'};
  }

  await createAdminSession({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  await prisma.user.update({
    where: {id: user.id},
    data: {
      lastLoginAt: new Date()
    }
  });

  redirect('/admin');
}
