import React from "react";
import { Form, Button, Card } from "semantic-ui-react";
import validator from "validator";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
        confirmPassword: "",
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
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ isLoading: true });
      this.props.submit(this.state.data);
    }
  }

  validate = (data) => {
    const errors = {};

    if (!data.email) errors.email = "Can't be Blank";
    if (!validator.isEmail(data.email)) errors.email = "Invalid Email";
    if (!data.password) errors.password = "Can't be Blank";
    if (!data.confirmPassword) errors.confirmPassword = "Can't ne Blank";
    if (!validator.equals(data.password, data.confirmPassword)) errors.confirmPassword = "Passwords do not match";

    return errors;
  }
  render() {
    const { data, errors, isLoading } = this.state;

    return (
      <Card fluid centered>
          <Card.Content>
            <Form unstackable={false} onSubmit={this.onSubmit} loading={isLoading}>
              <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@email.com"
                  onChange={this.onChange}
                  value={data.email}
                />
                { errors.email && <InlineError text={errors.email} /> }
              </Form.Field>
              <Form.Field error={!!errors.password}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={data.password}
                />
                { errors.password && <InlineError text={errors.password} /> }
              </Form.Field>
              <Form.Field error={!!errors.confirmPassword}>
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={data.confirmPassword}
                />
                { errors.confirmPassword && <InlineError text={errors.confirmPassword} /> }
              </Form.Field>
              <Button color="blue">Sign Up</Button>
            </Form>
          </Card.Content>
        </Card>
    );
  }
}

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SignUpForm;
