import React from 'react';
import PropTypes from 'prop-types';

import teamShape from '../../helpers/propz/teamShape';

class Team extends React.Component {
    static propTypes = {
      team: teamShape.teamShape,
      setTeamBoard: PropTypes.func,
      setEditMode: PropTypes.func,
      setTeamToEdit: PropTypes.func,
    }

    setSelectedTeamId = (e) => {
      e.preventDefault();
      const { setTeamBoard, player } = this.props;
      setTeamBoard(player.id);
    }

    setEditMode = (e) => {
      e.preventDefault();
      const { player, setEditMode, setTeamToEdit } = this.props;
      setEditMode(true);
      setTeamToEdit(player);
    }

    render() {
      const { team } = this.props;
      return (
            <div className="Board col-4">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <button className="btn btn-primary"onClick={this.setSelectedBoardId}>View Team</button>
                <button className="btn btn-secondary"onClick={this.setEditMode}>Edit Team</button>
              </div>
            </div>
          </div>
      );
    }
}

export default Team;
