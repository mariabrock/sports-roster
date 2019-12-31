import React from 'react';
// import PropTypes from 'prop-types';

// import teamData from '../../helpers/data/teamData';

class ShowPlayers extends React.Component {
  render() {
    return (
        <div>
          <button className="btn btn-info" onClick={this.removeSelectedPlayerId}>x Close Player View</button>
        </div>
    );
  }
}

export default ShowPlayers;
