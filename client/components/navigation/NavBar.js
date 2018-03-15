import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "../styles/styles.css";

const NavBar = () => (
  <Menu className="padding" secondary>
    <Link to="/">Home</Link>
    <Menu.Menu position="right">
      <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
    </Menu.Menu>
  </Menu>
);

export default NavBar;
