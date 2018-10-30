import React from 'react';
import { connect } from 'react-redux';

class Score extends React.Component {
  render() {
    const currentPlayer = this.props.color === 1 ? 'Red' : 'Blue';
    return (
      <div>
        <p>Next move: {currentPlayer}</p>
        <button
          className="btn btn-secondary form-control"
          onClick={this.props.startNewGame}
        >
          Reset field
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    color: state.player.color,
    board: state.game.board,
  };
}

export default connect(mapStateToProps)(Score);
