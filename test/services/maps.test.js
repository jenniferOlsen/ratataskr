const assert = require('assert');
const app = require('../../api/app');

describe('\'maps\' service', () => {
  it('registered the service', () => {
    const service = app.service('maps');

    assert.ok(service, 'Registered the service');
  });
});
