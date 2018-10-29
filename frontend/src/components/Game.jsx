import React from 'react';
import { Link } from 'react-router-dom';
import Score from './Score';
import { authService } from '../auth/AuthService';
import Colors from './helpers/Colors';
import { store } from '../store';
import { switchPlayer, createBoard, updateBoard } from '../actions';
import Board from './Board';
import { HEIGTH, WIDTH } from './helpers/contstants';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
  }

  handleCellChange = (cell) => {
    store.dispatch(switchPlayer());
    store.dispatch(updateBoard(cell));
  };

  componentDidMount() {
    this.startNewGame();
  }

  startNewGame = () => {
    const board = this.createGrid();
    store.dispatch(createBoard(board));
    this.setState({ board });
  };

  createGrid = () => {
    const m = [];
    let key = 0;
    for (let i = 0; i < HEIGTH; i++) {
      for (let j = 0; j < WIDTH; j++) {
        m.push({
          point: [i, j],
          id: key,
          active: true,
          color: Colors.EMPTY,
        });
        key += 1;
      }
    }
    return m;
  };

  render() {
    return (
      <div>
        <Link to="/login">
          <div className="btn btn-primary" onClick={authService.logout}>
            Logout
          </div>
        </Link>
        <Score />
        <Board onCellChange={this.handleCellChange} board={this.state.board} />
      </div>
    );
  }
}

export default Game;
