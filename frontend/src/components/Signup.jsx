import React from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/auth';
import { apiEndpoints } from '../actions/helpers/contstants';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      submitted: false,
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { username, password1, password2 } = this.state;
    const { signup, error, history } = this.props;
    if (!(username && password1) || password1 !== password2 || password1.length <= 5) {
      return;
    }

    signup(username, password1).then(() => {
      if (!error) {
        history.push({ pathname: '/' });
      }
    });
  };

  render() {
    const { error } = this.props;
    const { username, password1, password2, submitted } = this.state;

    return (
      <div className="container login-centered user-form col-sm-3 col-xs-6">
        <h1 className="display-4 text-center">Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="form-group">
              <span className="form-control-label" htmlFor="username">
                Username
              </span>
              <input
                className={`form-control ${submitted && !username ? 'is-invalid' : ''}`}
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              {submitted &&
                !username && (
                  <div className="form-group text-danger small">Username is required</div>
                )}
            </div>
            <div className="form-group">
              <span label="lel" className="form-control-label" htmlFor="password1">
                Password
              </span>
              <input
                className={`form-control ${
                  submitted && password1 !== password2 ? 'is-invalid' : ''
                }`}
                type="password"
                name="password1"
                value={password1}
                onChange={this.handleChange}
              />
              {submitted &&
                password1.length <= 5 &&
                password1.length > 0 && (
                  <ul id="passwordHelpInline" className="text-danger small">
                    Password is too short
                  </ul>
                )}
              {submitted &&
                password1 !== password2 && (
                  <ul id="passwordHelpInline" className="text-danger small">
                    Passwords don&apos;t match
                  </ul>
                )}
            </div>
            <div className="form-group">
              <span className="form-control-label" htmlFor="password2">
                Confirm password
              </span>
              <input
                className={`form-control ${
                  submitted && password1 !== password2 ? 'is-invalid' : ''
                }`}
                type="password"
                name="password2"
                value={password2}
                onChange={this.handleChange}
              />
            </div>
            <input className="btn btn-primary float-right" type="submit" />
          </div>
        </form>
        <span className="form-group has-errors text-muted small">
          {error !== null && (
            <div className="form-alert alert-danger">
              {error.status === 400 ? 'User already exists' : `${error.message}`}
            </div>
          )}
        </span>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (username, password) => dispatch(fetchToken(username, password, apiEndpoints.signup)),
  };
}

function mapStateToProps(state) {
  return {
    loading: state.authStatus.loading,
    error: state.authStatus.error,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupPage);
