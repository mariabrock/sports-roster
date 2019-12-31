import React from 'react';
import PropTypes from 'prop-types';

import Team from '../Team/Team';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playerData from '../../helpers/data/playerData';

class TeamContainer extends React.Component {
    static propTypes = {
      setShowPlayers: PropTypes.func,
    }

    state = {
      player: {},
    }

    componentDidMount() {
      this.getPlayers();
    }

    getTeams = () => {
      playerData.getPlayersByUid(authData.getUid())
        .then((teams) => {
          this.setState({ teams });
        })
        .catch((errFromTeamContainer) => console.error({ errFromTeamContainer }));
    }

    addPlayer = (newPlayer) => {
      playerData.savePlayer(newPlayer)
        .then(() => {
          this.getPlayer();
          this.setState({ showPlayerForm: false });
        })
        .catch((errorFromUpdateTeam) => console.error({ errorFromUpdateTeam }));
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
      const { setShowPlayers } = this.props;

      return (
        <div>
            <button className="btn btn-light" onClick={this.setShowTeamForm}>Add A New Team</button>
            { this.state.showTeamForm && <PlayerForm addPlayer={this.addPlayer} editMode={this.state.editMode} playerToEdit={this.state.playerToEdit} updatePlayer={this.updatePlayer} /> }
            {this.state.player.map((player) => (<Team key={player.id} player={player} setShowPlayers={setShowPlayers} setEditMode={this.setEditMode} setPlayerToEdit={this.setPlayerToEdit} />))}
      </div>);
    }
}

export default TeamContainer;
