import React from 'react';
import { authService } from './AuthService'

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        authService.logout();

        this.state = {
            username: '',
            password: '',
            loading: false,
            submitted: false,
            error: ''
        };
    }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({submitted: true});
    const { username, password } = this.state;
    if (!(username && password)){
        return;
    }
    this.setState({loading: true});

    authService.login(username, password)
      .then((token) => {
        this.props.history.push({ pathname: "/" });
      },
      error => {
        console.log(error)
        this.setState({error: error.message})
      });
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
      const {username, password, submitted, error } = this.state
    return (
        <div className="container login-centered col-sm-3 col-xs-6 mt-5">
        <h1 className="display-4 text-center">Login</h1>
        <form onSubmit={this.handleSubmit}>
        <div className={'form-group' + (submitted && !username ? ' has-danger has-feedback' : '')}>
                <label className="form-control-label" htmlFor='username'>Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                        {submitted && !username &&
                            <div className="form-group text-danger small">Username is required</div>
                        }
            </div>
            <div className="form-group">
            <label htmlFor='password'>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        />
                    {submitted && !password &&
                            <div className="form-group text-danger small">Password is required</div>
                        }
            </div>
            <div>
                <input type="hidden" name="next" value="{{ next }}" />
                <input className="btn btn-primary float-right" type="submit" value="Login" />
            </div>
        </form>
        <div className="form-group has-errors text-muted small">
                Don't have an account? Make one <a href="/signup">here</a>
            </div>    
            <span className="form-group has-errors text-muted small"></span>
            {error &&
                <div className={'alert alert-danger'}>{error}</div>
            }
        </div>
    );
  }
}

export default LoginForm;
