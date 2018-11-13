import { UPDATE_CELL, START_GAME, CAPTURE_CELLS, END_GAME } from '../actions/game';
import { Colors } from '../actions/helpers/contstants';
import dots from '../actions/helpers/dots';

const initialPlayer = Colors.BLUE;
const initialGameState = {
  board: [],
  borders: { blue: [], red: [] },
  player: initialPlayer,
  isFinished: false,
  score: { red: 0, blue: 0 },
  startedAt: null,
  endedAt: null,
  winner: 0,
};

export default (state = initialGameState, { type, data }) => {
  switch (type) {
    case START_GAME:
      return {
        ...state,
        board: dots.createGrid(),
        borders: { blue: [], red: [] },
        player: initialPlayer,
        isFinished: false,
        score: { red: 0, blue: 0 },
        startedAt: Math.round(Date.now() / 1000),
        winner: 0,
        endedAt: null,
      };
    case END_GAME:
      return {
        ...state,
        isFinished: true,
        endedAt: Math.round(Date.now() / 1000),
        board: state.board.map(row =>
          row.map(cell => (cell.isClickable ? { ...cell, isClickable: false } : cell)),
        ),
        winner: data,
      };
    case CAPTURE_CELLS: {
      return {
        ...state,
        score: data.score,
        borders: data.borders,
        board: data.board,
      };
    }
    case UPDATE_CELL: {
      data.color = state.player;
      data.isClickable = false;
      return {
        ...state,
        player: state.player === Colors.RED ? Colors.BLUE : Colors.RED,
        board: state.board.map(row =>
          row.map(
            cell =>
              cell.id === data.id ? { ...cell, isClickable: false, color: state.player } : cell,
          ),
        ),
      };
    }
    default:
      return state;
  }
};
