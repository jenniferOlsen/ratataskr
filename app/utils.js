import auth from 'feathers-authentication-client';
import Store from './store';

const Utils = {
  authenticate: function(socket, app) {
    let currentUser = '';
    app.authenticate()
     .then(response => {
       return app.passport.verifyJWT(response.accessToken);
     })
     .then(payload => {
       return app.service('users').get(payload.userId);
     })
     .then(user => {
      app.set('user', user);
      currentUser = app.get('user');
      Store.setUser(currentUser);
    })
    .then(user => {
      socket.emit('maps::find', { 'users.owner': currentUser._id }, (error, data) => {
        Store.setMaps(data);
        if (error) {
          console.error(error)
        }
      });
    })
     .catch(error => {
       console.log(error);
    });

  }
}

export default Utils;
