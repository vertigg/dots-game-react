import React from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/auth';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      submitted: false
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
    if (!(username && password1) || password1 !== password2 || password1.length <= 5) {
      return;
    }

    this.props.signup(username, password1).then(() => {
      this.props.history.push({ pathname: '/' });
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
              <label className="form-control-label" htmlFor="username">
                Username
              </label>
              <input
                className={`form-control ${submitted && !username ? 'is-invalid' : ''}`}
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              {submitted &&
                !username && (
                  <div className="form-group text-danger small">Username is required</div>
                )}
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="password1">
                Password
              </label>
              <input
                className={`form-control ${
                  submitted && password1 !== password2 ? 'is-invalid' : ''
                }`}
                type="password"
                name="password1"
                value={this.state.password1}
                onChange={this.handleChange}
              />
              {submitted &&
                password1.length <= 5 &&
                password1.length > 0 && (
                  <ul id="passwordHelpInline" className={'text-danger small'}>
                    Password is too short
                  </ul>
                )}
              {submitted &&
                password1 !== password2 && (
                  <ul id="passwordHelpInline" className={'text-danger small'}>
                    Passwords don&apos;t match
                  </ul>
                )}
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="password2">
                Confirm password
              </label>
              <input
                className={`form-control ${
                  submitted && password1 !== password2 ? 'is-invalid' : ''
                }`}
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange}
              />
            </div>
            <input className="btn btn-primary float-right" type="submit" />
          </div>
        </form>
        <span className="form-group has-errors text-muted small">
          {error && <div className={'form-alert alert-danger'}>{error}</div>}
        </span>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (username, password) => dispatch(fetchToken(username, password, 'signup')) // Add endpoint
  };
}

function mapStateToProps(state) {
  return {
    loading: state.token.loading,
    error: state.token.error
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
