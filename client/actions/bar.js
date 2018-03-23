////////////////////////////
//Find bars thunk actions //
////////////////////////////
import axios from "axios";

import { locateBars } from "../actions/actionCreators";

export const findBars = data => dispatch =>
  axios.post("/api/bars/find", { data }).then(res => res.data.bars)
    .then((bars) => {
      dispatch(locateBars(bars));
    });
