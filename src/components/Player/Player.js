import React from 'react';
import PropTypes from 'prop-types';

import playerShape from '../../helpers/propz/playerShape';

class Player extends React.Component {
    static propTypes = {
      player: playerShape.playerShape,
      setSinglePlayer: PropTypes.func,
      setEditMode: PropTypes.func,
      setPlayerToEdit: PropTypes.func,
    }

    setSelectedPlayerId = (e) => {
      e.preventDefault();
      const { setSinglePlayer, player } = this.props;
      setSinglePlayer(player.id);
    }

    setEditMode = (e) => {
      e.preventDefault();
      const { player, setEditMode, setPlayerToEdit } = this.props;
      setEditMode(true);
      setPlayerToEdit(player);
    }

    render() {
      const { player } = this.props;
      return (
            <div className="Player col-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{player.name}</h5>
                        <p className="card-text">{player.description}</p>
                        <button className="btn btn-primary"onClick={this.setSelectedPlayerId}>View Pins</button>
                        <button className="btn btn-secondary"onClick={this.setEditMode}>Edit Player</button>
                    </div>
                </div>
            </div>
      );
    }
}

export default Player;
