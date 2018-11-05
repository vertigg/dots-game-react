import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors } from '../actions/helpers/contstants';
import { makeMove } from '../actions/game';

class Cell extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state && !this.state.isClickable) {
      // if cell has a state or state.active is false -> don't render
      if (!this.state.isClickable && nextProps.cell.isClickable) {
        // if state is false and cell recieves cell with active===true -> rerender and refresh state
        this.setState({ active: true });
        return true;
      }
      return false;
    }
    if (nextState !== null) {
      // new cells don't have state, so recieving a new state should rerender them
      return true;
    }
    return false;
  }

  handleClick = () => {
    const { cell } = this.props;
    if (!cell.isClickable || this.props.isFinished) return;
    this.setState({ isClickable: cell.isClickable });
    this.props.makeMove(cell);
  };

  getComponentClasses() {
    const { cell } = this.props;
    if (cell.color === Colors.EMPTY) return 'cell-empty';
    return cell.color === Colors.RED ? 'cell-red' : 'cell-blue';
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
