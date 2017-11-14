import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock, Radio } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import Loading from 'components/Global/Loading';
import ModalBarang from 'components/Global/ModalBarang';

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

export default class PenerimaanBarang extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      tanggal: '',
      nomor: '',
      pegawai: '',
      showModalBarang: false,
    };

    this.handleTanggalChange = this.handleTanggalChange.bind(this);
    this.handleNomorChange = this.handleNomorChange.bind(this);
    this.handlePegawaiChange = this.handlePegawaiChange.bind(this);

    this.handleAddAkun = this.handleAddAkun.bind(this);

    this.handleShowModalBarang = this.handleShowModalBarang.bind(this);
    this.handleHideModalBarang = this.handleHideModalBarang.bind(this);
  }

  handleShowModalBarang(e) {
    this.setState({ showModalBarang: true });
  }

  handleHideModalBarang(e) {
    this.setState({ showModalBarang: false });
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

    const columnModalBarang = [
      {
        Header: 'Kategori',
        accessor: 'kategori.nama',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
      {
        Header: 'Merek',
        accessor: 'merek.nama',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
      {
        Header: 'Nama Barang',
        accessor: 'nama_barang',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
      {
        Header: 'Harga Beli',
        accessor: 'harga_beli',
      },
      {
        Header: 'Harga Jual',
        accessor: 'harga_jual',
      },
      {
        Header: 'Nama Supplier',
        accessor: 'supplier_barang.nama',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
    ];

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
        Header: 'Harga',
        accessor: 'hargaJual',
        filterable: false,
      },
      {
        Header: 'QTY',
        accessor: 'qty',
        filterable: false,
      },
      {
        Header: 'Total Harga',
        accessor: 'total',
        filterable: false,
      },
    ];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <ModalBarang hidden={ !this.state.showModalBarang } columns={ columnModalBarang } onHide={ this.handleHideModalBarang } />
          <Grid>
            <Row className='title-row'>
              <Col xs={ 12 }>
                <h3>Penerimaan Barang</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <Form>
                        <Row>
                          <Col xs={ 6 }>
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
                              <FormControl
                                type='text'
                                value={ this.state.nomor }
                                onChange={ this.handleNomorChange }
                                placeholder='Nomor'
                                disabled
                              />
                              <FormControl.Feedback />
                            </FormGroup>
                          </Col>
                          <Col xs={ 6 }>
                            <div className='total-wrapper text-center'>
                              <h3 className='total'>Rp. 0</h3>
                            </div>
                            <FormGroup>
                              <ControlLabel>Supplier</ControlLabel>
                              <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleSalesmanChange } value={ this.state.salesman }>
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
                              <ControlLabel>No. Faktur</ControlLabel>
                              <FormControl
                                type='text'
                                value={ this.state.noFaktur }
                                onChange={ this.handleNoFakturChange }
                                placeholder='No. Faktur'
                              />
                              <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Pembayaran</ControlLabel>
                              <Radio name='radioGroup' inline>Cash</Radio>
                              <Radio name='radioGroup' inline>Kredit</Radio>
                              <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup>
                              <ControlLabel>Tgl. Jatuh Tempo</ControlLabel>
                              <FormControl
                                type='text'
                                value={ this.state.tanggalJatuhTempo }
                                onChange={ this.handleTanggalJatuhTempoChange }
                                placeholder='Tgl. Jatuh Tempo'
                              />
                              <FormControl.Feedback />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </Panel>
                    <Panel>
                      <Row>
                        <Col xs={ 12 }>
                          <Form>
                            <FormGroup>
                              <ControlLabel>Nama Barang</ControlLabel>
                              <FormControl
                                type='text'
                                value={ this.state.kodeBarang }
                                onChange={ this.handleKodeBarangChange }
                                placeholder='Kode Barang'
                                onClick={ this.handleShowModalBarang }
                              />
                              <FormControl.Feedback />
                            </FormGroup>
                          </Form>
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
