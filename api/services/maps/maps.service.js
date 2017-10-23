// Initializes the `maps` service on path `/maps`
const createService = require('feathers-mongoose');
const createModel = require('../../models/maps.model');
const hooks = require('./maps.hooks');
const filters = require('./maps.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'maps',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/maps', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('maps');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
