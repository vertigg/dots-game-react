import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions/game';
import Board from './Board';
import NavBar from './NavBar';
import Score from './Score';
import Summary from './Summary';

class Game extends React.Component {
  componentDidMount() {
    this.props.startNewGame();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container m-2 col-6 col-md-4 mw-100 d-flex justify-content-center">
          <div className="left-control">{!this.props.isFinished ? <Score /> : <Summary />}</div>
          <div>
            <Board />
          </div>
        </div>
      </React.Fragment>
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
    isFinished: state.game.isFinished,
    game: state.game,
    board: state.game.board,
    player: state.game.player
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
