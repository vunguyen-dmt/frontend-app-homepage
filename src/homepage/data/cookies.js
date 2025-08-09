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

// export const setCookie = (name, value, days, domain) => {
//   let expires = '';
//   if (days) {
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     expires = `; expires=${date.toUTCString()}`;
//   }
//   document.cookie = `${name}=${value || ''}${expires}; path=/;domain=${domain}`;
// };
