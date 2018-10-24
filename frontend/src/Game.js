import React from 'react';
import Board from './components/Board'
import Score from './components/Score'

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board: new BoardObject(15)
        }
    };

    render(){
        return(
            <div>
                <Score board={this.state.board}></Score>
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