import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import gravatarUrl from "gravatar-url";

import * as actions from "../../actions/authUser";

class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { logout, user } = this.props;
    const { activeItem } = this.state;

    const trigger = (
      <Image avatar src={gravatarUrl(user.email)} />
    );

    const text = (
      <span>Signed in as <strong>{user.fullname}</strong></span>
    );

    return (
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/dashboard" active={activeItem === "Home"} name="Home" onClick={this.handleItemClick} />
          <Dropdown trigger={trigger} className="link item" pointing="top right" icon={null}>
            <Dropdown.Menu>
              <Dropdown.Item text={text} disabled />
              <Dropdown.Item text="Logout" onClick={() => logout()} icon="sign out" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

TopNavigation.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);
