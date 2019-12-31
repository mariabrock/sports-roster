import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import teamShape from '../../helpers/propz/teamShape';

class TeamForm extends React.Component {
    static propTypes = {
      addTeam: PropTypes.func,
      teamToEdit: teamShape.teamShape,
      editMode: PropTypes.bool,
      updateTeam: PropTypes.func,
    }

    state = {
      teamName: '',
      teamDescription: '',
    }

    componentDidMount() {
      const { teamToEdit, editMode } = this.props;
      if (editMode) {
        this.setState({ playerName: teamToEdit.name, teamDescription: teamToEdit.description });
      }
    }

    componentDidUpdate(prevProps) {
      if ((prevProps.teamToEdit.id !== this.props.teamToEdit.id) && this.props.editMode) {
        this.setState({ teamName: this.props.teamToEdit.name, teamDescription: this.props.teamToEdit.description });
      }
    }

    saveTeamEvent = (e) => {
      const { addTeam } = this.props;

      e.preventDefault();
      const newTeam = {
        name: this.state.teamName,
        description: this.state.teamDescription,
        uid: authData.getUid(),
      };
      addTeam(newTeam);
      this.setState({ teamName: '', teamDescription: '' });
    }

    updateTeamEvent = (e) => {
      e.preventDefault();
      const { updateTeam, teamToEdit } = this.props;
      const updatedTeam = {
        name: this.state.teamName,
        description: this.state.teamDescription,
        uid: teamToEdit.uid,
      };
      updateTeam(teamToEdit.id, updatedTeam);
    }

    nameChange = (e) => {
      e.preventDefault();
      this.setState({ teamName: e.target.value });
    }

    descriptionChange = (e) => {
      e.preventDefault();
      this.setState({ teamDescription: e.target.value });
    }

    render() {
      const { editMode } = this.props;

      return (
            <form className='col-6 offset-3 TeamForm'>
        <div className="form-group">
          <label htmlFor="order-name">Team Name:</label>
          <input
            type="text"
            className="form-control"
            id="board-name"
            placeholder="Enter Team Name"
            value={this.state.teamName}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description-name">Team Description:</label>
          <input
            type="text"
            className="form-control"
            id="player-description"
            placeholder="Enter Team Description"
            value={this.state.teamDescription}
            onChange={this.descriptionChange}
          />
        </div>
        {
          (editMode) ? (<button className="btn btn-warning" onClick={this.updateTeamEvent}>Update Team</button>)
            : (<button className="btn btn-secondary" onClick={this.saveTeamEvent}>Save Team</button>)
        }
      </form>
      );
    }
}

export default TeamForm;
