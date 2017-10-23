const users = require('./users/users.service.js');
const maps = require('./maps/maps.service.js');
const nodes = require('./nodes/nodes.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(maps);
  app.configure(nodes);
};
