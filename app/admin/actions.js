'use server';

import { cookies } from 'next/headers';
import crypto from 'node:crypto';

const COOKIE_NAME = 'ictflow_admin_session';
const SESSION_TTL = 8 * 60 * 60;

function tokenFor(secret) {
  return crypto.createHmac('sha256', secret).update('ictflow-admin-v1').digest('hex');
}

function sameSecret(a, b) {
  const left = Buffer.from(a || '');
  const right = Buffer.from(b || '');
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export async function loginAdmin(password) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    return { ok: false, error: 'Admin access is not configured on the server.' };
  }

  if (!sameSecret(password, secret)) {
    return { ok: false, error: 'Incorrect admin password.' };
  }

  const store = await cookies();
  store.set(COOKIE_NAME, tokenFor(secret), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL,
  });

  return { ok: true };
}

export async function getAdminSession() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return { ok: false };

  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value || '';
  return { ok: sameSecret(value, tokenFor(secret)) };
}

export async function logoutAdmin() {
  const store = await cookies();
  store.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/admin',
    maxAge: 0,
  });
}
