const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const { setNow } = require('feathers-hooks-common');
const populateMapNodes = require('../../hooks/populate-map-nodes');
const populateMapUsers = require('../../hooks/populate-map-users');

module.exports = {
  before: {
    all: [authenticate('jwt'), populateMapUsers(), populateMapNodes()],
    find: [],
    get: [],
    create: [hooks.associateCurrentUser({ as: 'users.owner' })],
    update: [],
    patch: [],
    remove: []
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
