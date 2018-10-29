import { SWITCH_PLAYER, CREATE_BOARD, UPDATE_BOARD } from '../actions/types';

const initialPlayer = 0;
const initialBoard = [];

export const player = (state = initialPlayer, action) => {
  switch (action.type) {
    case SWITCH_PLAYER:
      return { ...state, player: state.player === 0 ? 1 : 0 };
    default:
      return state;
  }
};

export const board = (state = initialBoard, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return action.data;
    case UPDATE_BOARD:
      return state.map(
        (cell) =>
          cell.index === action.data.id
            ? { ...cell, active: action.data.active, color: action.data.color }
            : cell,
      );

    default:
      return state;
  }
};
