import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import LoginForm from "../forms/LoginForm";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = data => console.log(data);
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

export default LoginPage;
