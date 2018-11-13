import React from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/auth';
import { apiEndpoints } from '../actions/helpers/contstants';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { login, error, history } = this.props;
    if (!(username && password)) {
      return;
    }

    login(username, password).then(() => {
      if (!error) {
        history.push({ pathname: '/' });
      }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { error } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <div className="container login-centered user-form col-sm-3 col-xs-6">
        <h1 className="display-4 text-center">Login</h1>
        <form onSubmit={this.handleSubmit}>
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
              !username && <div className="form-group text-danger small">Username is required</div>}
          </div>
          <div className="form-group">
            <span htmlFor="password">Password</span>
            <input
              className={`form-control ${submitted && !password ? 'is-invalid' : ''}`}
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {submitted &&
              !password && <div className="form-group text-danger small">Password is required</div>}
          </div>
          <div>
            <input className="btn btn-primary float-right" type="submit" value="Login" />
          </div>
        </form>
        <div className="form-group has-errors text-muted small">
          Don&apos;t have an account? Make one <a href="/signup">here</a>
        </div>
        <span className="form-group has-errors text-muted small">
          {error !== null && (
            <div className="form-alert alert-danger">
              {error.status === 400 ? 'Invalid credentials' : `${error.message}`}
            </div>
          )}
        </span>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(fetchToken(username, password, apiEndpoints.login)),
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
)(LoginPage);
