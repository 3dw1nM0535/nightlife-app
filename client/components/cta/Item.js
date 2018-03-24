import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Item, Button, Label } from "semantic-ui-react";

import { indicateGoing } from "../../actions/bar";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (id) => {
    const barID = id;
    const userID = this.props._id;
    const data = {
      barID,
      userID,
    };
    this.props.indicateGoing(data);
  }

  render() {
    const { bars, isAuthenticated } = this.props;

    return (
      <Item.Group divided relaxed>
        { !bars.businesses ? null : (
          bars.businesses.map(item =>
          <Item key={item._id}>
            <Item.Image size="small" src={item.image_url} />
            <Item.Content verticalAlign="middle">
              <Item.Header>{item.name}</Item.Header>
              <Item.Description>{item.id}</Item.Description>
              <Item.Extra>
                <Button onClick={!isAuthenticated ? this.props.onClick : this.handleClick.bind(this, item._id)} size="tiny" color="blue">Going?</Button>
                <Label circular color="grey">{parseInt(item.going_count, 10)}</Label>
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
    _id: state.user._id,
  };
}

Content.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  bars: PropTypes.shape({
    _id: PropTypes.string,
    _v: PropTypes.number,
    businesses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  indicateGoing: PropTypes.func.isRequired,
  _id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { indicateGoing })(Content);
