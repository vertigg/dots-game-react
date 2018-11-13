import React, { Component } from 'react';
import { Colors } from '../actions/helpers/contstants';

class Border extends Component {
  getClassName = () => {
    const { color } = this.props;
    return color === Colors.RED ? 'border-red' : 'border-blue';
  };

  render() {
    const { coords } = this.props;
    return (
      <svg className="borders">
        <polygon points={coords} className={this.getClassName()} />
      </svg>
    );
  }
}

export default Border;
