import { setToken, removeToken } from '../actions';
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

function authorize(endpoint, username, password) {
  return fetch(endpoint, headers.authorization(username, password))
    .then(handleErrors)
    .then((response) => {
      const data = JSON.parse(response);
      store.dispatch(setToken(data.token));
    });
}

function apiRequest(endpoint) {
  return fetch(endpoint, headers.withToken())
    .then(handleErrors)
    .then((response) => JSON.parse(response));
}

function login(username, password) {
  return authorize('login', username, password);
}

function signup(username, password) {
  return authorize('signup', username, password);
}

function getUsername() {
  return apiRequest('user');
}

export function isLoggedIn() {
  return store.getState().token !== null;
}

export const authService = {
  login,
  logout,
  signup,
  getUsername,
};
