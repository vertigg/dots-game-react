import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import { CELL_MARGIN, CELL_SIZE, WIDTH } from './helpers/contstants';

class Board extends Component {
  render() {
    const styles = {
      minWidth: CELL_SIZE * WIDTH - WIDTH + CELL_MARGIN,
      maxWidth: CELL_SIZE * WIDTH - WIDTH + CELL_MARGIN,
      margin: 'auto'
    };
    return (
      <div className="board" style={styles}>
        {this.props.board.map(row =>
          row.map(cell => <Cell x={cell.x} y={cell.y} key={cell.id} cell={cell} />)
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.game.board
  };
}

export default connect(mapStateToProps)(Board);
