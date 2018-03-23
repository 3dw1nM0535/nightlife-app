import { USER_LOGGED_IN, USER_LOGGED_OUT, LOCATE_BARS, CLEAR_STORE } from "./types";

//////////////////////////////
//User login action creator //
//////////////////////////////
export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

///////////////////////////////
//User logout action creator //
///////////////////////////////
export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

/////////////////////////////
//Find bars action creator //
/////////////////////////////
export const locateBars = bars => ({
  type: LOCATE_BARS,
  bars,
});

///////////////////////////////
//Clear store action creator //
///////////////////////////////
export const clearStore = () => ({
  type: CLEAR_STORE,
});
