"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../../model/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////
//User auth actions route handler //
////////////////////////////////////
var router = _express2.default.Router();

////////////////////////
//Login route handler //
////////////////////////
router.post("/", function (req, res) {
  var data = req.body.data;

  _user2.default.findOne({ email: data.email }).then(function (user) {
    if (user && user.isValidPassword(data.password)) {
      res.json({ user: user.toJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid password" } });
    }
  });
});

exports.default = router;
//# sourceMappingURL=user.js.map