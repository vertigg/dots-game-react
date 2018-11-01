import { removeToken } from '../actions/auth';
import headers from './helpers/headers';
import { store } from '../store';

function logout() {
  store.dispatch(removeToken());
}

function handleErrors(promise) {
  if (!promise.ok) {
    if (promise.status === 400) {
      return Promise.reject(new Error(promise.status));
    }
    if (promise.status === 401) {
      logout();
      window.location.reload();
    }
    if (promise.status >= 500) {
      return Promise.reject(new Error('Server error'));
    }
  }
  return promise.text();
}

function apiRequest(endpoint) {
  return fetch(endpoint, headers.withToken())
    .then(handleErrors)
    .then(response => JSON.parse(response));
}

export function isLoggedIn() {
  console.log(store.getState().token.value);
  return store.getState().token.value !== null;
}

export const authService = {
  logout
};
