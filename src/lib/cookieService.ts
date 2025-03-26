"use server";

import { cookies } from "next/headers";

async function getCookieStore() {
  return cookies();
}

async function createCookie(key: string, value: string) {
  const cookieStore = await getCookieStore();
  cookieStore.set(key, value, { secure: true });
}

async function readCookie(key: string) {
  const cookieStore = await getCookieStore();
  return cookieStore.get(key);
}

async function removeCookie(key: string) {
  const cookieStore = await getCookieStore();
  cookieStore.delete(key);
}

async function checkCookie(key: string) {
  const cookieStore = await getCookieStore();
  return cookieStore.has(key);
}

export { createCookie, readCookie, removeCookie, checkCookie };
