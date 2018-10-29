import React from 'react';
import { connect } from 'react-redux';

class Score extends React.Component {
  render() {
    const totalDots = this.props.board.filter((cell) => cell.active === false)
      .length;
    return (
      <div>
        <h1>Total dots: {totalDots}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
  };
}

export default connect(mapStateToProps)(Score);
