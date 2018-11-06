import React, { Component } from 'react';
import { Colors } from '../actions/helpers/contstants';

class Border extends Component {
  getClassName = () => (this.props.color === Colors.RED ? 'border-red' : 'border-blue');

  render() {
    return (
      <svg className="borders">
        <polygon points={this.props.coords} className={this.getClassName()} />
      </svg>
    );
  }
}

export default Border;
