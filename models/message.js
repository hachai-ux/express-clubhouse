var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    timestamp: { type: Date, default: Date.now},
    text: { type: String, required: true, maxLength: 500 },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

})


// Virtual for message's URL
MessageSchema
.virtual('url')
.get(function () {
  return '/message' + this._id;
});

//Export model
module.exports = mongoose.model('Message', MessageSchema);