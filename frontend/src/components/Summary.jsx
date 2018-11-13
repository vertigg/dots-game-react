import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ResetButton from './buttons/ResetButton';
import SaveButton from './buttons/SaveButton';
import { saveGameReset } from '../actions/history';

const Summary = ({ winner, history }) => {
  const winnerName = winner === 1 ? 'Red' : 'Blue';
  const winnerFormat = winner !== 0 ? `${winnerName} player won!` : "It's a tie!";
  const { saving, saved, error } = history;
  return (
    <React.Fragment>
      {error && (
        <div>
          <h3>{error}</h3>
          <SaveButton title="Retry save" />
          <ResetButton title="Start new game" />
        </div>
      )}
      {saved && (
        <React.Fragment>
          <h1>Game saved!</h1>
          <Link to="/history">
            <button type="button" className="btn btn-secondary form-control" label="History" />
          </Link>
          <ResetButton title="Start new game" />
        </React.Fragment>
      )}
      {saving &&
        !error && (
          <React.Fragment>
            <div className="lds-ripple float-right ">
              <div />
            </div>
            <div className="col-sm-8 float-left">
              <h1>Saving</h1>
            </div>
          </React.Fragment>
        )}
      {!saving &&
        !saved &&
        !error && (
          <React.Fragment>
            <h3>{winnerFormat}</h3>
            <SaveButton title="Save game" />
            <ResetButton title="Start new game" />
          </React.Fragment>
        )}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    history: state.history,
    winner: state.game.winner,
    score: state.game.score,
    player: state.game.player,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startNewGame: () => dispatch(saveGameReset()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Summary);
