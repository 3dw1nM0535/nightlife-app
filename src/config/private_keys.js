"use strict";

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); ///////////////////////////
//Configure Private keys //
///////////////////////////


module.exports = {
  PORT: process.env.PORT,
  PASSPHRASE: process.env.PASSPHRASE,
  MONGO_URI: process.env.MONGO_URI,
  API_KEY: process.env.API_KEY,
  SECRET_KEY: process.env.SECRET_KEY
};
//# sourceMappingURL=private_keys.js.map