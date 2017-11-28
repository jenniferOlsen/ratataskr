import Utils from './utils';
import feathers from 'feathers-client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import errors from 'feathers-errors';
import io from 'socket.io-client';

const EventEmitter = require('events').EventEmitter;
const Store = new EventEmitter();
const CHANGE_EVENT = 'change';
const currentState = {
  app: null,
  socket: null,
  user: null,
  maps: null
};

Store.emitChange = function()  {
  this.emit(CHANGE_EVENT);
  console.log('updated state', currentState)
}

Store.addChangeListener = function(callback) {
  this.on(CHANGE_EVENT, callback);
}

Store.removeChangeListener = function(callback) {
  this.removeListener(CHANGE_EVENT, callback);
}

Store.getCurrentState = function() {
  return currentState;
}

Store.registerSocket = function() {
  const socket = io('http://localhost:3030', {transports: ['websocket']});
  const app = feathers()
     .configure(feathers.hooks())
     .configure(feathers.socketio(socket))
     .configure(feathers.authentication({
       cookie: 'feathers-jwt'
  }));
  currentState.app = app;
  currentState.socket = socket;
}

// Helper Functions
Store.setUser = function(user) {
  currentState.user = user;
  this.emitChange();
};
Store.setMaps = function(maps) {
  currentState.maps = maps;
  this.emitChange();
}


export default Store;
