import dots from './helpers/dots';
import { CELL_THRESHOLD, Colors } from './helpers/contstants';
import { saveGameReset } from './history';

export const START_GAME = 'START_GAME';
export const UPDATE_CELL = 'UPDATE_CELL';
export const CAPTURE_CELLS = 'CAPTURE_CELLS';
export const END_GAME = 'END_GAME';

export function startGame() {
  return {
    type: START_GAME
  };
}

export function updateCell(data) {
  return {
    type: UPDATE_CELL,
    data
  };
}

export function captureCells(data) {
  return {
    type: CAPTURE_CELLS,
    data
  };
}

export function endGame(data) {
  return {
    type: END_GAME,
    data
  };
}

export function makeMove(cell) {
  return (dispatch, getState) => {
    // Update cell on board
    dispatch(updateCell(cell));
    const { board, score } = getState().game;
    // Detect cycles
    const calculateCycle = dots.detectCycle(board, cell);
    // If there is a cycle - update current board and score
    if (calculateCycle.success) {
      calculateCycle.score = {
        red: score.red + calculateCycle.red,
        blue: score.blue + calculateCycle.blue
      };
      dispatch(captureCells(calculateCycle));
    }
    // Check for win conditions
    const updatedScore = getState().game.score;
    let winner = null;

    // if one of the player capture more than half points on board
    if (updatedScore.red > CELL_THRESHOLD || updatedScore.blue > CELL_THRESHOLD) {
      winner = updatedScore.red > CELL_THRESHOLD ? Colors.RED : Colors.BLUE;
    }
    if (!dots.checkClickableCells(getState().game.board)) {
      if (updatedScore.red === updatedScore.blue) {
        winner = Colors.EMPTY;
      } else {
        winner = updatedScore.red > updatedScore.blue ? Colors.RED : Colors.BLUE;
      }
    }
    if (winner) {
      dispatch(saveGameReset());
      dispatch(endGame(winner));
    }
  };
}
