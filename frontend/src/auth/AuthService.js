import { setToken, removeToken } from '../actions';
import authHeader from './Header';
import { store } from '../store';


function logout() {
  store.dispatch(removeToken());
}

function login(username, password) {
  const requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };
  return fetch('/api/login', requestOptions)
    .then((response) => {
      if (response.status === 400 || response.status === 401) {
        throw new Error('Bad response from server: ' + response.status);
      }
      return response.text();
    })
    .then((response) => {
      const data = JSON.parse(response);
      store.dispatch(setToken(data.token));
    })
    .catch(() => {
      throw new Error("Can't reach server");
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = JSON.parse(text);
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Invalid credentials');
      }
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      const error = response.status;
      return Promise.reject(error);
    }
    return data;
  });
}

export function loggedIn() {
  return store.getState().token !== null;
}

function getUserInfo() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch('/api/user', requestOptions)
    .then(handleResponse)
    .catch(() => {
      logout();
      window.location.reload();
    });
}

// todo
// function handleSignup(response){}

export const authService = {
  login,
  logout,
  getUserInfo,
};
