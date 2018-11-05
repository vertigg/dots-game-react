import headers from './helpers/headers';
import { store } from '../store';
import { apiEndpoints } from './helpers/contstants';

export const SAVE_GAME_BEGIN = 'SAVE_GAME_BEGIN';
export const SAVE_GAME_SUCCESS = 'SAVE_GAME_SUCCESS';
export const SAVE_GAME_ERROR = 'SAVE_GAME_ERROR';
export const SAVE_GAME_RESET = 'SAVE_GAME_RESET';

export const saveGameReset = () => ({ type: SAVE_GAME_RESET });
export const saveGameBegin = () => ({ type: SAVE_GAME_BEGIN });
export const saveGameSuccess = () => ({ type: SAVE_GAME_SUCCESS });
export const saveGameError = error => ({
  type: SAVE_GAME_ERROR,
  data: error
});

function handleErrors(response) {
  if (!response.ok) {
    console.log(response.text());
    throw Error(response.statusText);
  }
  return response.text();
}

export function saveGamePost(endpoint) {
  return dispatch => {
    dispatch(saveGameBegin());
    // Save current game
    const { game } = store.getState();
    const body = {
      board: game.board,
      borders: game.borders,
      winner: game.winner,
      score: game.score,
      started_at: game.started_at,
      ended_at: game.ended_at
    };
    return fetch(apiEndpoints.history, headers.apiPost(JSON.stringify(body)))
      .then(handleErrors)
      .then(response => {
        dispatch(saveGameSuccess());
      })
      .catch(error => {
        dispatch(saveGameError(error));
      });
  };
}
