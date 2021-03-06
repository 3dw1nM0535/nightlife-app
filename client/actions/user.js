import axios from "axios";

import { userLoggedIn, userLoggedOut, clearStore } from "./actionCreators";

///////////////////////////////
//User signup action handler //
///////////////////////////////
export const signup = data => dispatch =>
  axios.post("/api/auth", { data }).then(res => res.data.user)
    .then((user) => {
      localStorage.token = user.token;
      dispatch(userLoggedIn(user));
    });

//////////////////////////////
//User login action handler //
//////////////////////////////
export const login = data => dispatch =>
  axios.post("/api/user", { data }).then(res => res.data.user)
    .then((user) => {
      localStorage.token = user.token;
      dispatch(userLoggedIn(user));
    });

///////////////////////////////
//User logout action handler //
///////////////////////////////
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(clearStore());
  dispatch(userLoggedOut());
};
