import { store } from '../../store';

function withToken() {
  const { token } = store.getState();
  if (token !== null) {
    return {
      method: 'GET',
      headers: { Authorization: `Token ${token}` },
    };
  }
  return {};
}

function authorization(username, password) {
  return {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };
}

export default{
  withToken,
  authorization,
};
