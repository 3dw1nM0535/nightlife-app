"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; //////////////////////
//Bar shchema model //
//////////////////////


var GeoCoords = new Schema({
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
});

var Item = new Schema({
  alias: {
    type: String
  },
  title: {
    type: String
  }
});

var Address = new Schema({
  address1: {
    type: String,
    default: ""
  },
  address2: {
    type: String,
    default: ""
  },
  address3: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  zip_code: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  display_address: [String]
});

var Bar = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  image_url: {
    type: String
  },
  is_closed: {
    type: Boolean
  },
  going_count: {
    type: Number,
    default: 0
  },
  attendees: [String],
  url: {
    type: String
  },
  review_count: {
    type: Number
  },
  categories: [Item],
  rating: {
    type: Number
  },
  coordinates: GeoCoords,
  transactions: [String],
  price: {
    type: String
  },
  location: Address,
  phone: {
    type: String
  },
  display_name: {
    type: String
  },
  distance: {
    type: Number
  }
});

var Businesses = new Schema({
  businesses: [Bar],
  location: String
});

exports.default = _mongoose2.default.model("Businesses", Businesses);
//# sourceMappingURL=bar.js.map