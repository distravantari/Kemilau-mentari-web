import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSetting, editSetting } from 'actions/setting';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import { routeCodes } from 'config/routes';

@connect(state => ({
  setting: state.setting.get('setting'),
  error: state.setting.get('error'),
  loading: state.setting.get('loading'),
  isAuthenticated: state.user.get('isAuthenticated'),
}))

export default class Setting extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.object,
    loading: PropTypes.bool,
    setting: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      stateSetting: {
        'mailgun_domain': '',
        'mailgun_api_key': '',
        'mailgun_email': '',
        'domain': '',
        'kurs': '',
        'ongkir_url': '',
        'ongkir_key': '',
        'counter': 0,
        'facebook_link': '',
        'instagram_link': '',
        'origin_shipping': 0,
        'item_weight': 0,
      },
    };

    this.handleKursChange = this.handleKursChange.bind(this);
    this.handleFacebookLinkChange = this.handleFacebookLinkChange.bind(this);
    this.handleInstagramLinkChange = this.handleInstagramLinkChange.bind(this);
    this.handleItemWeightChange = this.handleItemWeightChange.bind(this);
    this.handleOriginShippingChange = this.handleOriginShippingChange.bind(this);

    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.handleMailgunDomainChange = this.handleMailgunDomainChange.bind(this);
    this.handleMailgunApiKeyChange = this.handleMailgunApiKeyChange.bind(this);
    this.handleMailgunEmailChange = this.handleMailgunEmailChange.bind(this);
    this.handleOngkirUrlChange = this.handleOngkirUrlChange.bind(this);
    this.handleOngkirKeyChange = this.handleOngkirKeyChange.bind(this);

    this.handleEditSetting = this.handleEditSetting.bind(this);
  }

  componentWillMount() {
    const { dispatch, isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      dispatch(getSetting());
    } else {
      history.push(routeCodes.LOGIN);
    }
  }

  componentDidUpdate(prevProps) {
    const self = this;
    const { setting } = self.props;
    if (prevProps.setting !== setting) {
      self.setState({ stateSetting: { ...setting.toJS() } });
    }
  }

  handleKursChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, kurs: e.target.value } });
  }

  handleFacebookLinkChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, facebook_link: e.target.value } });
  }


  handleInstagramLinkChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, instagram_link: e.target.value } });
  }

  handleItemWeightChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, item_weight: e.target.value } });
  }

  handleOriginShippingChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, origin_shipping: e.target.value } });
  }

  handleDomainChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, domain: e.target.value } });
  }

  handleMailgunDomainChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, mailgun_domain: e.target.value } });
  }

  handleMailgunApiKeyChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, mailgun_api_key: e.target.value } });
  }

  handleMailgunEmailChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, mailgun_email: e.target.value } });
  }

  handleOngkirUrlChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, ongkir_url: e.target.value } });
  }

  handleOngkirKeyChange(e) {
    this.setState({ stateSetting: { ...this.state.stateSetting, ongkir_key: e.target.value } });
  }

  handleEditSetting(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const settingData = { ...this.state.stateSetting };
    dispatch(editSetting(settingData));
  }

  render() {
    const { loading, error, history } = this.props;
    return (
      <div>
        <Menu history={ history } />
        <section className='setting-section'>
          <Grid>
            <Row className='title-row'>
              <Col xs={ 12 }>
                <h3>Setting</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-setting-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <h4>Shop Setting</h4>
                      <Form onSubmit={ this.handleEditSetting }>
                        <FormGroup>
                          <ControlLabel>Shipping Origin</ControlLabel>
                          <FormControl
                            type='number'
                            value={ this.state.stateSetting.origin_shipping }
                            onChange={ this.handleOriginShippingChange }
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Kurs</ControlLabel>
                          <FormControl
                            step='0.01'
                            min={ 0 }
                            type='number'
                            value={ this.state.stateSetting.kurs }
                            onChange={ this.handleKursChange }
                            placeholder='Kurs'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Weight per Pcs(g)</ControlLabel>
                          <FormControl
                            type='number'
                            value={ this.state.stateSetting.item_weight }
                            onChange={ this.handleItemWeightChange }
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Facebook Link</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.stateSetting.facebook_link }
                            onChange={ this.handleFacebookLinkChange }
                            placeholder='http://www.facebook.com'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Instagram Link</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.stateSetting.instagram_link }
                            onChange={ this.handleInstagramLinkChange }
                            placeholder='http://www.instagram.com'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <hr />
                        <h4 className='red'>Danger Zone</h4>
                        <FormGroup>
                          <ControlLabel>Domain</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.stateSetting.domain }
                            onChange={ this.handleDomainChange }
                            placeholder='Mailgun API Key'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Mailgun Domain</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.stateSetting.mailgun_domain }
                            onChange={ this.handleMailgunDomainChange }
                            placeholder='Mailgun Domain'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Mailgun API Key</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.stateSetting.mailgun_api_key }
                            onChange={ this.handleMailgunApiKeyChange }
                            placeholder='Mailgun API Key'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Mailgun Email</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.stateSetting.mailgun_email }
                            onChange={ this.handleMailgunEmailChange }
                            placeholder='Mailgun Email'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Ongkir API URL</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.stateSetting.ongkir_url }
                            onChange={ this.handleOngkirUrlChange }
                            placeholder='Ongkir API URL'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Ongkir API Key</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.stateSetting.ongkir_key }
                            onChange={ this.handleOngkirkeyChange }
                            placeholder='Ongkir API Key'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          {
                            (error) ? (
                              <HelpBlock>{error.get('message')}</HelpBlock>
                            ) : (
                                null
                              )
                          }
                          <Button type='submit' block bsStyle='primary' disabled={ loading }>Save Settings</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </section>
      </div>
    );
  }
}
