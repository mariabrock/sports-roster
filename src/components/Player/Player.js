import React from 'react';
import PropTypes from 'prop-types';
import './Player.scss';

import playerShape from '../../helpers/propz/playerShape';

class Player extends React.Component {
    static propTypes = {
      player: playerShape.playerShape,
      deleteSinglePlayer: PropTypes.func,
      setEditMode: PropTypes.func,
      setPlayerToEdit: PropTypes.func,
    }

    deleteSinglePlayerEvent = (e) => {
      e.preventDefault();
      const { deleteSinglePlayer, player } = this.props;
      deleteSinglePlayer(player.id);
    }

    editSinglePlayerEvent = (e) => {
      e.preventDefault();
      const { setPlayerToEdit, player, setEditMode } = this.props;
      setPlayerToEdit(player);
      setEditMode(true);
    }

    render() {
      const { player } = this.props;
      return (
            <div className="Player col-4">
                <div className="card">
                <img src={player.imageUrl} className="card-img-top" alt="player" />
                    <div className="card-body">
                        <h5 className="card-title">{player.name}</h5>
                        <p className="card-text">{player.position}</p>
                        <button className="btn btn-danger" onClick={this.deleteSinglePlayerEvent}>Delete</button>
                        <button className="btn btn-secondary" onClick={this.editSinglePlayerEvent}>Edit</button>
                    </div>
                </div>
            </div>
      );
    }
}

export default Player;
