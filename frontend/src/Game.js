import React from 'react';
import Board from './components/Board'
import Score from './components/Score'
import { authService } from './auth/AuthService'
import { Link } from 'react-router-dom';


class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            board: new BoardObject(15)
        }
    };

    componentDidMount(){
        authService.get_nickname().then(user => this.setState({user}))
    }

    render(){
        return(
            <div>
                <h1>Welcome back, {this.state.user.user}</h1>
                <Link to="/login" ><button className="btn btn-primary" onClick={authService.logout}>Logout</button></Link>
                {/* <Score board={this.state.board}></Score> */}
                <Board board={this.state.board}></Board>
            </div>
        )
    };
}

var BoardObject = function (size) {
    this.current_player = 0;
    this.size = size;
    this.grid = createGrid(size);
};

function createGrid(size) {
    var m = []
    for (let i = 0; i < size.length; i++) {
        m[i] = [];
        for (let j = 0; j < size.length; j++) {
            m[i][j] = null;
        }
    }
    return m
};

export default Game;