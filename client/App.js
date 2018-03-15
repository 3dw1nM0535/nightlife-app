import React from "react";
import { withRouter } from "react-router-dom";
import { Header } from "semantic-ui-react";

const App = () => (
  <Header as="h3">Nightlife Coordination App</Header>
);

export default withRouter(App);
