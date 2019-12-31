import React from 'react';
import PropTypes from 'prop-types';

import playerData from '../../helpers/data/playerData';

class SinglePlayerBoard extends React.Component {
    static propTypes = {
      selectedPlayerId: PropTypes.string,
      setSinglePlayer: PropTypes.func,
    }

    state = {
      player: [],
    }

    componentDidMount() {
      const { selectedPlayerId } = this.props;
      playerData.getSinglePlayer(selectedPlayerId)
        .then((request) => {
          this.setState({ player: request.data });
        })
        .catch((errorFromGetSinglePlayer) => console.error({ errorFromGetSinglePlayer }));
    }

    removeSelectedPlayerId = (e) => {
      e.preventDefault();
      const { setSinglePlayer } = this.props;
      setSinglePlayer(null);
    }

    render() {
      const { player } = this.state;
      //   const { selectedPlayerId } = this.props;

      return (
        <div>
          <button className="btn btn-info" onClick={this.removeSelectedPlayerId}>x Close Player View</button>
          <div className="SingleBoard col-8 offset-2">
            <h2>{player.name}</h2>
            <p>{player.description}</p>
            {/* <PinForm savePin={this.savePinData} selectedBoardId={selectedBoardId} />
            <div className="d-flex flex-wrap">
              {pins.map((pin) => <Pin key={pin.id} pin={pin} deleteSinglePin={this.deleteSinglePin} />)}
            </div> */}
          </div>
        </div>
      );
    }
}

export default SinglePlayerBoard;
