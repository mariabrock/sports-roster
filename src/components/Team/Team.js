import React from 'react';
import './Team.scss';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

class Team extends React.Component {
    state = {
      players: [],
      editMode: false,
      addMode: false,
      playerToEdit: {},
      showPlayerForm: false,
    }

    componentDidMount() {
      this.getPlayers();
    }

    getPlayers = () => {
      const uid = authData.getUid();

      playerData.getPlayersByUid(uid)
        .then((players) => {
          this.setState({ players });
        })
        .catch((error) => console.error(error));
    }

    createPlayer = (newPlayer) => {
      playerData.savePlayer(newPlayer)
        .then(() => {
          this.getPlayers();
          this.setState({ showPlayerForm: false });
        });
    }

    updatePlayer = (playerId, updatePlayer) => {
      playerData.updatePlayer(playerId, updatePlayer)
        .then(() => {
          this.getPlayers();
          this.setState({ editMode: false, showPlayerForm: false });
        })
        .catch((error) => console.error({ error }));
    }

    deleteSinglePlayer = (playerId) => {
      playerData.deletePlayerById(playerId)
        .then(() => {
          this.getPlayers();
          this.setState({ showPlayerForm: false });
        })
        .catch((error) => console.error(error));
    }

    setEditMode = (editMode) => {
      this.setState({ editMode, showPlayerForm: true });
    }

    setAddMode = (addMode) => {
      this.setState({ addMode, showPlayerForm: true });
    }

    setShowForm = (showPlayerForm) => {
      this.setState({ showPlayerForm });
    }

    setPlayerToEdit = (player) => {
      this.setState({ playerToEdit: player });
    }

    showPlayerFormEvent = (e) => {
      e.preventDefault();
      this.setState({ showPlayerForm: true });
    }

    render() {
      return (
        <div className="Team">
        <div className="d-flex justify-content-between">
          <h1>Nashville Predators</h1>
          <button className="btn btn-light" onClick={this.showPlayerFormEvent}>Show Form</button>
        </div>
        <div>
          {
           (this.state.showPlayerForm)
           && (<PlayerForm createPlayer={this.createPlayer} addMode={this.state.addMode} editMode={this.state.editMode} updateNewPlayer={this.updateNewPlayer} playerToEdit={this.state.playerToEdit} setShowForm={this.setShowForm} />)
          }
        </div>
        <div className="d-flex flex-row flex-wrap">
            {
              this.state.players.map((player) => (<Player key={player.id} player={player} deleteSinglePlayer={this.deleteSinglePlayer} setEditMode={this.setEditMode} setPlayerToEdit={this.setPlayerToEdit} />))
            }
        </div>
      </div>
      );
    }
}

export default Team;
