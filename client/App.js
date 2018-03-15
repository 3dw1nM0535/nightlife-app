import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GuestRoute from "./routes/GuestRoute";
import HomePage from "./components/pages/HomePage";

import TopNavigation from "./components/navigation/TopNavigation";
import NavBar from "./components/navigation/NavBar";

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    { isAuthenticated ? <TopNavigation /> : <NavBar /> }
    <GuestRoute location={location} path="/" exact component={HomePage} />
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
