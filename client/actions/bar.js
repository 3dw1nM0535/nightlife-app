////////////////////////////
//Find bars thunk actions //
////////////////////////////
import axios from "axios";

import { locateBars } from "../actions/actionCreators";

////////////////////
//Find bar action //
////////////////////
export const findBars = data => dispatch =>
  axios.post("/api/bars/find", { data }).then(res => res.data.bars)
    .then((bars) => {
      dispatch(locateBars(bars));
    });
/////////////////////////////////
//Update bar to indicate going //
/////////////////////////////////
export const indicateGoing = data => dispatch =>
  axios.post("/api/bars/update", { data }).then(res => res.data.result)
    .then((result) => {
      dispatch(locateBars(result));
    });
