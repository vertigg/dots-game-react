import React from 'react';
import { Link } from 'react-router-dom';

const HistoryButton = () => (
  <Link to="history/">
    <button type="button" className="btn btn-primary form-control">
      History
    </button>
  </Link>
);

export default HistoryButton;
