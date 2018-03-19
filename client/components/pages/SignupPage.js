import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import SignupForm from "../forms/SignUpForm";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = data => console.log(data);
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

export default SignupPage;
