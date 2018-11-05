import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame } from '../../actions/game';

class ResetButton extends Component {
  render() {
    return (
      <button className="btn btn-secondary form-control" onClick={this.props.startNewGame}>
        {this.props.title}
      </button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startNewGame: () => dispatch(startGame())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ResetButton);
