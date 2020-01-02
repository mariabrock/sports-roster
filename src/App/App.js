import React from 'react';
import firebase from 'firebase/app';
import firebaseConnection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import PlayersContainer from '../components/PlayersContainer/PlayersContainer';
import SinglePlayer from '../components/SinglePlayer/SinglePlayer';

import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    selectedPlayerId: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  renderView = () => {
    const { authed, selectedPlayerId } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    if (!selectedPlayerId) {
      return (<PlayersContainer setSinglePlayer={this.setSinglePlayer} />);
    }
    return (<SinglePlayer selectedPlayerId={selectedPlayerId} setSinglePlayer={this.setSinglePlayer} />);
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <MyNavbar authed={authed} />
        {
          this.renderView()
        }
      </div>
    );
  }
}

export default App;
