import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isLoggedIn, removeToken } from '../actions/auth';

const NavBar = ({ logout }) => (
  <React.Fragment>
    {isLoggedIn() && (
      <nav className="navbar navbar-dark bg-dark justify-content-between">
        <h6 className="navbar-brand">Dots game</h6>
        <Link to="/login">
          <button type="button" title="Logout" className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </Link>
      </nav>
    )}
  </React.Fragment>
);

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(removeToken()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
