import React from 'react';
import PropTypes from 'prop-types';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

class TeamContainer extends React.Component {
    static propTypes = {
      setPlayerBoard: PropTypes.func,
    }

    state = {
      players: {},
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
        .catch((errFromTeamContainer) => console.log({ errFromTeamContainer }));
    }

    addPlayer = (newPlayer) => {
      playerData.savePlayer(newPlayer)
        .then(() => {
          this.getPlayers();
          this.setState({ showPlayerForm: false });
        })
        .catch((errorFromUpdatePlayer) => console.error({ errorFromUpdatePlayer }));
    }

    setEditMode = (editMode) => {
      this.setState({ editMode, showPlayerForm: true });
    }

    setPlayerToEdit = (player) => {
      this.setState({ playerToEdit: player });
    }

    setShowPlayerForm = () => {
      this.setState({ showPlayerForm: true });
    }

    render() {
      const { setPlayerBoard } = this.props;

      return (
        <div>
            <button className="btn btn-light" onClick={this.setShowBoardForm}>Add A New Board</button>
            { this.state.showPLayerForm && <PlayerForm addPlayer={this.addPlayer} editMode={this.state.editMode} playerToEdit={this.state.playerToEdit} updatePlayer={this.updatePlayer} /> }
            {this.state.players.map((player) => (<Player key={player.id} player={player} setPlayerBoard={setPlayerBoard} setEditMode={this.setEditMode} setPlayerToEdit={this.setPlayerToEdit} />))}
      </div>);
    }
}

export default TeamContainer;
