const { authenticate } = require('feathers-authentication').hooks;
const { setNow } = require('feathers-hooks-common');
const populateNodeCreator = require('../../hooks/populate-node-creator');

const populateNodeUpdater = require('../../hooks/populate-node-updater');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [populateNodeCreator()],
    update: [populateNodeUpdater()],
    patch: [populateNodeUpdater()],
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
