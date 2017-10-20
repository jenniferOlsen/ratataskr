import feathers from 'feathers-client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import errors from 'feathers-errors'; // An object with all of the custom error types.
import auth from 'feathers-authentication-client';
import io from 'socket.io-client';
import rest from 'feathers-rest/client';

const socket = io('http://localhost:3030', {transports: ['websocket']});
const restClient = rest();
const feathersClient = feathers()
   .configure(feathers.hooks())
   .configure(feathers.socketio(socket))
   .configure(feathers.authentication({
     cookie: 'feathers-jwt'
   }));

 feathersClient.authenticate()
   .then(response => {
     console.info('Feathers Client has Authenticated with the JWT access token!');
     console.log(response);
   })
   .catch(error => {
     console.info('We have not logged in with OAuth, yet.  This means there\'s no cookie storing the accessToken.  As a result, feathersClient.authenticate() failed.');
     console.log(error);
});

export default feathers;
