import React, { Component } from 'react';
import Colors from './helpers/Colors';
import { store } from '../store';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cell: this.props.cell,
    };
  }

  handleClick = () => {
    if (!this.state.cell.active) {
      return;
    }
    const { cell } = this.state;
    const index = store.getState().player;
    cell.active = !cell.active;
    cell.color = index.player === 0 ? Colors.RED : Colors.BLUE;
    this.setState({ cell });
    this.props.onCellChange(cell);
  };

  getComponentClasses() {
    const { cell } = this.props;
    if (cell.color === Colors.EMPTY) {
      return 'cell-empty';
    }
    return cell.color === Colors.RED ? 'cell-red' : 'cell-blue';
  }

  render() {
    return (
      <div className="cell-wrapper">
        <div
          className={this.getComponentClasses()}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Cell;
