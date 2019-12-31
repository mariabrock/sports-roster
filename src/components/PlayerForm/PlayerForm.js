import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import playerShape from '../../helpers/propz/playerShape';

class PlayerForm extends React.Component {
    static propTypes = {
      addPlayer: PropTypes.func,
      playerToEdit: playerShape.playerShape,
      editMode: PropTypes.bool,
      updatePlayer: PropTypes.func,
    }

    state = {
      playerName: '',
      playerDescription: '',
    }

    componentDidMount() {
      const { playerToEdit, editMode } = this.props;
      if (editMode) {
        this.setState({ playerName: playerToEdit.name, playerDescription: playerToEdit.description });
      }
    }

    componentDidUpdate(prevProps) {
      if ((prevProps.playerToEdit.id !== this.props.playerToEdit.id) && this.props.editMode) {
        this.setState({ playerName: this.props.playerToEdit.name, playerDescription: this.props.playerToEdit.description });
      }
    }

    savePlayerEvent = (e) => {
      const { addPlayer } = this.props;

      e.preventDefault();
      const newPlayer = {
        name: this.state.playerName,
        description: this.state.playerDescription,
        uid: authData.getUid(),
      };
      addPlayer(newPlayer);
      this.setState({ playerName: '', playerDescription: '' });
    }

    updatePlayerEvent = (e) => {
      e.preventDefault();
      const { updatePlayer, playerToEdit } = this.props;
      const updatedPlayer = {
        name: this.state.playerName,
        description: this.state.playerDescription,
        uid: playerToEdit.uid,
      };
      updatePlayer(playerToEdit.id, updatedPlayer);
    }

    nameChange = (e) => {
      e.preventDefault();
      this.setState({ playerName: e.target.value });
    }

    descriptionChange = (e) => {
      e.preventDefault();
      this.setState({ playerDescription: e.target.value });
    }

    render() {
      const { editMode } = this.props;

      return (
            <form className='col-6 offset-3 PlayerForm'>
        <div className="form-group">
          <label htmlFor="order-name">Player Name:</label>
          <input
            type="text"
            className="form-control"
            id="board-name"
            placeholder="Enter Player name"
            value={this.state.playerName}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description-name">Player Description:</label>
          <input
            type="text"
            className="form-control"
            id="player-description"
            placeholder="Enter Player description"
            value={this.state.playerDescription}
            onChange={this.descriptionChange}
          />
        </div>
        {
          (editMode) ? (<button className="btn btn-warning" onClick={this.updatePlayerEvent}>Update Player</button>)
            : (<button className="btn btn-secondary" onClick={this.savePlayerEvent}>Save Player</button>)
        }
      </form>
      );
    }
}

export default PlayerForm;
