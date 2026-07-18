'use client';

import {useActionState} from 'react';
import type {LoginFormState} from './actions';
import {loginAction} from './actions';

const initialState: LoginFormState = {
  error: ''
};

function SubmitButton() {
  return (
    <button
      type="submit"
      className="inline-flex w-full items-center justify-center rounded-2xl bg-[#FF6C26] px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(255,108,38,0.18)] transition hover:bg-[#E85E1B]"
    >
      Sign in
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#111111]">
          Email
        </label>
        <input
          type="email"
          name="email"
          autoComplete="email"
          className="w-full rounded-2xl border border-[#ECE3DC] bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#FF6C26] focus:shadow-[0_0_0_4px_rgba(255,108,38,0.10)]"
          placeholder="admin@example.com"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#111111]">
          Password
        </label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="w-full rounded-2xl border border-[#ECE3DC] bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#FF6C26] focus:shadow-[0_0_0_4px_rgba(255,108,38,0.10)]"
          placeholder="••••••••"
          required
        />
      </div>

      {state?.error ? (
        <div className="rounded-2xl border border-[#FFD8C2] bg-[#FFF4ED] px-4 py-3 text-sm text-[#A15A33]">
          {state.error}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
