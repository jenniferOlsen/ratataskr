// maps-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const maps = new Schema({
    title: { type: String, required: true },
    coordinatesRange: { type: Array, required: true },
    nodes: {
      id: { type: Schema.Types.ObjectId, ref: 'Node' },
      coordinates: { type: Array }
    },
    users: {
      owner: { type: Schema.Types.ObjectId, ref: 'User' },
      editors: { type: Array },
      readers: { type: Array }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('maps', maps);
};
