import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock, Nav, NavItem } from 'react-bootstrap';

import Menu from 'components/Global/Menu';

// react table
import ReactTable from 'react-table';


import data from '../data.json';

export default class Utilitas extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      dataUtilitas: data.utilitas.data,
      newDataUtilitas: {},
      isolatedDataUtilitas: {},
      showModal: false,
      dataTipeUtilitas: data.tipe.data,
      newDataTipeUtilitas: {},
      isolatedDataTipeUtilitas: {},
      activeForm: 1,
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.handleShowTipeModal = this.handleShowTipeModal.bind(this);
    this.handleCloseTipeModal = this.handleCloseTipeModal.bind(this);

    this.handleTabChange = this.handleTabChange.bind(this);


    this.handleNamaChange = this.handleNamaChange.bind(this);
    this.handleIsolatedNamaChange = this.handleIsolatedNamaChange.bind(this);

    this.handleNamaTipeChange = this.handleNamaTipeChange.bind(this);
    this.handleIsolatedNamaTipeChange = this.handleIsolatedNamaTipeChange.bind(this);

    this.handleTipeChange = this.handleTipeChange.bind(this);
    this.handleIsolatedTipeChange = this.handleIsolatedTipeChange.bind(this);

    this.handleBiayaChange = this.handleBiayaChange.bind(this);
    this.handleIsolatedBiayaChange = this.handleIsolatedBiayaChange.bind(this);
  }

  handleNamaChange(e) {
    this.setState({ newDataUtilitas: {
      ...this.state.newDataUtilitas,
      nama: e.target.value,
    } });
  }

  handleIsolatedNamaChange(e) {
    this.setState({ isolatedDataUtilitas: {
      ...this.state.isolatedDataUtilitas,
      nama: e.target.value,
    } });
  }

  handleNamaTipeChange(e) {
    this.setState({ newDataTipeUtilitas: {
      ...this.state.newDataTipeUtilitas,
      nama_tipe: e.target.value,
    } });
  }

  handleIsolatedNamaTipeChange(e) {
    this.setState({ isolatedDataTipeUtilitas: {
      ...this.state.isolatedDataTipeUtilitas,
      nama_tipe: e.target.value,
    } });
  }

  handleTipeChange(e) {
    if (e.target.value !== '6') {
      this.setState({ newDataUtilitas: {
        ...this.state.newDataUtilitas,
        tipe: e.target.value,
        biaya: 0,
      } });
    } else {
      this.setState({ newDataUtilitas: {
        ...this.state.newDataUtilitas,
        tipe: e.target.value,
      } });
    }
  }

  handleIsolatedTipeChange(e) {
    if (e.target.value !== '6') {
      this.setState({ isolatedDataUtilitas: {
        ...this.state.isolatedDataUtilitas,
        tipe: e.target.value,
        biaya: 0,
      } });
    } else {
      this.setState({ isolatedDataUtilitas: {
        ...this.state.isolatedDataUtilitas,
        tipe: e.target.value,
      } });
    }
  }

  handleBiayaChange(e) {
    this.setState({ newDataUtilitas: {
      ...this.state.newDataUtilitas,
      biaya: e.target.value,
    } });
  }

  handleIsolatedBiayaChange(e) {
    this.setState({ isolatedDataUtilitas: {
      ...this.state.isolatedDataUtilitas,
      biaya: e.target.value,
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
    const { dataUtilitas } = this.state;
    const isolatedDataUtilitas = dataUtilitas.filter((item) =>
      item === rowInfo.original)[0];

    this.setState({ isolatedDataUtilitas, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedDataUtilitas: {}, showModal: false });
  }

  handleShowTipeModal(e, rowInfo) {
    const { dataTipeUtilitas } = this.state;
    const isolatedDataTipeUtilitas = dataTipeUtilitas.filter((item) =>
      item === rowInfo.original)[0];

    this.setState({ isolatedDataTipeUtilitas, showTipeModal: true });
  }

  handleCloseTipeModal() {
    this.setState({ isolatedDataTipeUtilitas: {}, showTipeModal: false });
  }

  handleTabChange(eventKey) {
    this.setState({ activeForm: parseInt(eventKey, 10) });
  }

  render() {
    const { dataUtilitas, dataTipeUtilitas, activeForm } = this.state;
    const { history } = this.props;
    const columns = [
      {
        Header: 'Kode',
        accessor: 'kode',
        filterable: false,
      },
      {
        Header: 'Nama Utilitas',
        accessor: 'nama',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
        filterable: false,
      },
      {
        Header: 'Tipe Utilitas',
        accessor: 'tipe',
        filterable: false,
      },
      {
        Header: 'Biaya',
        accessor: 'biaya',
        filterable: false,
      },
    ];

    const tipeColumns = [
      {
        Header: 'Nama Tipe',
        accessor: 'nama_tipe',
        filterable: false,
      },
    ];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <Modal show={ this.state.showModal } onHide={ this.handleCloseModal } dialogClassName='edit-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Detail Utilitas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Nama Utilitas</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataUtilitas.nama }
                    onChange={ this.handleIsolatedNamaChange }
                    placeholder='Nama Utilitas'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Tipe Utilitas</ControlLabel>
                  <FormControl componentClass='select' placeholder='Tipe Utilitas' onChange={ this.handleIsolatedTipeChange } value={ this.state.isolatedDataUtilitas.tipe }>
                    <option value='0'>--Pilih Tipe Utilitas--</option>
                    <option value='1'>Kategori</option>
                    <option value='2'>Merek</option>
                    <option value='3'>Kota</option>
                    <option value='4'>Jabatan</option>
                    <option value='5'>Satuan</option>
                    <option value='6'>Biaya Operasional</option>
                  </FormControl>
                </FormGroup>
                <FormGroup hidden={ parseInt(this.state.isolatedDataUtilitas.tipe, 10) !== 6 }>
                  <ControlLabel>Biaya Utilitas</ControlLabel>
                  <FormControl
                    type='number'
                    min={ 0 }
                    value={ this.state.isolatedDataUtilitas.biaya }
                    onChange={ this.handleIsolatedBiayaChange }
                    placeholder='Biaya Utilitas'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Edit Utilitas</Button>
                  <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteProduct } >Delete Utilitas</Button>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={ this.handleCloseModal }>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={ this.state.showTipeModal } onHide={ this.handleCloseTipeModal } dialogClassName='edit-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Detail Tipe Utilitas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Nama Tipe Utilitas</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataTipeUtilitas.nama_tipe }
                    onChange={ this.handleIsolatedNamaTipeChange }
                    placeholder='Nama Utilitas'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Edit Tipe Utilitas</Button>
                  <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteProduct } >Delete Tipe Utilitas</Button>
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
                <h3>Utilitas</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Nav bsStyle='tabs' activeKey={ activeForm.toString() } onSelect={ this.handleTabChange }>
                      <NavItem eventKey='1'>Data Utilitas</NavItem>
                      <NavItem eventKey='2'>Data Tipe Utilitas</NavItem>
                    </Nav>
                    <Panel hidden={ activeForm === 2 }>
                      <h4>Tambah Utilitas</h4>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Nama Utilitas</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataUtilitas.nama }
                            onChange={ this.handleNamaChange }
                            placeholder='Nama Utilitas'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Tipe Utilitas</ControlLabel>
                          <FormControl componentClass='select' placeholder='Tipe Utilitas' onChange={ this.handleTipeChange } value={ this.state.newDataUtilitas.tipe }>
                            <option value='0'>--Pilih Tipe Utilitas--</option>
                            <option value='1'>Kategori</option>
                            <option value='2'>Merek</option>
                            <option value='3'>Kota</option>
                            <option value='4'>Jabatan</option>
                            <option value='5'>Satuan</option>
                            <option value='6'>Biaya Operasional</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup hidden={ parseInt(this.state.newDataUtilitas.tipe, 10) !== 6 }>
                          <ControlLabel>Biaya Utilitas</ControlLabel>
                          <FormControl
                            type='number'
                            min={ 0 }
                            value={ this.state.newDataUtilitas.biaya }
                            onChange={ this.handleBiayaChange }
                            placeholder='Biaya Utilitas'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <HelpBlock>{null}</HelpBlock>
                          <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Tambah Utilitas</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel hidden={ activeForm === 2 }>
                      <h4>Daftar Utilitas</h4>
                      <h6><em>Klik pada baris tabel untuk merubah / menghapus entri</em></h6>
                      <ReactTable
                        data={ dataUtilitas }
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
                    <Panel hidden={ activeForm === 1 }>
                      <h4>Tambah Tipe Utilitas</h4>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Nama Tipe Utilitas</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataTipeUtilitas.nama_tipe }
                            onChange={ this.handleNamaTipeChange }
                            placeholder='Nama Tipe Utilitas'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <HelpBlock>{null}</HelpBlock>
                          <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Tambah Tipe Utilitas</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel hidden={ activeForm === 1 }>
                      <h4>Daftar Tipe Utilitas</h4>
                      <h6><em>Klik pada baris tabel untuk merubah / menghapus entri</em></h6>
                      <ReactTable
                        data={ dataTipeUtilitas }
                        columns={ tipeColumns }
                        noDataText='No Data Available'
                        filterable
                        defaultPageSize={ 10 }
                        className='-striped -highlight'
                        getTdProps={ (state, rowInfo) => {
                          return {
                            onClick: (e, handleOriginal) => {
                              this.handleShowTipeModal(e, rowInfo);

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
