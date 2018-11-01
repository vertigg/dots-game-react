import { UPDATE_BOARD, START_GAME } from '../actions/types';
import { Colors } from '../components/helpers/contstants';
import dots from '../components/helpers/dots';

const initialPlayer = Colors.BLUE;
const initialGameState = {
  board: [],
  status: 'inProgress',
  cycles: [],
  player: Colors.RED
};

export default (state = initialGameState, { type, data }) => {
  switch (type) {
    case START_GAME:
      return {
        ...state,
        board: dots.createGrid(),
        player: initialPlayer,
        status: 'inProgress',
        borders: []
      };
    case UPDATE_BOARD: {
      data.color = state.player;
      data.active = false;
      dots.detectCycle(state.board, data); // detect cycles on board
      return {
        ...state,
        board: state.board.map(
          element =>
            element.id === data.id
              ? {
                  ...element,
                  active: false,
                  color: state.player
                }
              : element
        ),
        player: state.player === Colors.RED ? Colors.BLUE : Colors.RED
      };
    }
    default:
      return state;
  }
};
