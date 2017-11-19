import auth from 'feathers-authentication-client';

const Utils = {
  authenticate: function(socket, app) {
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
    .then(user => {
      socket.emit('maps::find', { 'users.owner': currentUser._id }, (error, data) => {
        console.log('socket maps', data)
        if (error) {
          console.error(error)
        }
      });
    })
     .catch(error => {
       console.info('We have not logged in with OAuth, yet. As a result, feathersClient.authenticate() failed.');
       console.log(error);
    });

  }
}

export default Utils;
