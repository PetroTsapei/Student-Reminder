const mongoose = require('./index');
const ObjectId = mongoose.Schema.Types.ObjectId;
require('dotenv').config();

// Create authenticated Authy and Twilio API clients
const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const authy = require('authy')(process.env.AUTHY_KEY);

const UserSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  authyId: String,
  verified: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  group: {
    type: ObjectId,
    required: function() { return this.role === 'student' },
  },
  fullName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "teacher", "student"]
  },
  groupLeader: Boolean
});

UserSchema.methods.sendAuthyToken = function(cb) {
  var self = this;

  if (!self.authyId) {
    // Register this user if it's a new user
    authy.register_user(self.email, self.phone, self.countryCode,
      function(err, response) {
        if (err || !response.user) return cb.call(self, err);
        self.authyId = response.user.id;
        self.save(function(err, doc) {
          if (err || !doc) return cb.call(self, err);
          self = doc;
          sendToken();
        });
      });
  } else {
    // Otherwise send token to a known user
    sendToken();
  }

  // With a valid Authy ID, send the 2FA token for this user
  function sendToken() {
    authy.request_sms(self.authyId, true, function(err, response) {
      cb.call(self, err);
    });
  }
};

UserSchema.methods.verifyAuthyToken = function(otp, cb) {
  const self = this;
  authy.verify(self.authyId, otp, function(err, response) {
    cb.call(self, err, response);
  });
};

// Send a text message via twilio to this user
UserSchema.methods.sendMessage = function(message, successCallback, errorCallback) {
    const self = this;
    const toNumber = `+${self.countryCode}${self.phone}`;

    twilioClient.messages.create({
      to: toNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message,
    }).then(function() {
      successCallback();
    }).catch(function(err) {
      errorCallback(err);
    });
  };

module.exports = mongoose.model('User', UserSchema);
