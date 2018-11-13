import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors } from '../actions/helpers/contstants';
import { makeMove } from '../actions/game';

class Cell extends Component {
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

  handleClick = () => {
    const { cell, isFinished, moveOnClick } = this.props;
    if (!cell.isClickable || isFinished) return;
    moveOnClick(cell);
  };

  render() {
    return (
      <div className="cell-wrapper">
        <div
          role="presentation"
          className={this.getComponentClasses()}
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFinished: state.game.isFinished,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    moveOnClick: cell => dispatch(makeMove(cell)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cell);
