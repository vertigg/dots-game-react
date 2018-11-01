import headers from '../auth/helpers/headers';

export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const FETCH_TOKEN_BEGIN = 'FETCH_TOKEN_BEGIN';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR';

export const fetchTokenBegin = () => ({
  type: FETCH_TOKEN_BEGIN
});

export const fetchTokenSuccess = token => ({
  type: FETCH_TOKEN_SUCCESS,
  data: { token }
});

export const fetchTokenError = error => ({
  type: FETCH_TOKEN_ERROR,
  data: error
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.text();
}

export function fetchToken(username, password) {
  return dispatch => {
    dispatch(fetchTokenBegin());
    return fetch('api/login', headers.authorization(username, password))
      .then(handleErrors)
      .then(response => {
        console.log(response);
        const data = JSON.parse(response);
        dispatch(fetchTokenSuccess(data.token));
        return data.token;
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchTokenError(error));
      });
  };
}

export function removeToken() {
  return {
    type: REMOVE_TOKEN
  };
}
