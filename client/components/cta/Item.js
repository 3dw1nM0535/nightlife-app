import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Item, Button } from "semantic-ui-react";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { bars, isAuthenticated } = this.props;

    return (
      <Item.Group divided relaxed>
        { !bars.businesses ? null : (
          bars.businesses.map(item =>
          <Item>
            <Item.Image size="small" src={item.image_url} />
            <Item.Content verticalAlign="middle">
              <Item.Header>{item.name}</Item.Header>
              <Item.Description>{item.id}</Item.Description>
              <Item.Extra>
                <Button size="tiny" color="blue" floated="right">Going?</Button>
              </Item.Extra>
            </Item.Content>
          </Item>)
        )}
      </Item.Group>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

Content.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  bars: PropTypes.shape({
    _id: PropTypes.string,
    _v: PropTypes.number,
    businesses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps)(Content);
