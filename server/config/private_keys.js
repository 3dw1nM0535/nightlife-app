///////////////////////////
//Configure Private keys //
///////////////////////////
import dotenv from "dotenv";

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  PASSPHRASE: process.env.PASSPHRASE,
  MONGO_URI: process.env.MONGO_URI,
  API_KEY: process.env.API_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
};
