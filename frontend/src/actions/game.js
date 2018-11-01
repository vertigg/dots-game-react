import * as actionTypes from './types';

export function startGame() {
  return {
    type: actionTypes.START_GAME
  };
}

export function updateBoard(data) {
  return {
    type: actionTypes.UPDATE_BOARD,
    data
  };
}
