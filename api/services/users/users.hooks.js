const { authenticate } = require('feathers-authentication').hooks;
const { setNow } = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');


const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

function addGoogleProfile() {
  return function(hook) {
    hook.data.name = hook.data.google.profile.displayName;
    hook.data.email = hook.data.google.profile.emails[0].value;
    hook.data.picture = hook.data.google.profile.photos[0].value;
  }
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ addGoogleProfile() ],
    update: [ addGoogleProfile() ],
    patch: [ ...restrict ],
    remove: [ ...restrict ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [setNow('createdAt')],
    update: [setNow('updatedAt')],
    patch: [setNow('updatedAt')],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
