import React, { Component } from 'react';
import Cell from './Cell';
import { CELL_MARGIN, CELL_SIZE, WIDTH } from './helpers/contstants';

class Board extends Component {
  render() {
    const styles = {
      minWidth: CELL_SIZE * WIDTH - WIDTH + CELL_MARGIN,
      maxWidth: CELL_SIZE * WIDTH - WIDTH + CELL_MARGIN,
      margin: 'auto',
    };
    return (
      <div className="board" style={styles}>
        {this.props.board.map((cell) => (
          <Cell
            onCellChange={this.props.onCellChange}
            key={cell.id}
            cell={cell}
          />
        ))}
      </div>
    );
  }
}

export default Board;
