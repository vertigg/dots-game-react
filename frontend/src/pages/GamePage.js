import React from 'react';
import { Link } from 'react-router-dom';
import Board from '../components/Board';
import Score from '../components/Score';
import { authService } from '../auth/AuthService';


function createGrid(size) {
  const m = [];
  for (let i = 0; i < size.length; i++) {
    m[i] = [];
    for (let j = 0; j < size.length; j++) {
      m[i][j] = null;
    }
  }
  return m;
}

function BoardObject(size) {
  this.current_player = 0;
  this.size = size;
  this.grid = createGrid(size);
}


class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      board: new BoardObject(15),
    };
  }

  componentDidMount() {
    authService.getUsername().then((data) => {
      this.setState({ username: data.user });
    });
  }

  render() {
    return (
        <div>
            <h1>Welcome back, {this.state.username}</h1>
            <Link to="/login" ><button className="btn btn-primary" onClick={authService.logout}>Logout</button></Link>
            <Score board={this.state.board}></Score>
            <Board board={this.state.board}></Board>
        </div>
    );
  }
}

export default GamePage;
