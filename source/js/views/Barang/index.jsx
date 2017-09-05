import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Image, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import { routeCodes } from 'config/routes';

import data from '../data.json';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class Barang extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      dataBarang: data.barang.data,
      newDataBarang: {},
      isolatedDataBarang: {},
      showModal: false,
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.handleKatagoriChange = this.handleKatagoriChange.bind(this);
    this.handleIsolatedKatagoriChange = this.handleIsolatedKatagoriChange.bind(this);

    this.handleMerekChange = this.handleMerekChange.bind(this);
    this.handleIsolatedMerekChange = this.handleIsolatedMerekChange.bind(this);

    this.handleTipeChange = this.handleTipeChange.bind(this);
    this.handleIsolatedTipeChange = this.handleIsolatedTipeChange.bind(this);

    this.handleNamaChange = this.handleNamaChange.bind(this);
    this.handleIsolatedNamaChange = this.handleIsolatedNamaChange.bind(this);

    this.handleSatuanChange = this.handleSatuanChange.bind(this);
    this.handleIsolatedSatuanChange = this.handleIsolatedSatuanChange.bind(this);

    this.handleHargaBeliChange = this.handleHargaBeliChange.bind(this);
    this.handleIsolatedHargaBeliChange = this.handleIsolatedHargaBeliChange.bind(this);

    this.handleHargaJualChange = this.handleHargaJualChange.bind(this);
    this.handleIsolatedHargaJualChange = this.handleIsolatedHargaJualChange.bind(this);

    this.handleSupplierChange = this.handleSupplierChange.bind(this);
    this.handleIsolatedSupplierChange = this.handleIsolatedSupplierChange.bind(this);
  }

  handleKatagoriChange(e) {
    this.setState({ newDataBarang: { ...this.state.newDataBarang, katagori: e.target.value } });
  }

  handleIsolatedKatagoriChange(e) {
    this.setState({ isolatedDataBarang: { ...this.state.isolatedDataBarang, katagori: e.target.value } });
  }

  handleMerekChange(e) {
    this.setState({ newDataBarang: { ...this.state.newDataBarang, merek: e.target.value } });
  }

  handleIsolatedMerekChange(e) {
    this.setState({ isolatedDataBarang: { ...this.state.isolatedDataBarang, merek: e.target.value } });
  }

  handleTipeChange(e) {
    this.setState({ newDataBarang: { ...this.state.newDataBarang, tipe: e.target.value } });
  }

  handleIsolatedTipeChange(e) {
    this.setState({ isolatedDataBarang: { ...this.state.isolatedDataBarang, tipe: e.target.value } });
  }

  handleNamaChange(e) {
    this.setState({ newDataBarang: { ...this.state.newDataBarang, nama_barang: e.target.value } });
  }

  handleIsolatedNamaChange(e) {
    this.setState({ isolatedDataBarang: { ...this.state.isolatedDataBarang, nama_barang: e.target.value } });
  }

  handleSatuanChange(e) {
    this.setState({ newDataBarang: { ...this.state.newDataBarang, satuan: e.target.value } });
  }

  handleIsolatedSatuanChange(e) {
    this.setState({ isolatedDataBarang: { ...this.state.isolatedDataBarang, satuan: e.target.value } });
  }

  handleHargaBeliChange(e) {
    this.setState({ newDataBarang: { ...this.state.newDataBarang, harga_beli: e.target.value } });
  }

  handleIsolatedHargaBeliChange(e) {
    this.setState({ isolatedDataBarang: { ...this.state.isolatedDataBarang, harga_beli: e.target.value } });
  }

  handleHargaJualChange(e) {
    this.setState({ newDataBarang: { ...this.state.newDataBarang, harga_jual: e.target.value } });
  }

  handleIsolatedHargaJualChange(e) {
    this.setState({ isolatedDataBarang: { ...this.state.isolatedDataBarang, harga_jual: e.target.value } });
  }

  handleSupplierChange(e) {
    this.setState({ newDataBarang: { ...this.state.newDataBarang, supplier: e.target.value } });
  }

  handleIsolatedSupplierChange(e) {
    this.setState({ isolatedDataBarang: { ...this.state.isolatedDataBarang, supplier: e.target.value } });
  }

  textFilter(filter, row) {
    const result = parseInt(row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()), 10);
    if (result < 0) {
      return false;
    }
    return true;
  }

  handleShowModal(e, rowInfo) {
    const { dataBarang } = this.state;
    const isolatedDataBarang = dataBarang.filter((item) => item === rowInfo.original)[0];
    this.setState({ isolatedDataBarang, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedDataBarang: {}, showModal: false });
  }

  render() {
    const { dataBarang } = this.state;
    const { history } = this.props;
    const columns = [
      {
        Header: 'Name',
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
        Header: 'Katagori',
        accessor: 'katagori',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
      {
        Header: 'Merek',
        accessor: 'merek',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
      {
        Header: 'Tanggal Update',
        accessor: 'tgl_update',
      },
      {
        Header: 'Nama Supplier',
        accessor: 'nama_supplier',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
      {
        Header: 'Operator',
        accessor: 'operator',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
    ];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <Modal show={ this.state.showModal } onHide={ this.handleCloseModal } dialogClassName='edit-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Detail Barang</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Katagori</ControlLabel>
                  <FormControl componentClass='select' placeholder='Katagori' onChange={ this.handleIsolatedKatagoriChange } value={ this.state.isolatedDataBarang.katagori }>
                    <option value='0'>--Pilih Katagori--</option>
                    <option value='1'>Katagori 1</option>
                    <option value='2'>Katagori 2</option>
                    <option value='3'>Katagori 3</option>
                    <option value='4'>Katagori 4</option>
                    <option value='5'>Katagori 5</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Merek</ControlLabel>
                  <FormControl componentClass='select' placeholder='Merek' onChange={ this.handleIsolatedMerekChange } value={ this.state.isolatedDataBarang.merk }>
                    <option value='0'>--Pilih Merek--</option>
                    <option value='1'>Merek 1</option>
                    <option value='2'>Merek 2</option>
                    <option value='3'>Merek 3</option>
                    <option value='4'>Merek 4</option>
                    <option value='5'>Merek 5</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Tipe Barang</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataBarang.tipe_barang }
                    onChange={ this.handleIsolatedTipeChange }
                    placeholder='Tipe Barang'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Nama Barang</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataBarang.nama_barang }
                    onChange={ this.handleIsolatedNamaChange }
                    placeholder='Nama Barang'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Satuan</ControlLabel>
                  <FormControl componentClass='select' placeholder='Satuan' onChange={ this.handleIsolatedSatuanChange } value={ this.state.isolatedDataBarang.satuan }>
                    <option value='0'>--Pilih Satuan--</option>
                    <option value='1'>Satuan 1</option>
                    <option value='2'>Satuan 2</option>
                    <option value='3'>Satuan 3</option>
                    <option value='4'>Satuan 4</option>
                    <option value='5'>Satuan 5</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Harga Beli</ControlLabel>
                  <FormControl
                    min={ 0 }
                    type='number'
                    value={ this.state.isolatedDataBarang.harga_beli }
                    onChange={ this.handleIsolatedHargaBeliChange }
                    placeholder='Harga Beli'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Harga Jual</ControlLabel>
                  <FormControl
                    min={ 0 }
                    type='number'
                    value={ this.state.isolatedDataBarang.harga_jual }
                    onChange={ this.handleIsolatedHargaJualChange }
                    placeholder='Harga Jual'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Supplier Barang</ControlLabel>
                  <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleIsolatedSupplierChange } value={ this.state.isolatedDataBarang.supplier }>
                    <option value='0'>--Pilih Supplier--</option>
                    <option value='1'>Supplier 1</option>
                    <option value='2'>Supplier 2</option>
                    <option value='3'>Supplier 3</option>
                    <option value='4'>Supplier 4</option>
                    <option value='5'>Supplier 5</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Edit Product</Button>
                  <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteProduct } >Delete Product</Button>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={ this.handleCloseModal }>Close</Button>
            </Modal.Footer>
          </Modal>
          <Grid>
            <Row className='title-row'>
              <Col xs={ 12 }>
                <h3>Barang</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <h4>Tambah Barang</h4>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Katagori</ControlLabel>
                          <FormControl componentClass='select' placeholder='Katagori' onChange={ this.handleKatagoriChange } value={ this.state.newDataBarang.katagori }>
                            <option value='0'>--Pilih Katagori--</option>
                            <option value='1'>Katagori 1</option>
                            <option value='2'>Katagori 2</option>
                            <option value='3'>Katagori 3</option>
                            <option value='4'>Katagori 4</option>
                            <option value='5'>Katagori 5</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Merek</ControlLabel>
                          <FormControl componentClass='select' placeholder='Merek' onChange={ this.handleMerekChange } value={ this.state.newDataBarang.merk }>
                            <option value='0'>--Pilih Merek--</option>
                            <option value='1'>Merek 1</option>
                            <option value='2'>Merek 2</option>
                            <option value='3'>Merek 3</option>
                            <option value='4'>Merek 4</option>
                            <option value='5'>Merek 5</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Tipe Barang</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataBarang.tipe_barang }
                            onChange={ this.handleTipeChange }
                            placeholder='Tipe Barang'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Nama Barang</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataBarang.nama_barang }
                            onChange={ this.handleNamaChange }
                            placeholder='Nama Barang'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Satuan</ControlLabel>
                          <FormControl componentClass='select' placeholder='Satuan' onChange={ this.handleSatuanChange } value={ this.state.newDataBarang.satuan }>
                            <option value='0'>--Pilih Satuan--</option>
                            <option value='1'>Satuan 1</option>
                            <option value='2'>Satuan 2</option>
                            <option value='3'>Satuan 3</option>
                            <option value='4'>Satuan 4</option>
                            <option value='5'>Satuan 5</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Harga Beli</ControlLabel>
                          <FormControl
                            min={ 0 }
                            type='number'
                            value={ this.state.newDataBarang.harga_beli }
                            onChange={ this.handleHargaBeliChange }
                            placeholder='Harga Beli'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Harga Jual</ControlLabel>
                          <FormControl
                            min={ 0 }
                            type='number'
                            value={ this.state.newDataBarang.harga_jual }
                            onChange={ this.handleHargaJualChange }
                            placeholder='Harga Jual'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Supplier Barang</ControlLabel>
                          <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleSupplierChange } value={ this.state.newDataBarang.supplier }>
                            <option value='0'>--Pilih Supplier--</option>
                            <option value='1'>Supplier 1</option>
                            <option value='2'>Supplier 2</option>
                            <option value='3'>Supplier 3</option>
                            <option value='4'>Supplier 4</option>
                            <option value='5'>Supplier 5</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <HelpBlock>{null}</HelpBlock>
                          <Button type='submit' block bsStyle='primary'>Tambah Barang</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <h4>Daftar Barang</h4>
                      <h6><em>Klik pada baris tabel untuk merubah / menghapus entri</em></h6>
                      <ReactTable
                        data={ dataBarang }
                        columns={ columns }
                        noDataText='No Data Available'
                        filterable
                        defaultPageSize={ 10 }
                        className='-striped -highlight'
                        getTdProps={ (state, rowInfo) => {
                          return {
                            onClick: (e, handleOriginal) => {
                              this.handleShowModal(e, rowInfo);

                              if (handleOriginal) {
                                handleOriginal();
                              }
                            },
                          };
                        } }
                      />
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
