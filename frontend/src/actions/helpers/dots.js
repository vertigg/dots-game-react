import { Colors, HEIGTH, WIDTH } from './contstants';
import { convertCoordsToPolygon } from './utils';

const inside = require('robust-point-in-polygon');

const checkClickableCells = board => board.some(row => row.some(el => el.isClickable === true));

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
        id: key,
        isClickable: true,
        isCaptured: false,
        isVertex: false,
      };
      key += 1;
    }
  }
  return m;
};

const getAvailableNeighbors = (board, cell) => {
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
  const result = neighbors.filter(el => el.color === cell.color && !el.isCaptured);
  return result;
};

const detectCycleUtil = (
  board,
  vertex,
  visited,
  recStack,
  fromNode = null,
  startNode = null,
  cyclePath,
) => {
  if (!visited[vertex.id]) {
    visited[vertex.id] = true;
    recStack[vertex.id] = true;
    cyclePath.push(vertex);
    let neighbors = getAvailableNeighbors(board, vertex);
    // Remove parent node from neighbors list
    if (fromNode) {
      neighbors = neighbors.filter(el => el.id !== fromNode.id);
    }

    for (let i = 0; i < neighbors.length; i++) {
      const currentNode = neighbors[i];
      // If not visited - traverse further
      if (
        !visited[currentNode.id] &&
        detectCycleUtil(board, currentNode, visited, recStack, vertex, startNode, cyclePath)
      ) {
        return true;
        // If vertex is not visited && already in recursive stack && it's starter node
      }
      // if node in recStack and it is a starter node - cycle detected
      // prevent cycle detection if cycle path length is only 3 points
      if (recStack[currentNode.id] && currentNode.id === startNode.id && cyclePath.length > 3) {
        return true;
      }
    }
  }
  recStack[vertex.id] = false;
  cyclePath.pop(vertex);
  return false;
};

const detectCycle = (board, startNode) => {
  // get board and starter cell
  // get all cell's neighbors
  const starterNeighbors = getAvailableNeighbors(board, startNode);
  const possibleCycles = [];
  const borders = { blue: [], red: [] };
  const capturedPoints = [];
  const result = {
    board,
    success: false,
    borders,
    capturedPoints,
    red: 0,
    blue: 0,
  };

  // for each neighbors we try to find cycles
  starterNeighbors.forEach(neighbor => {
    const visited = {};
    const recStack = {};
    const cyclePath = [];

    // startNode is already visited and must be in recursive stack
    visited[startNode.id] = true;
    recStack[startNode.id] = true;
    cyclePath.push(startNode);

    if (detectCycleUtil(board, neighbor, visited, recStack, startNode, startNode, cyclePath)) {
      // Gather possible cycles
      possibleCycles.push(cyclePath);
    }
  });

  // Sort possible cycles by length (smaller first)
  if (possibleCycles.length) {
    possibleCycles.sort((a, b) => a.length - b.length);
    // For each cycle build polygon and check if polygon contains points of different color
    possibleCycles.forEach(cycle => {
      const polygon = cycle.map(el => [el.x, el.y]);
      const capturedByCycle = [];
      // Check if polygon contains cells
      board.forEach(row => {
        row.forEach(point => {
          if (inside(polygon, [point.x, point.y]) === -1) {
            capturedByCycle.push(point);
          }
        });
      });
      // Check if polygon contains cells
      if (capturedByCycle.length) {
        if (
          // Check if polygon contains enemy cells
          capturedByCycle.some(el => el.color !== startNode.color && !el.isCaptured)
        ) {
          cycle.forEach(el => {
            board[el.x][el.y].isVertex = true;
          });
          capturedByCycle.forEach(el => {
            capturedPoints.push(el);
            if (el.color !== Colors.EMPTY && el.color !== startNode.color && !el.isCaptured)
              if (startNode.color === Colors.RED) {
                result.red += 1;
              } else {
                result.blue += 1;
              }
            board[el.x][el.y].isClickable = false;
            board[el.x][el.y].isCaptured = true;
          });
          if (startNode.color === Colors.RED) {
            result.borders.red.push(convertCoordsToPolygon(polygon));
          } else {
            result.borders.blue.push(convertCoordsToPolygon(polygon));
          }
        }
      }
    });
  }
  if (capturedPoints.length) result.success = true;
  return result;
};

export default {
  createGrid,
  detectCycle,
  checkClickableCells,
};
