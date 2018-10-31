import React from 'react';
import { connect } from 'react-redux';
import Score from './Score';
import { store } from '../store';
import { switchPlayer, createBoard, updateBoard, setPlayer } from '../actions';
import Board from './Board';
import { Colors } from './helpers/contstants';
import NavBar from './NavBar';
import Dots from './helpers/dots';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.startNewGame();
  }

  makeMove = cell => {
    // move cell update in action
    cell.color = this.props.player.color;
    cell.active = false;

    Dots.detectCycle(this.props.board, cell);

    store.dispatch(switchPlayer());
    store.dispatch(updateBoard(cell));
  };

  startNewGame = () => {
    const board = Dots.createGrid();
    store.dispatch(createBoard(board));
    store.dispatch(setPlayer(Colors.RED));
    console.log('New game created');
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container m-2 ">
          <div className="row">
            <div className="col-2">
              <Score startNewGame={this.startNewGame} />
            </div>
            <div className="col-10">
              <Board onCellChange={this.makeMove} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.game,
    board: state.game.board,
    player: state.player
  };
}

export default connect(mapStateToProps)(Game);
