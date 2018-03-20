import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GuestRoute from "./routes/GuestRoute";
import UserRoute from "./routes/UserRoute";
import HomePage from "./components/pages/HomePage";
import TopNavigation from "./components/navigation/TopNavigation";
import NavBar from "./components/navigation/NavBar";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    { isAuthenticated ? <TopNavigation /> : <NavBar /> }
    <GuestRoute location={location} path="/" exact component={HomePage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute location={location} path="/signup" exact component={SignupPage} />
    <UserRoute location={location} path="/dashboard" exact component={HomePage} />
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps)(App));
