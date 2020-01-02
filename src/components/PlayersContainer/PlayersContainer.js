import React from 'react';
import PropTypes from 'prop-types';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

class PlayersContainer extends React.Component {
    static propTypes = {
      setSinglePlayer: PropTypes.func,
    }

    state = {
      players: [],
      editMode: false,
      playerToEdit: {},
      showPlayerForm: false,
    }

    componentDidMount() {
      this.getPlayers();
    }

    getPlayers = () => {
      playerData.getPlayersByUid(authData.getUid())
        .then((players) => {
          this.setState({ players });
        })
        .catch((errorFromPlayersContainer) => console.error({ errorFromPlayersContainer }));
    }

    addPlayer = (newPlayer) => {
      playerData.savePlayer(newPlayer)
        .then(() => {
          this.getPlayers();
          this.setState({ showPlayerForm: false });
        })
        .catch((errorFromSavePlayer) => console.error({ errorFromSavePlayer }));
    }

    updatePlayer = (playerId, updatePlayer) => {
      playerData.updatePlayer(playerId, updatePlayer)
        .then(() => {
          this.getPlayers();
          this.setState({ editMode: false, showPlayerForm: false });
        })
        .catch((errorFromUpdatePlayer) => console.error({ errorFromUpdatePlayer }));
    }

    setEditMode = (editMode) => {
      this.setState({ editMode, showPlayerForm: true });
    }

    render() {
      const { setSinglePlayer } = this.props;

      return (
            <div>
                <button className="btn btn-light" onClick={this.setShowPlayerForm}>Add A New Player</button>
                { this.state.showPlayerForm && <PlayerForm addPlayer={this.addPlayer} editMode={this.state.editMode} playerToEdit={this.state.playerToEdit} updatePlayer={this.updatePlayer} /> }
                {this.state.players.map((player) => (<Player key={player.id} player={player} setSinglePlayer={setSinglePlayer} setEditMode={this.setEditMode} setPlayerToEdit={this.setPlayerToEdit} />))}
            </div>);
    }
}

export default PlayersContainer;
