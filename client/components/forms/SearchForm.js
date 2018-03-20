import React from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import InlineError from "../messages/InlineError";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        location: "",
      },
      isLoading: false,
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
    localStorage.location = e.target.value;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ isLoading: true });
      this.props.submit(this.state.data).then(() => this.setState({ isLoading: false }));
    }
  }

  validate = (data) => {
    const errors = {};

    if (!data.location) errors.location = "Can't be Blank";

    return errors;
  }
  render() {
    const { errors, isLoading, data } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Form size="tiny" onSubmit={this.onSubmit}>
          <Form.Group widths="equal">
            <Form.Input disabled={isLoading} fluid name="location" value={!isAuthenticated ? data.location : localStorage.location} onChange={this.onChange} placeholder="Enter location to search" error={!!errors.location} />
            <Button disabled={isLoading} primary size="tiny">Search</Button>
          </Form.Group>
          { errors.location && <InlineError text={errors.location} /> }
        </Form>
        <div>
          { isLoading ? <div>Loading...</div> : "" }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

SearchForm.propTypes = {
  submit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(SearchForm);
