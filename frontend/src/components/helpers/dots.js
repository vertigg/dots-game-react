import { Colors, HEIGTH, WIDTH } from './contstants';

const createGrid = () => {
  const m = [];
  let key = 0;

  for (let i = 0; i < WIDTH; i++) {
    m[i] = [];
    for (let j = 0; j < HEIGTH; j++) {
      m[i][j] = {
        x: i,
        y: j,
        color: Colors.EMPTY,
        active: true,
        id: key,
      };
      key += 1;
    }
  }
  return m;
};

const getNeighbors = (cell) => {
  const neighbors = [];
  const { x, y } = cell;
  if (x > 0) neighbors.push([x - 1, y]);
  if (y < WIDTH - 1) neighbors.push([x, y + 1]);
  if (x < HEIGTH - 1) neighbors.push([x + 1, y]);
  if (y > 0) neighbors.push([x, y - 1]);
  return neighbors;
};

export default {
  createGrid,
  getNeighbors,
};
