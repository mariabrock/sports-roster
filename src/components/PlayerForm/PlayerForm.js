import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import playerShape from '../../helpers/propz/playerShape';

class PlayerForm extends React.Component {
    static propTypes = {
      playerToEdit: playerShape.playerShape,
      editMode: PropTypes.bool,
      addMode: PropTypes.bool,
      updateNewPlayer: PropTypes.func,
      createPlayer: PropTypes.func,
      setShowForm: PropTypes.func,
    }

    state = {
      playerName: '',
      playerImg: '',
      playerPosition: '',
    }

    componentDidMount() {
      const { playerToEdit, editMode } = this.props;
      if (editMode) {
        this.setState({ playerName: playerToEdit.name, playerPosition: playerToEdit.position, playerImg: playerToEdit.imageUrl });
      }
    }

    savePlayerEvent = (e) => {
      const { createPlayer } = this.props;

      e.preventDefault();
      const newPlayer = {
        name: this.state.playerName,
        imageUrl: this.state.playerImg,
        position: this.state.playerPosition,
        uid: authData.getUid(),
      };
      createPlayer(newPlayer);
      this.setState({ playerName: '', playerImg: '', playerPosition: '' });
    }

    updatePlayerEvent = (e) => {
      e.preventDefault();
      const { updatePlayer, playerToEdit } = this.props;
      const updatedPlayer = {
        name: this.state.playerName,
        imageUrl: this.state.playerImg,
        description: this.state.playerPosition,
        uid: playerToEdit.uid,
      };
      updatePlayer(playerToEdit.id, updatedPlayer);
    }

    nameChange = (e) => {
      e.preventDefault();
      this.setState({ playerName: e.target.value });
    }

    positionChange = (e) => {
      e.preventDefault();
      this.setState({ playerPosition: e.target.value });
    }

    imgChange = (e) => {
      e.preventDefault();
      this.setState({ playerImg: e.target.value });
    }

    closeFormEvent = (e) => {
      e.preventDefault(e);
      const { setShowForm } = this.props;
      this.setState({
        playerName: '',
        playerImg: '',
        playerPosition: '',
        addMode: false,
        editMode: false,
      });
      setShowForm(false);
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
                id="player-name"
                placeholder="Enter player name"
                value={this.state.playerName}
                onChange={this.nameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="position-name">Player Position:</label>
              <input
                type="text"
                className="form-control"
                id="player-position"
                placeholder="Enter player position"
                value={this.state.playerPosition}
                onChange={this.positionChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description-name">Player Image:</label>
              <input
              type="text"
              className="form-control"
              id="player-image"
              placeholder="Enter player image url"
              value={this.state.playerImg}
              onChange={this.imgChange}
              />
            </div>
            {
              (editMode) ? (<button className="btn btn-warning" onClick={this.updatePlayerEvent}>Update Player</button>)
                : (<button className="btn btn-secondary" onClick={this.savePlayerEvent}>Save Player</button>)
            }
            <button className="btn btn-danger" onClick={this.closeFormEvent}>Close</button>
          </form>
      );
    }
}

export default PlayerForm;
