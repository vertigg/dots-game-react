import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HistoryButton extends Component {
  render() {
    return (
      <Link to="history/">
        <button className="btn btn-primary form-control">History</button>
      </Link>
    );
  }
}

export default HistoryButton;
