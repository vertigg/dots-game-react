import { Colors, HEIGTH, WIDTH } from '../../components/helpers/contstants';

const inside = require('robust-point-in-polygon');

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
        captured: false,
        id: key
      };
      key += 1;
    }
  }
  return m;
};

const getNeighbors = (board, cell, color) => {
  // returns all neighbors with the same color as provided
  // todo: add filter for cells if they are already in cycles and only neighbors of this cell
  // put cells if they are already in cycles after
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

const detectCycleUtil = (
  board,
  vertex,
  visited,
  recStack,
  fromNode = null,
  startNode = null,
  polygonPath
) => {
  if (!visited[vertex.id]) {
    visited[vertex.id] = true;
    recStack[vertex.id] = true;
    polygonPath.push(vertex);
    let neighbors = getNeighbors(board, vertex, vertex.color);
    // Remove parent node from neighbors list
    if (fromNode) {
      neighbors = neighbors.filter(el => el.id !== fromNode.id);
    }

    for (let i = 0; i < neighbors.length; i++) {
      const currentNode = neighbors[i];
      // If not visited - traverse further
      if (
        !visited[currentNode.id] &&
        detectCycleUtil(board, currentNode, visited, recStack, vertex, startNode, polygonPath)
      ) {
        return true;
        // If vertex is visited && already in recursive stack && it's starter node
      }
      if (recStack[currentNode.id] && currentNode.id === startNode.id) {
        return true;
      }
    }
  }
  recStack[vertex.id] = false;
  polygonPath.pop(vertex);
  return false;
};

const detectCycle = (board, cell) => {
  const visited = {};
  const captured = [];
  const recStack = {};
  const polygonPath = [];

  const result = {
    success: false,
    polygon: null,
    captured,
    red: 0,
    blue: 0
  };

  if (detectCycleUtil(board, cell, visited, recStack, null, cell, polygonPath)) {
    // Possible cycle detected
    const polygon = polygonPath.map(el => [el.x, el.y]);
    // Check if polygon contains cells
    board.forEach(row => {
      row.forEach(point => {
        if (inside(polygon, [point.x, point.y]) === -1) {
          // "capture" points inside polygon
          captured.push(point.id);
          if (point.color !== Colors.EMPTY && point.Colors !== cell.color && !point.captured)
            if (cell.color === Colors.RED) {
              result.red += 1;
            } else {
              result.blue += 1;
            }
        }
      });
    });
    result.success = true;
    result.polygon = polygon;
    return result;
  }
  // if no cycle detected
  return result;
};

export default {
  createGrid,
  detectCycle
};
