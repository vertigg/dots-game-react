import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import { CELL_SIZE, WIDTH, Colors } from '../actions/helpers/contstants';
import Border from './Border';

class Board extends Component {
  render() {
    const styles = {
      minWidth: CELL_SIZE * WIDTH,
      maxWidth: CELL_SIZE * WIDTH
    };

    let { board, borders } = this.props;
    if (this.props.preview) {
      board = this.props.previewBoard;
      borders = this.props.previewBorders;
    }
    const { blue, red } = borders;
    return (
      <React.Fragment>
        <div className="board" style={styles}>
          {blue.map((el, index) => (
            <Border key={`Blue:${index}`} color={Colors.BLUE} coords={el} />
          ))}
          {red.map((el, index) => (
            <Border key={`Red:${index}`} color={Colors.RED} coords={el} />
          ))}

          {board.map(row =>
            row.map(cell => <Cell x={cell.x} y={cell.y} key={cell.id} cell={cell} />)
          )}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.game.board,
    borders: state.game.borders
  };
}

export default connect(mapStateToProps)(Board);
