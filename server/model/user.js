//////////////////////
//User schema model //
//////////////////////
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import privateEnv from "../../config/private_keys";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
}, { timestamps: true });

////////////////////////////////////
//Plugin for our user data schema //
////////////////////////////////////
UserSchema.plugin(uniqueValidator, { message: "This email is already taken" });

//////////////////////
//Set user password //
//////////////////////
UserSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

////////////////////////////////////
//Validate user password function //
////////////////////////////////////
UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

///////////////////
//Generate token //
///////////////////
UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email,
    _id: this._id,
  }, privateEnv.SECRET_KEY);
};

///////////////////////////
//Send user data in JSON //
///////////////////////////
UserSchema.methods.toJSON = function toJSON() {
  return {
    email: this.email,
    _id: this._id,
    token: this.generateJWT(),
  };
};

export default mongoose.model("User", UserSchema);
