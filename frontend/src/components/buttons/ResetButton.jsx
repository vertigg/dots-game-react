import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../../actions/game';

const ResetButton = ({ startNewGame, title }) => (
  <button type="button" className="btn btn-secondary form-control" onClick={startNewGame}>
    {title}
  </button>
);

function mapDispatchToProps(dispatch) {
  return {
    startNewGame: () => dispatch(startGame()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ResetButton);
