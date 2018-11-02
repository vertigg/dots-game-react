import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions/game';

class Score extends React.Component {
  render() {
    const currentPlayer = this.props.player === 1 ? 'Red' : 'Blue';
    return (
      <div>
        <p>Blue: {this.props.score.blue}</p>
        <p>Red: {this.props.score.red}</p>
        <p>Next move: {currentPlayer}</p>
        <button className="btn btn-secondary form-control" onClick={this.props.startNewGame}>
          Reset field
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startNewGame: () => dispatch(startGame())
  };
}

function mapStateToProps(state) {
  return {
    score: state.game.score,
    player: state.game.player,
    board: state.game.board
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Score);
