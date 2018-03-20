//////////////////////
//Bar shchema model //
//////////////////////
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GeoCoords = new Schema({
  latitudes: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

const Item = new Schema({
  alias: {
    type: String,
  },
  title: {
    type: String,
  },
});

const Address = new Schema({
  address1: {
    type: String,
    default: "",
  },
  address2: {
    type: String,
    default: "",
  },
  address3: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  zip_code: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  display_address: [String],
});

const Bar = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  is_closed: {
    type: Boolean,
  },
  url: {
    type: String,
  },
  review_count: {
    type: Number,
  },
  categories: [Item],
  rating: {
    type: Number,
  },
  coordinates: GeoCoords,
  transactions: [String],
  price: {
    type: String,
  },
  location: Address,
  phone: {
    type: String,
  },
  display_name: {
    type: String,
  },
  distance: {
    type: Number,
  },
});

const Businesses = new Schema({
  businesses: [Bar],
});

export default mongoose.model("Businesses", Businesses);
