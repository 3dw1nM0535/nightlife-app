import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route { ...rest } render={ props => !isAuthenticated ? 
    (
      <Component { ...props } />
    ):(
      <Redirect to="/dashboard" />
    )
  }
  />
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

GuestRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GuestRoute);
