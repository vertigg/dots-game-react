import { CELL_SIZE } from './contstants';

export function secondsToHms(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
}

export function convertCoordsToPolygon(iterable) {
  // converts cells x, y to relative x, y based on cell size
  let polygonPointsStr = '';
  iterable.forEach(element => {
    polygonPointsStr += `${element[1] * CELL_SIZE + CELL_SIZE / 2},`;
    polygonPointsStr += `${element[0] * CELL_SIZE + CELL_SIZE / 2} `;
  });
  return polygonPointsStr.trim();
}
