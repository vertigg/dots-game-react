import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isLoggedIn, authService } from '../auth/AuthService';

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        {isLoggedIn() && (
          <nav className="navbar navbar-dark bg-dark justify-content-between">
            <h6 className="navbar-brand">Dots game</h6>
            <Link to="/login">
              <button className="btn btn-primary" onClick={authService.logout}>
                Logout
              </button>
            </Link>
          </nav>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token
  };
}

export default connect(mapStateToProps)(NavBar);
