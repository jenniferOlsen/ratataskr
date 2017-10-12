const feathers = require('feathers-client');
const io = require('socket.io-client');

const socket = io();
export const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks());

import React, { Component } from 'react';
class App extends Component {
  render() {
    return (
      <h1>Welcome to Ratataskr!</h1>
    );
  }
}

export default App;
