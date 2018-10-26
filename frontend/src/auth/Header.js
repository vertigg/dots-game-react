import { store } from '../store';

function authHeader() {
  const token = store.getState().token;
  if (token) {
    return { Authorization: 'Token ' + token };
  }
  else {
    return {}
  }
}

export default authHeader;
