const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const { setNow } = require('feathers-hooks-common');

const populateNodeUpdater = require('../../hooks/populate-node-updater');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [hooks.associateCurrentUser({ as: 'createdBy' })],
    update: [hooks.associateCurrentUser({ as: 'updatedBy' })],
    patch: [hooks.associateCurrentUser({ as: 'updatedBy' })],
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
