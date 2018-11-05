import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveGamePost } from '../../actions/history';

class SaveButton extends Component {
  render() {
    return (
      <button onClick={this.props.saveGame} className="btn btn-secondary form-control">
        {this.props.title}
      </button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveGame: () => dispatch(saveGamePost())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SaveButton);
