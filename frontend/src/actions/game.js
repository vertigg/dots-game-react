import dots from './helpers/dots';

export const START_GAME = 'START_GAME';
export const UPDATE_CELL = 'UPDATE_CELL';
export const CAPTURE_CELLS = 'CAPTURE_CELLS';

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

export function makeMove(cell) {
  return (dispatch, getState) => {
    console.log('Make move at', cell);
    // Update cell on board
    dispatch(updateCell(cell));
    const { board, score } = getState().game;
    // Detect cycles
    const calculateCycle = dots.detectCycle(board, cell);
    // If there is a cycle - update score and mark inner cells as "captured"
    if (calculateCycle.success) {
      calculateCycle.score = {
        red: score.red + calculateCycle.red,
        blue: score.blue + calculateCycle.blue
      };
      dispatch(captureCells(calculateCycle));
    }
  };
}
