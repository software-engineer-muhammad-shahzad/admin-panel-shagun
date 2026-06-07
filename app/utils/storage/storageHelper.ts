// src/utils/storage.ts

export type StorageType = "local" | "session" | "cookie";

const getStorage = (type: StorageType): Storage | null => {
  if (type === "local") return localStorage;
  if (type === "session") return sessionStorage;
  return null;
};

/* -----------------------------
   COOKIE HELPERS
------------------------------ */

const setCookie = (key: string, value: string, days = 7) => {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${key}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
};

const getCookie = (key: string): string | null => {
  if (typeof document === "undefined") return null;

  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const parts = decodedCookie.split(";");

  for (let part of parts) {
    part = part.trim();
    if (part.indexOf(name) === 0) {
      return part.substring(name.length);
    }
  }

  return null;
};

const removeCookie = (key: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

/* -----------------------------
   STORAGE FUNCTIONS
------------------------------ */

export const saveData = <T>(
  key: string,
  value: T,
  type: StorageType = "local"
): void => {
  if (type === "cookie") {
    setCookie(key, JSON.stringify(value));
    return;
  }

  if (typeof window === "undefined") return;

  getStorage(type)!.setItem(key, JSON.stringify(value));
};

export const getData = <T>(
  key: string,
  type: StorageType = "local"
): T | null => {
  if (type === "cookie") {
    const cookieValue = getCookie(key);
    if (!cookieValue) return null;

    try {
      return JSON.parse(cookieValue) as T;
    } catch {
      return null;
    }
  }

  if (typeof window === "undefined") return null;

  const item = getStorage(type)!.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};

export const removeData = (
  key: string,
  type: StorageType = "local"
): void => {
  if (type === "cookie") {
    removeCookie(key);
    return;
  }

  if (typeof window === "undefined") return;
  getStorage(type)!.removeItem(key);
};

// clear everything
export const clearAllData = (): void => {
  if (typeof window === "undefined") return;

  // Clear storage
  localStorage.clear();
  sessionStorage.clear();

  // Clear cookies
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

    document.cookie =
      name.trim() +
      "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }
};