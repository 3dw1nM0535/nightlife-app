import axios from "axios";

import { userLoggedIn, userLoggedOut } from "./actionCreators";


//////////////////////////////
//User login action handler //
//////////////////////////////
export const login = data => dispatch =>
  axios.post("/api/auth/user", { data }).then(res => res.data.user)
    .then((user) => {
      localStorage.token = user.token;
      dispatch(userLoggedIn(user));
    });

///////////////////////////////
//User signup action handler //
///////////////////////////////
export const signup = data => dispatch =>
  axios.post("/api/user/signup", { data }).then(res => res.data.user)
    .then((user) => {
      localStorage.token = user.token;
      dispatch(userLoggedIn(user));
    });

///////////////////////////////
//User logout action handler //
///////////////////////////////
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(userLoggedOut());
};
