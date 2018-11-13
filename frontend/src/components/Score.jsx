import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions/game';
import { CELL_THRESHOLD } from '../actions/helpers/contstants';
import ResetButton from './buttons/ResetButton';
import HistoryButton from './buttons/HistoryButton';

const Score = ({ score, player }) => {
  const currentPlayer = player === 1 ? 'Red' : 'Blue';
  return (
    <div>
      <p>Score threshold: {CELL_THRESHOLD}</p>
      <p>Blue: {score.blue}</p>
      <p>Red: {score.red}</p>
      <p>Next move: {currentPlayer}</p>
      <ResetButton title="Reset game" />
      <HistoryButton />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    startNewGame: () => dispatch(startGame()),
  };
}

function mapStateToProps(state) {
  return {
    score: state.game.score,
    player: state.game.player,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Score);
