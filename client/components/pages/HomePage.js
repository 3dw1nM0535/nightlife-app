import React from "react";
import { Grid, Header, Icon, Item, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { findBars } from "../../actions/bar";
import SearchForm from "../forms/SearchForm";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    const data = {
      location: localStorage.location,
    };
    if (this.props.isAuthenticated && localStorage.location) {
      this.props.findBars(data);
    }
  }

  onClick = () => this.props.history.push("/login");

  indicateGoing = item => console.log(item);

  submit = data => this.props.findBars(data);

  render() {
    const { isAuthenticated, bars } = this.props;

    return (
      <Grid textAlign="center" columns={2} stackable container>
        <Grid.Column>
          <Header as="h1">Plans Tonight?</Header>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column>
            <Icon name="cocktail" color="blue" size="big" />
            <Icon name="taxi" color="blue" size="big" />
            <Icon name="marker" color="blue" size="big" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Header as="h3">See which bars are poppin' tonight and RSVP ahead of time</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <SearchForm submit={this.submit} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Item.Group relaxed>
            { !bars.businesses ? null : (
              bars.businesses.map(item => (
                <Item key={item.id}>
                  <Item.Image src={item.image_url} size="small" />

                  <Item.Content verticalAlign="middle">
                    <Item.Header>{item.name}</Item.Header>
                    <Item.Description>{item.id}</Item.Description>
                      <Item.Extra>
                        <Button onClick={!isAuthenticated ? this.onClick : this.indicateGoing} primary size="tiny" floated="right">Going?</Button>
                      </Item.Extra>
                  </Item.Content>
                </Item>
              ))
            )}
          </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    bars: state.bars,
  };
}

HomePage.propTypes = {
  findBars: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  bars: PropTypes.shape({
    location: PropTypes.string,
    businesses: PropTypes.arrayOf(PropTypes.object),
    _id: PropTypes.string,
    _v: PropTypes.number,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, { findBars })(HomePage);
