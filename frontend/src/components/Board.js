import React from 'react';
import Intersection from './Intersection'

class Board extends React.Component{
    render(){
        var styles = {
            'maxWidth': (30*this.props.board.size)-this.props.board.size,
            'maxHeigth':(30*this.props.board.size)-this.props.board.size,
            margin: 'auto',
        }
        var intersections = []
        var k = 1
        for (var i = 0; i < this.props.board.size; i++)
            for (var j = 0; j < this.props.board.size; j++){
                intersections.push(<Intersection
                    board={this.props.board}
                    row={i}
                    col={j}
                    key={k}
                ></Intersection>);
                k+=1
            }
        return(
            <div style={styles} id='board'>{intersections}</div>
        )
    };
}

export default Board;