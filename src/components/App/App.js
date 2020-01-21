import React from 'react';
import firebase from 'firebase/app';
import firebaseConnection from '../../helpers/data/connection';

import Auth from '../Auth/Auth';
import MyNavbar from '../MyNavbar/MyNavbar';
import Team from '../Team/Team';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
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
    const { authed } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    return (<Team />);
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
