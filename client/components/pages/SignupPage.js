import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SignupForm from "../forms/SignUpForm";
import { signup } from "../../actions/user";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = data => this.props.signup(data)
    .then(() => this.props.history.push("/"));

  render() {
    return (
      <Grid padded centered stackable>
        <Grid.Column width={7}>
          <Header as="h2">Sign Up</Header>

          <SignupForm submit={this.submit} />
          <p>Already have an account? Proceed to <Link to="/login">Login</Link></p>
        </Grid.Column>
      </Grid>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { signup })(SignupPage);
