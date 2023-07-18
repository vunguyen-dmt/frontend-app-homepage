import { getConfig } from '@edx/frontend-platform';
import Cookies from 'universal-cookie';

export function setCookie(cookieName, cookieValue, cookieExpiry) {
  const cookies = new Cookies();
  const hostName = window.location.hostname;
  const options = { domain: hostName.replace('apps', ''), path: '/' };
  if (cookieExpiry) {
    options.expires = cookieExpiry;
  }
  cookies.set(cookieName, cookieValue, options);
}

export function getCookie(cookieName) {
  const cookies = new Cookies();
  return cookies.get(cookieName);
}