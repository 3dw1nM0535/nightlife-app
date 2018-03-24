"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require("mongoose-unique-validator");

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _private_keys = require("../config/private_keys");

var _private_keys2 = _interopRequireDefault(_private_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; //////////////////////
//User schema model //
//////////////////////


var UserSchema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, { timestamps: true });

//////////////////////
//Set user password //
//////////////////////
UserSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = _bcrypt2.default.hashSync(password, 10);
};

////////////////////////////////////
//Validate user password function //
////////////////////////////////////
UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return _bcrypt2.default.compareSync(password, this.passwordHash);
};

///////////////////
//Generate token //
///////////////////
UserSchema.methods.generateJWT = function generateJWT() {
  return _jsonwebtoken2.default.sign({
    email: this.email,
    _id: this._id
  }, _private_keys2.default.SECRET_KEY);
};

///////////////////////////
//Send user data in JSON //
///////////////////////////
UserSchema.methods.toJSON = function toJSON() {
  return {
    email: this.email,
    _id: this._id,
    token: this.generateJWT()
  };
};

////////////////////////////////////
//Plugin for our user data schema //
////////////////////////////////////
UserSchema.plugin(_mongooseUniqueValidator2.default, { message: "This email is already taken" });

exports.default = _mongoose2.default.model("User", UserSchema);
//# sourceMappingURL=user.js.map