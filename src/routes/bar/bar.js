"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _bar = require("../../model/bar");

var _bar2 = _interopRequireDefault(_bar);

var _private_keys = require("../../config/private_keys");

var _private_keys2 = _interopRequireDefault(_private_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///////////////////////////////////
//Find bar request route handler //
///////////////////////////////////
var router = _express2.default.Router();

////////////////////////////
//Find bars route handler //
////////////////////////////
router.post("/find", function (req, res) {
  var data = req.body.data;

  _bar2.default.findOne({ location: data.location }).then(function (bars) {
    if (bars) {
      res.json({ bars: bars });
    } else {
      _axios2.default.get("https://api.yelp.com/v3/businesses/search?location=" + data.location + "&categories=bars", {
        headers: { Authorization: "Bearer " + _private_keys2.default.API_KEY }
      }).then(function (response) {
        if (response.data) {
          var businesses = response.data.businesses;
          var location = req.body.data.location;

          var business = new _bar2.default({
            businesses: businesses,
            location: location
          });
          business.save().then(function (result) {
            if (result) {
              res.json({ bars: result });
            } else {
              res.json({});
            }
          });
        }
      });
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////
//Indicate user going to a certain bar & remove user from a certain bar route handler //
////////////////////////////////////////////////////////////////////////////////////////
router.post("/update", function (req, res) {
  var _req$body$data = req.body.data,
      barID = _req$body$data.barID,
      businessID = _req$body$data.businessID,
      userID = _req$body$data.userID;

  _bar2.default.findOne({ _id: businessID }).then(function (bar) {
    if (bar) {
      var business = bar;
      var i = 0;
      var N = bar.businesses.length;
      for (i; i < N; i++) {
        if (business.businesses[i]._id.toString() === barID) {
          var j = 0;
          var L = business.businesses[i].attendees.length;
          if (L === 0) {
            business.businesses[i].attendees.push(userID);
            business.businesses[i].going_count++;
            business.save().then(function (result) {
              res.json({ result: result });
            });
          } else {
            for (j; j < L; j++) {
              if (business.businesses[i].attendees[j] === userID) {
                var position = business.businesses[i].attendees.indexOf(userID);
                business.businesses[i].attendees.splice(position, 1);
                business.businesses[i].going_count--;
                business.save().then(function (result) {
                  res.json({ result: result });
                });
              }
            }
          }
        }
      }
    }
  });
});

exports.default = router;
//# sourceMappingURL=bar.js.map