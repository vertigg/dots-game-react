export const WIDTH = 20;
export const HEIGTH = 20;
export const CELL_SIZE = 24;
export const CELL_THRESHOLD = Math.round((WIDTH * HEIGTH) / 20);
export const TEST_THRESHOLD = 5;

export const Colors = {
  EMPTY: 0,
  RED: 1,
  BLUE: 2
};

export const apiEndpoints = {
  login: '/api/login',
  signup: '/api/signup',
  history: '/api/history'
};
