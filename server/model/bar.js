//////////////////////
//Bar shchema model //
//////////////////////
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Bar = new Schema({
  bussinesses: [Object],
});

export default mongoose.model("Bar", Bar);
