// Initializes the `maps` service on path `/maps`
const createService = require('feathers-mongoose');
const createModel = require('../../models/maps.model');
const hooks = require('./maps.hooks');
const filters = require('./maps.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');
  let ObjectIdHook = function(options) { return }
  const options = {
    name: 'maps',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/maps', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('maps');

  const ObjectID = require('mongodb').ObjectID;
  service.hooks({
    before: {
      find(hook) {
        const { query = {} } = hook.params;
        if(query._id) {
          query._id  = new ObjectID(query._id);
        }
        hook.params.query = query;
        return Promise.resolve(hook);
      }
    }
  });
  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
