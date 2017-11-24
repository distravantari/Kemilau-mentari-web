import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import Loading from 'components/Global/Loading';
import DevelopmentNotice from 'components/Global/DevelopmentNotice';

import data from '../data.json';

// @connect(state => ({
//   konsumen: state.konsumen.get('konsumen'),
//   error: state.konsumen.get('error'),
//   loading: state.konsumen.get('loading'),
//   shouldUpdate: state.konsumen.get('shouldUpdate'),
// }))

export default class EditAkun extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      newDataPegawai: {

      },
      isolatedDataPegawai: {

      },
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNamaPegawaiChange = this.handleNamaPegawaiChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleMasterPasswordChange = this.handleMasterPasswordChange.bind(this);
    this.handleAddAkun = this.handleAddAkun.bind(this);
  }

  handleNamaPegawaiChange(e) {
    e.preventDefault();
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, namaPegawai: e.target.value } });
  }

  handleUsernameChange(e) {
    e.preventDefault();
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, username: e.target.value } });
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, password: e.target.value } });
  }

  handleConfirmPasswordChange(e) {
    e.preventDefault();
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, confirmPassword: e.target.value } });
  }

  handleMasterPasswordChange(e) {
    e.preventDefault();
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, masterPassword: e.target.value } });
  }

  handleAddAkun(e) {
    e.preventDefault();
  }

  handleDeleteAkun(e) {
    e.preventDefault();
  }

  renderPrivilegeCol(item, index) {
    return (
      <Col xs={ 3 } key={ item.id }>
        <Row>
          <Col xs={ 12 }>
            <h5 className='text-center'>{item.tipe}</h5>
          </Col>
        </Row>
        {
          item.data.map((x, idx) => this.renderPrivilegeItem(x, idx))
        }
      </Col>
    );
  }

  renderPrivilegeItem(item) {
    return (
      <Row key={ item.id } className='privilege-item'>
        <Col xs={ 12 }>
          {
            (item.status) ? (
              <Button block bsStyle='success'>{item.nama}</Button>
            ) : (
              <Button block bsStyle='default'>{item.nama}</Button>
              )
          }
        </Col>
      </Row>
    );
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <DevelopmentNotice />
        <Menu history={ history } />
        <section className='product-section'>
          <Grid>
            <Row className='title-row'>
              <Col xs={ 12 }>
                <h3>Akun</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <h4>Edit Akun</h4>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Nama Pegawai</ControlLabel>
                          <FormControl componentClass='select' placeholder='Nama Pegawai' onChange={ this.handleNamaPegawaiChange } value={ this.state.newDataPegawai.namaPegawai }>
                            <option value='0'>--Nama Pegawai--</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>New Password</ControlLabel>
                          <FormControl
                            type='password'
                            value={ this.state.newDataPegawai.password }
                            onChange={ this.handlePasswordChange }
                            placeholder='Password'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Confirm New Password</ControlLabel>
                          <FormControl
                            type='password'
                            value={ this.state.newDataPegawai.confirmPassword }
                            onChange={ this.handleConfirmPasswordChange }
                            placeholder='Confirm Password'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <h4>Privilege</h4>
                      <Row>
                        {
                          data.privilege.data.map((item, index) => this.renderPrivilegeCol(item, index))
                        }
                      </Row>
                      <Row>
                        <Col xs={ 12 }>
                          <Form>
                            <FormGroup>
                              <HelpBlock>{null}</HelpBlock>
                              <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteAkun }>Delete Akun</Button>
                              <Button type='submit' block bsStyle='primary' onClick={ this.handleAddAkun }>Edit Akun</Button>
                            </FormGroup>
                          </Form>
                        </Col>
                      </Row>
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
