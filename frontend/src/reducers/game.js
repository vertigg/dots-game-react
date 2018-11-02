import { UPDATE_CELL, START_GAME, CAPTURE_CELLS } from '../actions/game';
import { Colors } from '../components/helpers/contstants';
import dots from '../actions/helpers/dots';

const initialPlayer = Colors.BLUE;
const initialGameState = {
  board: [],
  borders: [],
  moveInProgress: false,
  player: initialPlayer,
  status: 'inProgress',
  score: { red: 0, blue: 0 }
};

export default (state = initialGameState, { type, data }) => {
  switch (type) {
    case START_GAME:
      return {
        ...state,
        board: dots.createGrid(),
        borders: [],
        player: initialPlayer,
        status: 'inProgress',
        score: { red: 0, blue: 0 }
      };
    case CAPTURE_CELLS: {
      return {
        ...state,
        score: data.score,
        borders: [...state.borders, data.polygon],
        board: state.board.map(row =>
          row.map(
            cell =>
              data.captured.includes(cell.id) ? { ...cell, active: false, captured: true } : cell
          )
        )
      };
    }
    case UPDATE_CELL: {
      data.color = state.player;
      data.active = false;
      return {
        ...state,
        moveInProgress: true,
        player: state.player === Colors.RED ? Colors.BLUE : Colors.RED,
        board: state.board.map(row =>
          row.map(
            cell => (cell.id === data.id ? { ...cell, active: false, color: state.player } : cell)
          )
        )
      };
    }
    default:
      return state;
  }
};
