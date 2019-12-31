import React from 'react';
import PropTypes from 'prop-types';

import Team from '../Team/Team';
import TeamForm from '../TeamForm/TeamForm';

import authData from '../../helpers/data/authData';
import teamData from '../../helpers/data/teamData';

class TeamContainer extends React.Component {
    static propTypes = {
      setTeamBoard: PropTypes.func,
    }

    state = {
      team: {},
      editMode: false,
      teamToEdit: {},
      showTeamForm: false,
    }

    componentDidMount() {
      this.getPlayers();
    }

    getTeams = () => {
      teamData.getTeamsByUid(authData.getUid())
        .then((teams) => {
          this.setState({ teams });
        })
        .catch((errFromTeamContainer) => console.log({ errFromTeamContainer }));
    }

    addTeam = (newTeam) => {
      teamData.saveTeam(newTeam)
        .then(() => {
          this.getTeams();
          this.setState({ showTeamForm: false });
        })
        .catch((errorFromUpdateTeam) => console.error({ errorFromUpdateTeam }));
    }

    setEditMode = (editMode) => {
      this.setState({ editMode, showTeamForm: true });
    }

    setTeamToEdit = (team) => {
      this.setState({ teamToEdit: team });
    }

    setShowTeamForm = () => {
      this.setState({ showTeamForm: true });
    }

    render() {
      const { setTeamBoard } = this.props;

      return (
        <div>
            <button className="btn btn-light" onClick={this.setShowTeamForm}>Add A New Team</button>
            { this.state.showTeamForm && <TeamForm addTeam={this.addTeam} editMode={this.state.editMode} teamToEdit={this.state.teamToEdit} updateTeam={this.updateTeam} /> }
            {this.state.teams.map((team) => (<Team key={team.id} team={team} setTeamBoard={setTeamBoard} setEditMode={this.setEditMode} setTeamToEdit={this.setTeamToEdit} />))}
      </div>);
    }
}

export default TeamContainer;
