import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../styles/styles.css";

const HomePage = () => (
  <Grid stackable columns={1}>
    <Grid.Column>
      <Segment className="segment-padded" textAlign="center" padded="very">
        <Header as="h1">Welcome to Nightlife Coordination App</Header>
        <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
      </Segment>
    </Grid.Column>
  </Grid>
);

export default HomePage;
