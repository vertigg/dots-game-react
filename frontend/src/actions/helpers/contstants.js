export const WIDTH = 20;
export const HEIGTH = 20;
export const CELL_SIZE = 25;
export const CELL_MARGIN = 1;
export const CELL_THRESHOLD = Math.round((WIDTH * HEIGTH) / 5);
export const TEST_THRESHOLD = 1;

export const Colors = {
  EMPTY: 0,
  RED: 1,
  BLUE: 2
};

export const apiEndpoints = {
  login: '/api/login',
  signup: '/api/signup',
  history: '/api/history/'
};
