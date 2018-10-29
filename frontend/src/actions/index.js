import * as actionTypes from './types';

export function setToken(data) {
  return {
    type: actionTypes.SET_TOKEN,
    data,
  };
}

export function removeToken() {
  return {
    type: actionTypes.REMOVE_TOKEN,
    data: null,
  };
}

export function switchPlayer() {
  return {
    type: actionTypes.SWITCH_PLAYER,
    data: 0 ? 1 : 0,
  };
}

export function createBoard(data) {
  return {
    type: actionTypes.CREATE_BOARD,
    data,
  };
}

export function updateBoard(data) {
  return {
    type: actionTypes.UPDATE_BOARD,
    data,
  };
}
