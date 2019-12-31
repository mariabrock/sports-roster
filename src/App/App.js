import React from 'react';
import firebase from 'firebase/app';
import firebaseConnection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import TeamContainer from '../components/TeamContainer/TeamContainer';
import SinglePlayerBoard from '../components/SinglePlayerBoard/SinglePlayerBoard';

import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    selectedBoardId: null,
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
    const { authed, selectedBoardId } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    if (!selectedBoardId) {
      return (<TeamContainer />);
    }
    return (<SinglePlayerBoard />);
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
