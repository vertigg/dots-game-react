import { Colors, HEIGTH, WIDTH } from './contstants';

const createGrid = () => {
  const m = [];
  let key = 0;

  for (let i = 0; i < HEIGTH; i++) {
    m[i] = [];
    for (let j = 0; j < WIDTH; j++) {
      m[i][j] = {
        x: i,
        y: j,
        color: Colors.EMPTY,
        active: true,
        id: key
      };
      key += 1;
    }
  }
  return m;
};

const getNeighbors = (board, cell, color) => {
  // returns all neighbors with the same color as provided
  // todo: add filter for cells that are already in cycles
  const neighbors = [];
  const { x, y } = cell;
  // North
  if (x > 0) neighbors.push(board[x - 1][y]);
  // North-East
  if (x > 0 && y < WIDTH - 1) neighbors.push(board[x - 1][y + 1]);
  // East
  if (y < WIDTH - 1) neighbors.push(board[x][y + 1]);
  // South East
  if (x < HEIGTH - 1 && y < WIDTH - 1) neighbors.push(board[x + 1][y + 1]);
  // South
  if (x < HEIGTH - 1) neighbors.push(board[x + 1][y]);
  // South West
  if (x < HEIGTH - 1 && y > 0) neighbors.push(board[x + 1][y - 1]);
  // West
  if (y > 0) neighbors.push(board[x][y - 1]);
  // North West
  if (x > 0 && y > 0) neighbors.push(board[x - 1][y - 1]);
  const result = neighbors.filter(el => el.color === color);
  return result;
};

const detectCycleUtil = (board, vertex, visited, recStack, fromNode = null) => {
  if (!visited[vertex.id]) {
    visited[vertex.id] = true;
    recStack[vertex.id] = true;
    let neighbors = getNeighbors(board, vertex, vertex.color);
    // remove parent node from neighbors list
    if (fromNode) {
      neighbors = neighbors.filter(el => el.id !== fromNode.id);
    }

    for (let i = 0; i < neighbors.length; i++) {
      const currentNode = neighbors[i];
      console.log('Parent', vertex, 'Child', currentNode);
      if (
        !visited[currentNode.id] &&
        detectCycleUtil(board, currentNode, visited, recStack, vertex)
      ) {
        return true;
      }
      if (recStack[currentNode.id]) {
        return true;
      }
    }
  }
  recStack[vertex.id] = false;
  return false;
};

const detectCycle = (board, cell) => {
  const visited = {};
  const recStack = {};

  if (detectCycleUtil(board, cell, visited, recStack)) {
    console.log('Cycle detected', recStack);
    return recStack;
  }
  console.log('No cycle detected');
  return {};
};

export default {
  createGrid,
  detectCycle
};
