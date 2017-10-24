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
 app.authenticate()
   .then(response => {
     console.info('Feathers Client has Authenticated with the JWT access token!');
     console.log(response);
   })
   .catch(error => {
     console.info('We have not logged in with OAuth, yet.  This means there\'s no cookie storing the accessToken.  As a result, feathersClient.authenticate() failed.');
     console.log(error);
});

class App extends Component {

  newMap() {
    mapsService.create({ title: 'New Test', coordinatesRange: [0,0] }).then(function(response) {
      console.log('New Map?', response);
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to Ratataskr!</h1>
        <p><br/>
          <a className="button" href="/auth/google">Login With Google</a>
        </p>
        <p><a onClick={this.newMap}>Add new map</a></p>
      </div>
    );
  }
}

export default App;
