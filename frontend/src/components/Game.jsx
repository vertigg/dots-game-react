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
        {!this.props.isFinished ? (
          <div className="container m-2 ">
            <div className="row">
              <div className="col-2">
                <Score />
              </div>
              <div className="col-10">
                <Board />
              </div>
            </div>
          </div>
        ) : (
          <Summary />
        )}
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
