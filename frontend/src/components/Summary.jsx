import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ResetButton from './buttons/ResetButton';
import SaveButton from './buttons/SaveButton';
import { saveGameReset } from '../actions/history';

class Summary extends Component {
  render() {
    const winnerName = this.props.winner === 1 ? 'Red' : 'Blue';
    const winnerFormat = this.props.winner !== 0 ? `${winnerName} player won!` : "It's a tie!";
    const { saving, saved, error } = this.props.history;
    return (
      <React.Fragment>
        <div className="container login-centered text-center col-sm-3 col-xs-6">
          {error && (
            <div>
              <h1>{error}</h1>
              <div className="row">
                <div className="col">
                  <SaveButton title="Retry save" />
                </div>
                <div className="col">
                  <ResetButton title="Start new game" />
                </div>
              </div>
            </div>
          )}
          {saved && (
            <React.Fragment>
              <h1>Game saved!</h1>
              <div className="row">
                <div className="col">
                  <Link to="/history">
                    <button className="btn btn-secondary form-control">History</button>
                  </Link>
                </div>
                <div className="col">
                  <ResetButton title="Start new game" />
                </div>
              </div>
            </React.Fragment>
          )}
          {saving &&
            !error && (
              <React.Fragment>
                <div className="row">
                  <div className="lds-ripple col-sm-2 float-right ">
                    <div />
                  </div>
                  <div className="col-sm-8 float-left">
                    <h1>Saving</h1>
                  </div>
                </div>
              </React.Fragment>
            )}
          {!saving &&
            !saved &&
            !error && (
              <React.Fragment>
                <h1>{winnerFormat}</h1>
                <div className="row">
                  <div className="col">
                    <SaveButton title="Save game" />
                  </div>
                  <div className="col">
                    <ResetButton title="Start new game" />
                  </div>
                </div>
              </React.Fragment>
            )}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    history: state.history,
    winner: state.game.winner,
    score: state.game.score,
    player: state.game.player
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startNewGame: () => dispatch(saveGameReset())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);
