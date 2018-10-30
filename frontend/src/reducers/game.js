import {
  SWITCH_PLAYER,
  CREATE_BOARD,
  UPDATE_BOARD,
  SET_PLAYER,
} from '../actions/types';
import { Colors } from '../components/helpers/contstants';

const initialPlayer = Colors.BLUE;
const initialBoard = [];

export const player = (state = { color: initialPlayer }, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        color: action.data,
      };

    case SWITCH_PLAYER:
      return {
        ...state,
        color: state.color === Colors.RED ? Colors.BLUE : Colors.RED,
      };
    default:
      return state;
  }
};

export const game = (
  state = { board: initialBoard, status: 'inProgress' },
  action,
) => {
  switch (action.type) {
    case CREATE_BOARD:
      return {
        ...state,
        board: action.data,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        board: state.board.map(
          (cell) =>
            cell.index === action.data.id
              ? {
                  ...cell,
                  active: action.data.active,
                  color: action.data.color,
                }
              : cell,
        ),
      };

    default:
      return state;
  }
};
