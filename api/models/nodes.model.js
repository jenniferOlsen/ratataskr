// nodes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const nodes = new Schema({
    name: { type: String, required: true },
    details: { type: String, required: false },
    completionStatus: { type: String, required: true, default: 'incomplete' },
    children: { type: Array, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('nodes', nodes);
};
