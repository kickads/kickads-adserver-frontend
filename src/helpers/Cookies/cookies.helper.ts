import Cookies from 'js-cookie';

export function setCookie(cookieName: string, cookieValue: string): void {
  Cookies.set(cookieName, cookieValue);
}

export function getCookie(cookieName: string): string | undefined {
  return Cookies.get(cookieName);
}

export function deleteCookie(cookieName: string): void {
  Cookies.remove(cookieName);
}