/**
 * Simple auth token storage for traditional JWT-based auth.
 * Used by API client to attach Authorization header and by AuthProvider for persistence.
 */

const ACCESS_TOKEN_KEY = "access_token";

export const getAccessToken = (): string => {
  if (typeof window === "undefined") {
    return '';
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
};

export const setAccessToken = (token: string) => {
  if (typeof window === "undefined") {
    return '';
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const clearAccessToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
