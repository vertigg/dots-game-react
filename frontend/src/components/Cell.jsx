import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors } from '../actions/helpers/contstants';
import { makeMove } from '../actions/game';

class Cell extends Component {
  handleClick = () => {
    const { cell } = this.props;
    if (!cell.isClickable || this.props.isFinished) return;
    this.setState({ isClickable: cell.isClickable });
    this.props.makeMove(cell);
  };

  getComponentClasses() {
    const { cell } = this.props;
    let styleClasses = '';
    if (cell.color === Colors.EMPTY) {
      styleClasses += 'cell-empty';
    } else {
      styleClasses += cell.color === Colors.RED ? 'cell-red' : 'cell-blue';
    }
    if (cell.isClickable) styleClasses += ' cell-active';
    return styleClasses;
  }

  render() {
    return (
      <div className="cell-wrapper">
        <div className={this.getComponentClasses()} onClick={this.handleClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFinished: state.game.isFinished
  };
}

function mapDispatchToProps(dispatch) {
  return {
    makeMove: cell => dispatch(makeMove(cell))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cell);
