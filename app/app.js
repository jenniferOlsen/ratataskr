import React, { Component } from 'react';
import feathers from 'feathers-client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import errors from 'feathers-errors';
import auth from 'feathers-authentication-client';
import io from 'socket.io-client';
import rest from 'feathers-rest/client';

import './styles.scss';

const socket = io('http://localhost:3030', {transports: ['websocket']});
const restClient = rest();
const app = feathers()
   .configure(feathers.hooks())
   .configure(feathers.socketio(socket))
   .configure(feathers.authentication({
     cookie: 'feathers-jwt'
   }));
const mapsService = app.service('/maps');
const usersService = app.service('/users');
let currentUser = '';

app.authenticate()
 .then(response => {
   console.info('Feathers Client has Authenticated with the JWT access token!');
   console.log(response);
   return app.passport.verifyJWT(response.accessToken);
 })
 .then(payload => {
   console.log('payload', payload)
   return app.service('users').get(payload.userId);
 })
 .then(user => {
  app.set('user', user);
  console.log('User', app.get('user'));
  currentUser = app.get('user');
})
 .catch(error => {
   console.info('We have not logged in with OAuth, yet.  This means there\'s no cookie storing the accessToken.  As a result, feathersClient.authenticate() failed.');
   console.log(error);
});

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    name: currentUser.name
  };
}

  newMap() {
    mapsService.create({ title: 'New Test 2', coordinatesRange: [0,0] }).then(function(response) {
      console.log('New Map?', response);
    })
  }



  render() {
    console.log('state ', this.state.name);
    // console.log('name', user);
    console.log('curent', currentUser)

    return (
      <div>
        <h1>Welcome to Ratataskr!</h1>
        <p><br/>
          <a className="button" href="/auth/google">Login With Google</a>
        </p>
        <p>User: {this.state.user}</p>
        <p><a onClick={this.newMap}>Add new map</a></p>
      </div>
    );
  }
}

export default App;
