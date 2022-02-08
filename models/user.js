var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
    member_status: { type: String, required: true, enum: ['basic-member', 'clubhouse-member'] },
    admin: {type: Boolean},

})

// Virtual for User's full name
UserSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an user does not have either a last name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.last_name) {
    fullname = this.last_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.last_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/user' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);