import React from 'react';
import PropTypes from 'prop-types';

import playerShape from '../../helpers/propz/playerShape';

class Team extends React.Component {
    static propTypes = {
      player: playerShape.playerShape,
      setTeamBoard: PropTypes.func,
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
              </div>
            </div>
          </div>
      );
    }
}

export default Team;
