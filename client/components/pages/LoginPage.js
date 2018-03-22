import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/authUser";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = data => this.props.login(data)
    .then(() => this.props.history.push("/"));

  render() {
    return (
      <Grid centered padded stackable>
        <Grid.Column width={7}>
          <Header as="h2">Login</Header>

          <LoginForm submit={this.submit} />
          <p>Create account <Link to="/signup">Sign Up</Link></p>
        </Grid.Column>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginPage);
