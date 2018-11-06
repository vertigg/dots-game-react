import headers from './helpers/requests';
import { store } from '../store';
import { apiEndpoints } from './helpers/contstants';

export const RETRIEVE_HISTORY_BEGIN = 'RETRIEVE_HISTORY_BEGIN';
export const RETRIEVE_HISTORY_SUCCESS = 'RETRIEVE_HISTORY_SUCCESS';
export const RETRIEVE_HISTORY_ERROR = 'RETRIEVE_HISTORY_ERROR';

export const SAVE_GAME_BEGIN = 'SAVE_GAME_BEGIN';
export const SAVE_GAME_SUCCESS = 'SAVE_GAME_SUCCESS';
export const SAVE_GAME_ERROR = 'SAVE_GAME_ERROR';
export const SAVE_GAME_RESET = 'SAVE_GAME_RESET';

export const retrieveHistoryBegin = () => ({ type: RETRIEVE_HISTORY_BEGIN });
export const retrieveHistorySuccess = data => ({ type: RETRIEVE_HISTORY_SUCCESS, data });
export const retrieveHistoryError = error => ({ type: RETRIEVE_HISTORY_ERROR, data: error });

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

export function retrieveHistory() {
  return dispatch => {
    dispatch(retrieveHistoryBegin());
    return fetch(apiEndpoints.history, headers.apiGet())
      .then(handleErrors)
      .then(response => {
        const data = JSON.parse(response);
        dispatch(retrieveHistorySuccess(data));
        return data.token;
      })
      .catch(error => {
        dispatch(retrieveHistoryError(error));
      });
  };
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
      startedAt: game.startedAt,
      endedAt: game.endedAt
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
