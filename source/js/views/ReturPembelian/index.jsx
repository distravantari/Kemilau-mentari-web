import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import Loading from 'components/Global/Loading';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import data from '../data.json';

// @connect(state => ({
//   konsumen: state.konsumen.get('konsumen'),
//   error: state.konsumen.get('error'),
//   loading: state.konsumen.get('loading'),
//   shouldUpdate: state.konsumen.get('shouldUpdate'),
// }))

export default class ReturPembelian extends Component {
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
    const columns = [
      {
        Header: 'Kode',
        accessor: 'kode',
        filterable: false,
      },
      {
        Header: 'Nama Barang',
        accessor: 'nama',
        filterable: false,
      },
      {
        Header: 'Harga Beli',
        accessor: 'hargaBeli',
        filterable: false,
      },
      {
        Header: 'QTY',
        accessor: 'qty',
        filterable: false,
      },
      {
        Header: 'Total',
        accessor: 'total',
        filterable: false,
      },
      {
        Header: 'Keterangan',
        accessor: 'keterangan',
        filterable: false,
      },
    ];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <Grid>
            <Row className='title-row'>
              <Col xs={ 12 }>
                <h3>Retur Pembelian</h3>
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
                          <ControlLabel>Supplier</ControlLabel>
                          <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleSupplierChange } value={ this.state.supplier }>
                            <option value='0'>--Supplier--</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Alamat</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.alamat }
                            onChange={ this.handleAlamatChange }
                            placeholder='Alamat'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Nama Barang</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.namaBarang }
                            onChange={ this.handleNamaBarangChange }
                            placeholder='Nama Barang'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Harga Beli</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.hargaBeli }
                            onChange={ this.handleHargaBeliChange }
                            placeholder='Harga Beli'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Quantity</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.quantity }
                            onChange={ this.handleQuantityChange }
                            placeholder='Quantity'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Total</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.total }
                            onChange={ this.handleTotalChange }
                            placeholder='Total'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Keterangan</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.keterangan }
                            onChange={ this.handleKeteranganChange }
                            placeholder='Keterangan'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <Row>
                        <Col xs={ 12 }>
                          <ReactTable
                            data={ data.retur.data }
                            columns={ columns }
                            noDataText='No Data Available'
                            filterable
                            defaultPageSize={ 10 }
                            className='-striped -highlight'
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={ 12 }>
                          <Form>
                            <FormGroup>
                              <HelpBlock>{null}</HelpBlock>
                              <Button type='submit' block bsStyle='primary' onClick={ this.handleAddAkun }>Print</Button>
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
