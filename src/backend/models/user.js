import crypto from 'crypto';
<<<<<<< HEAD
import async from 'async';
import util from 'util';

=======
>>>>>>> 3f3bbde9ec6b32e9f694ff1e77715704937b5c17
import mongoose from '../lib/mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

<<<<<<< HEAD
schema.statics.authorize = function(username, password, callback) {
  const User = this;

  async.waterfall([
    (callback) => User.findOne({username: username}, callback),
    (user, callback) => {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user);
        } else {
          callback(new AuthError("Пароль неверен"));
        }
      } else {
        const user = new User({username: username, password: password});
        user.save((err) => {
          if (err) return callback(err);
          callback(null, user);
        });
      }
    }
  ], callback);
};

export const User = mongoose.model('User', schema);


export function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';


=======
export const User = mongoose.model('User', schema);
>>>>>>> 3f3bbde9ec6b32e9f694ff1e77715704937b5c17
