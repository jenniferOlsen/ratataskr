// nodes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const nodes = new Schema({
    name: { type: String, required: true },
    details: { type: String },
    completionStatus: { type: String, required: true, default: 'incomplete' },
    children: { type: Array },
    parents: { type: Array},
    connectedTo: { type: Array},
    blocks: { type: Array },
    blockedBy: { type: Array},
    dirty: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('nodes', nodes);
};
