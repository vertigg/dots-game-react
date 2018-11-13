import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { retrieveHistory } from '../actions/history';
import SavedGame from './SavedGame';
import { removeToken } from '../actions/auth';

class History extends Component {
  componentDidMount() {
    const { getHistory } = this.props;
    getHistory();
  }

  render() {
    const {
      history: { games, loading, error },
    } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        {error !== null && (
          <h1 className="login-centered text-center">Can&apos;t retrieve history from server</h1>
        )}
        {loading && <h1 className="login-centered text-center">Loading</h1>}
        {error === null &&
          !loading &&
          games.length !== 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Winner</th>
                  <th scope="col">Score (Red:Blue)</th>
                  <th scope="col">Match duration</th>
                  <th scope="col">Board</th>
                </tr>
              </thead>
              <tbody>
                {games.map(el => (
                  <SavedGame game={el} key={el.startedAt} />
                ))}
              </tbody>
            </table>
          )}
        {!error &&
          !loading &&
          games.length === 0 && (
            <div className="login-centered text-center">Your match history is empty</div>
          )}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getHistory: () => dispatch(retrieveHistory()),
    logout: () => dispatch(removeToken()),
  };
}

function mapStateToProps(state) {
  return {
    history: state.history,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
