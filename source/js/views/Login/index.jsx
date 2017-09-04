import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from 'actions/user';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';

import { routeCodes } from 'config/routes';

@connect(state => ({
  error: state.user.get('error'),
  loading: state.user.get('loading'),
  isAuthenticated: state.user.get('isAuthenticated'),
}))

export default class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    loading: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated, history } = this.props;
    if (!prevProps.isAuthenticated && isAuthenticated) {
      history.push(routeCodes.PRODUCT);
    }
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const userData = { ...this.state };
    dispatch(login(userData));
  }


  render() {
    const { loading, error } = this.props;
    return (
      <section className='login-section'>
        <div className='login-wrapper'>
          <Grid>
            <Row className='title-row'>
              <Col xs={ 12 } className='text-center'>
                <h3 className='login-title name'>Deva States</h3>
                <h4 className='login-title'>LOGIN</h4>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Form onSubmit={ this.handleLogin }>
                  <FormGroup>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                      type='text'
                      value={ this.state.username }
                      placeholder='Username'
                      onChange={ this.handleUsernameChange }
                    />
                    <FormControl.Feedback />
                    <HelpBlock>{error}</HelpBlock>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      type='password'
                      value={ this.state.password }
                      placeholder='Password'
                      onChange={ this.handlePasswordChange }
                    />
                    <FormControl.Feedback />
                    <HelpBlock>{error}</HelpBlock>
                  </FormGroup>
                  <Button type='submit' bsStyle='primary' block disabled={ loading }>Login</Button>
                </Form>
              </Col>
            </Row>
          </Grid>
        </div>
      </section>
    );
  }
}
