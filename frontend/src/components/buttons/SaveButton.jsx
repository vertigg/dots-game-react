import React from 'react';
import { connect } from 'react-redux';
import { saveGamePost } from '../../actions/history';

const SaveButton = ({ saveGame, title }) => (
  <button type="button" onClick={saveGame} className="btn btn-secondary form-control">
    {title}
  </button>
);

function mapDispatchToProps(dispatch) {
  return {
    saveGame: () => dispatch(saveGamePost()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(SaveButton);
