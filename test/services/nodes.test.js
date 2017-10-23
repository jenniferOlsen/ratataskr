const assert = require('assert');
const app = require('../../api/app');

describe('\'nodes\' service', () => {
  it('registered the service', () => {
    const service = app.service('nodes');

    assert.ok(service, 'Registered the service');
  });
});
