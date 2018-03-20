////////////////////////////
//Find bars thunk actions //
////////////////////////////
import axios from "axios";

export const findBars = data => () =>
  axios.post("/api/bars/find", { data }).then(res => res.data.bars);
