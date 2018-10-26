import React from 'react';
import { authService } from '../auth/AuthService';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    authService.logout();

    this.state = {
      username: '',
      password: '',
      loading: false,
      submitted: false,
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (!(username && password)) { return; }
    this.setState({ loading: true });

    authService.login(username, password)
      .then(() => {
        this.props.history.push({ pathname: '/' });
      })
      .catch((error) => {
        if (error.message === '400') {
          this.setState({ error: 'Invalid credentials' });
        } else {
          this.setState({ error: error.message });
        }
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      username,
      password,
      submitted,
      error,
    } = this.state;

    return (
        <div className="container login-centered user-form col-sm-3 col-xs-6">
        <h1 className="display-4 text-center">Login</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
                <label className="form-control-label" htmlFor='username'>Username</label>
                    <input
                        className={`form-control ${submitted && !username ? 'is-invalid' : ''}`}
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                        {submitted && !username && <div className="form-group text-danger small">Username is required</div>}
            </div>
            <div className="form-group">
            <label htmlFor='password'>Password</label>
                    <input
                        className={`form-control ${submitted && !password ? 'is-invalid' : ''}`}
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        />
                    {submitted && !password
                    && <div className="form-group text-danger small">Password is required</div>
                    }
            </div>
            <div>
                <input type="hidden" name="next" value="{{ next }}" />
                <input className="btn btn-primary float-right" type="submit" value="Login" />
            </div>
        </form>
        <div className="form-group has-errors text-muted small">Don&apos;t have an account? Make one <a href="/signup">here</a>
            </div>
            <span className="form-group has-errors text-muted small">
            {error && <div className={'form-alert alert-danger'}>{error}</div>
            }</span>
        </div>
    );
  }
}

export default LoginPage;
