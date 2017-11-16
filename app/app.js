import React, { Component } from 'react';
import feathers from 'feathers-client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import errors from 'feathers-errors';
import auth from 'feathers-authentication-client';
import io from 'socket.io-client';

import Login from './components/Login';
import AddMap from './components/AddMap';
import './styles.scss';


class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    // name: currentUser.name,
    maps: []
  };
}

  componentWillMount() {
    const socket = io('http://localhost:3030', {transports: ['websocket']});
    const app = feathers()
       .configure(feathers.hooks())
       .configure(feathers.socketio(socket))
       .configure(feathers.authentication({
         cookie: 'feathers-jwt'
    }));
  }

  render() {
    return (
      <div>
        <h1>Welcome to Ratataskr!</h1>
        <p><br/>
        <Login />
        </p>
        <p>User: {this.state.user}</p>
        <AddMap />
        <p>Maps: {this.state.maps}</p>
      </div>
    );
  }
}

export default App;
