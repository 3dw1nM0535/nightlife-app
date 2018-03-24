"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../../model/user");

var _user2 = _interopRequireDefault(_user);

var _parseError = require("../../utils/parseError");

var _parseError2 = _interopRequireDefault(_parseError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); ///////////////////////////////////////////////
//User one time signup request route handler //
///////////////////////////////////////////////


router.post("/", function (req, res) {
  var _req$body$data = req.body.data,
      email = _req$body$data.email,
      password = _req$body$data.password;

  var user = new _user2.default({
    email: email
  });
  user.setPassword(password);
  user.save().then(function (userRecord) {
    res.json({ user: userRecord });
  }).catch(function (err) {
    return res.status(400).json({ errors: (0, _parseError2.default)(err.errors) });
  });
});

exports.default = router;
//# sourceMappingURL=auth.js.map