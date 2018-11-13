import React from 'react';
import { secondsToHms } from '../actions/helpers/utils';
import Board from './Board';

const SavedGame = ({ game }) => {
  const { winner, startedAt, endedAt, score, board, borders } = game;
  const winnerName = winner === 1 ? 'Red' : 'Blue';
  const winnerFormat = winner !== 0 ? `${winnerName} player` : 'Tie';
  const duration = secondsToHms(endedAt - startedAt);

  return (
    <tr>
      <th scope="row">{winnerFormat}</th>
      <td>
        {score.red} : {score.blue}
      </td>
      <td>{duration}</td>
      <td>
        <Board preview previewBoard={board} previewBorders={borders} />
      </td>
    </tr>
  );
};

export default SavedGame;
