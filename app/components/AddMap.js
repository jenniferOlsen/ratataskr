import React, { Component } from 'react';
import feathers from 'feathers-client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import errors from 'feathers-errors';
import auth from 'feathers-authentication-client';
import io from 'socket.io-client';
import Login from './Login';

import '../styles.scss';

class AddMap extends Component {
  constructor(props) {
  super(props);
  this.state = { };
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

  newMap() {
    // need to find a way to make socket and the JWT token available everywhere
    // maybe in the redux store? https://github.com/mjrussell/redux-auth-wrapper & https://github.com/mjrussell/react-redux-jwt-auth-example/tree/react-router-redux
    socket.emit('maps::create', {title:'New from Component', coordinatesRange: [0,0] }, (error, data) => {
      console.log('new map', data)
      if (error) {
        console.error(error)
      }
    })
  }

  render() {
    return (
      <a onClick={this.newMap}>Add new map</a>
    );
  }
}

export default AddMap;
