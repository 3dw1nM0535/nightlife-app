import React from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { findBars } from "../../actions/bar";
import SearchForm from "../forms/SearchForm";
import Content from "../cta/Item";

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

  submit = data => this.props.findBars(data);

  render() {
    const { bars } = this.props;
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
            <Content bars={bars} />
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
    _id: PropTypes.string,
    _v: PropTypes.number,
    businesses: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps, { findBars })(HomePage);
