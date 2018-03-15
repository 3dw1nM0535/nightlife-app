///////////////////////////
//Configure Private keys //
///////////////////////////
import dotenv from "dotenv";

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  PASSPHRASE: process.env.PASSPHRASE,
};
