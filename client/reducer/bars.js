/////////////////
//Bars reducer //
/////////////////
import { LOCATE_BARS, CLEAR_STORE } from "../actions/types";

export default function bars(state = {}, action = {}) {
  switch (action.type) {
    case LOCATE_BARS:
      return action.bars;
    case CLEAR_STORE:
      return {};
    default:
      return state;
  }
}
