import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import Loading from 'components/Global/Loading';

import data from '../data.json';

// @connect(state => ({
//   konsumen: state.konsumen.get('konsumen'),
//   error: state.konsumen.get('error'),
//   loading: state.konsumen.get('loading'),
//   shouldUpdate: state.konsumen.get('shouldUpdate'),
// }))

export default class PengeluaranBiaya extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      tanggal: '',
      nomor: '',
      pegawai: '',
    };

    this.handleTanggalChange = this.handleTanggalChange.bind(this);
    this.handleNomorChange = this.handleNomorChange.bind(this);
    this.handlePegawaiChange = this.handlePegawaiChange.bind(this);

    this.handleAddAkun = this.handleAddAkun.bind(this);
  }

  handleTanggalChange(e) {
    e.preventDefault();
    this.setState({ tanggal: e.target.value });
  }

  handleNomorChange(e) {
    e.preventDefault();
    this.setState({ nomor: e.target.value });
  }

  handlePegawaiChange(e) {
    e.preventDefault();
    this.setState({ pegawai: e.target.value });
  }

  handleAddAkun(e) {
    e.preventDefault();
  }

  render() {
    const { history } = this.props;
    const now = new Date();
    const nowDate = now.toISOString().split('T')[0];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <Grid>
            <Row className='title-row'>
              <Col xs={ 12 }>
                <h3>Pengeluaran Biaya</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Tanggal</ControlLabel>
                          <FormControl
                            type='text'
                            value={ nowDate }
                            onChange={ this.handleTanggalChange }
                            placeholder='Tanggal'
                            disabled
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Nomor</ControlLabel>
                          <FormControl componentClass='select' placeholder='Nama' onChange={ this.handleNomorChange } value={ this.state.nomor }>
                            <option value='0'>--Nomor--</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Pegawai</ControlLabel>
                          <FormControl componentClass='select' placeholder='Pegawai' onChange={ this.handlePegawaiChange } value={ this.state.pegawai }>
                            <option value='0'>--Pegawai--</option>
                          </FormControl>
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
                              <Button type='submit' block bsStyle='primary' onClick={ this.handleAddAkun }>Tambah Akun</Button>
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
