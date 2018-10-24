import React from 'react';

class Score extends React.Component{
    render(){
        return(
            <div>
                <h1>Dots grid </h1>
                <h3>{this.props.board.size} x {this.props.board.size}</h3>
            </div>
        )
    };
}

export default Score;