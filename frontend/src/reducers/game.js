import { SWITCH_PLAYER, CREATE_BOARD, UPDATE_BOARD, SET_PLAYER } from '../actions/types';
import { Colors } from '../components/helpers/contstants';

const initialPlayer = Colors.BLUE;
const initialBoard = [];

export const player = (state = { color: initialPlayer }, { type, data }) => {
  switch (type) {
    case SET_PLAYER:
      return {
        ...state,
        color: data
      };

    case SWITCH_PLAYER:
      return {
        ...state,
        color: state.color === Colors.RED ? Colors.BLUE : Colors.RED
      };
    default:
      return state;
  }
};

export const game = (state = { board: initialBoard, status: 'inProgress' }, { type, data }) => {
  switch (type) {
    case CREATE_BOARD:
      return {
        ...state,
        board: data
      };
    case UPDATE_BOARD:
      return {
        ...state,
        board: state.board.map(
          cell =>
            cell.id === data.id
              ? {
                  ...cell,
                  active: data.active,
                  color: data.color
                }
              : cell
        )
      };

    default:
      return state;
  }
};
