import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css'


import data from '../data.json';

export default class Konsumen extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      dataKonsumen: data.konsumen.data,
      newDataKonsumen: {},
      isolatedDataKonsumen: {},
      showModal: false,
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.handleKotaChange = this.handleKotaChange.bind(this);
    this.handleIsolatedKotaChange = this.handleIsolatedKotaChange.bind(this);

    this.handleNamaChange = this.handleNamaChange.bind(this);
    this.handleIsolatedNamaChange = this.handleIsolatedNamaChange.bind(this);

    this.handleAlamatChange = this.handleAlamatChange.bind(this);
    this.handleIsolatedAlamatChange = this.handleIsolatedAlamatChange.bind(this);

    this.handleNoTelpChange = this.handleNoTelpChange.bind(this);
    this.handleIsolatedNoTelpChange = this.handleIsolatedNoTelpChange.bind(this);

    this.handleHandphoneChange = this.handleHandphoneChange.bind(this);
    this.handleIsolatedHandphoneChange = this.handleIsolatedHandphoneChange.bind(this);

    this.handleLimitPiutangChange = this.handleLimitPiutangChange.bind(this);
    this.handleIsolatedLimitPiutangChange = this.handleIsolatedLimitPiutangChange.bind(this);

    this.handleSalesmanChange = this.handleSalesmanChange.bind(this);
    this.handleIsolatedSalesmanChange = this.handleIsolatedSalesmanChange.bind(this);
  }

  handleKotaChange(e) {
    this.setState({ newDataKonsumen: {
      ...this.state.newDataKonsumen,
      kota: e.target.value } });
  }

  handleIsolatedKotaChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      kota: e.target.value,
    } });
  }

  handleNamaChange(e) {
    this.setState({ newDataKonsumen: {
      ...this.state.newDataKonsumen,
      nama_konsumen: e.target.value,
    } });
  }

  handleIsolatedNamaChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      nama_konsumen: e.target.value,
    } });
  }

  handleAlamatChange(e) {
    this.setState({ newDataKonsumen: {
      ...this.state.newDataKonsumen,
      alamat: e.target.value,
    } });
  }

  handleIsolatedAlamatChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      alamat: e.target.value,
    } });
  }

  handleNoTelpChange(e) {
    this.setState({ newDataKonsumen: {
      ...this.state.newDataKonsumen,
      no_telpon: e.target.value,
    } });
  }

  handleIsolatedNoTelpChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      no_telpon: e.target.value,
    } });
  }

  handleHandphoneChange(e) {
    this.setState({ newDataKonsumen: {
      ...this.state.newDataKonsumen,
      handphone: e.target.value,
    } });
  }

  handleIsolatedHandphoneChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      handphone: e.target.value,
    } });
  }

  handleLimitPiutangChange(e) {
    this.setState({ newDataKonsumen: {
      ...this.state.newDataKonsumen,
      limit_piutang: e.target.value,
    } });
  }

  handleIsolatedLimitPiutangChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      limit_piutang: e.target.value,
    } });
  }

  handleSalesmanChange(e) {
    this.setState({ newDataKonsumen: {
      ...this.state.newDataKonsumen,
      salesman: e.target.value,
    } });
  }

  handleIsolatedSalesmanChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      salesman: e.target.value,
    } });
  }

  textFilter(filter, row) {
    const result = parseInt(row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()), 10);
    if (result < 0) {
      return false;
    }
    return true;
  }

  handleShowModal(e, rowInfo) {
    const { dataKonsumen } = this.state;
    const isolatedDataKonsumen = dataKonsumen.filter((item) => item === rowInfo.original)[0];
    this.setState({ isolatedDataKonsumen, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedDataKonsumen: {}, showModal: false });
  }

  render() {
    const { dataKonsumen } = this.state;
    const { history } = this.props;
    const columns = [
      {
        Header: 'Nama Konsumen',
        accessor: 'nama_konsumen',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
        filterable: false,
      },
      {
        Header: 'Alamat',
        accessor: 'alamat',
        filterable: false,
      },
      {
        Header: 'Kota',
        accessor: 'area',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
      },
      {
        Header: 'No. Telp',
        accessor: 'no_telpon',
        filterable: false,
      },
      {
        Header: 'No. Handphone',
        accessor: 'no_handphone',
        filterable: false,
      },
      {
        Header: 'Salesman',
        accessor: 'salesman',
      },
      {
        Header: 'Limit Piutang',
        accessor: 'limit_piutang',
        filterable: false,
      },
    ];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <Modal show={ this.state.showModal } onHide={ this.handleCloseModal } dialogClassName='edit-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Detail Konsumen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Kota</ControlLabel>
                  <FormControl componentClass='select' placeholder='Kota' onChange={ this.handleIsolatedKotaChange } value={ this.state.isolatedDataKonsumen.kota }>
                    <option value='0'>--Pilih Kota--</option>
                    <option value='1'>Kota 1</option>
                    <option value='2'>Kota 2</option>
                    <option value='3'>Kota 3</option>
                    <option value='4'>Kota 4</option>
                    <option value='5'>Kota 5</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Nama Konsumen</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataKonsumen.nama_konsumen }
                    onChange={ this.handleIsolatedNamaChange }
                    placeholder='Nama Konsumen'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Alamat Konsumen</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataKonsumen.alamat }
                    onChange={ this.handleIsolatedAlamatChange }
                    placeholder='Alamat Konsumen'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>No. Telp Konsumen</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataKonsumen.no_telpon }
                    onChange={ this.handleIsolatedNoTelpChange }
                    placeholder='No. Telp Konsumen'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Handphone Konsumen</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataKonsumen.handphone }
                    onChange={ this.handleIsolatedHandphoneChange }
                    placeholder='Handphone Konsumen'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Limit Piutang</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataKonsumen.limit_piutang }
                    onChange={ this.handleIsolatedLimitPiutangChange }
                    placeholder='Limit Piutang'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Salesman</ControlLabel>
                  <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleIsolatedSalesmanChange } value={ this.state.isolatedDataKonsumen.salesman }>
                    <option value='0'>--Pilih Salesman--</option>
                    <option value='1'>Salesman 1</option>
                    <option value='2'>Salesman 2</option>
                    <option value='3'>Salesman 3</option>
                    <option value='4'>Salesman 4</option>
                    <option value='5'>Salesman 5</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Edit Konsumen</Button>
                  <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteProduct } >Delete Konsumen</Button>
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
                <h3>Konsumen</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <h4>Tambah Konsumen</h4>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Kota</ControlLabel>
                          <FormControl componentClass='select' placeholder='Kota' onChange={ this.handleKotaChange } value={ this.state.newDataKonsumen.kota }>
                            <option value='0'>--Pilih Kota--</option>
                            <option value='1'>Kota 1</option>
                            <option value='2'>Kota 2</option>
                            <option value='3'>Kota 3</option>
                            <option value='4'>Kota 4</option>
                            <option value='5'>Kota 5</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Nama Konsumen</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataKonsumen.nama_konsumen }
                            onChange={ this.handleNamaChange }
                            placeholder='Nama Konsumen'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Alamat Konsumen</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataKonsumen.alamat }
                            onChange={ this.handleAlamatChange }
                            placeholder='Alamat Konsumen'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>No. Telp Konsumen</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataKonsumen.no_telpon }
                            onChange={ this.handleNoTelpChange }
                            placeholder='No. Telp Konsumen'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Handphone Konsumen</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataKonsumen.handphone }
                            onChange={ this.handleHandphoneChange }
                            placeholder='Handphone Konsumen'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Limit Piutang</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataKonsumen.limit_piutang }
                            onChange={ this.handleLimitPiutangChange }
                            placeholder='Limit Piutang'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Salesman</ControlLabel>
                          <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleSalesmanChange } value={ this.state.newDataKonsumen.salesman }>
                            <option value='0'>--Pilih Salesman--</option>
                            <option value='1'>Salesman 1</option>
                            <option value='2'>Salesman 2</option>
                            <option value='3'>Salesman 3</option>
                            <option value='4'>Salesman 4</option>
                            <option value='5'>Salesman 5</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <HelpBlock>{null}</HelpBlock>
                          <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Tambah Konsumen</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <h4>Daftar Konsumen</h4>
                      <h6><em>Klik pada baris tabel untuk merubah / menghapus entri</em></h6>
                      <ReactTable
                        data={ dataKonsumen }
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
