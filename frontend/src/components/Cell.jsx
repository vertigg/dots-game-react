import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors } from './helpers/contstants';
import { updateBoard } from '../actions/game';

class Cell extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state && !this.state.active) {
      // if cell has a state or state.active is false -> don't render
      if (!this.state.active && nextProps.cell.active) {
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
    if (!cell.active) return;
    this.setState({ active: cell.active });
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

function mapDispatchToProps(dispatch) {
  return {
    makeMove: cell => dispatch(updateBoard(cell))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Cell);
