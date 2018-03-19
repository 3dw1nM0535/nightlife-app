import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import decoder from "jwt-decode";

import "semantic-ui-css/semantic.min.css";
import "./components/styles/styles.css";

import configureStore, { history } from "./store/store";
import { userLoggedIn } from "./actions/actionCreators";

import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);

if (localStorage.token) {
  const payload = decoder(localStorage.token);
  const user = {
    email: payload.email,
    _id: payload._id,
    token: localStorage.token,
  };
  store.dispatch(userLoggedIn(user));
}

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <NextApp />
        </Router>
      </Provider>,
      document.getElementById("root"),
    );
  });
}
