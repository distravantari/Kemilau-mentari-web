import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock } from 'react-bootstrap';

import { getSupplier, addSupplier, editSupplier, deleteSupplier } from 'actions/supplier';

import Menu from 'components/Global/Menu';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';


import data from '../data.json';

@connect(state => ({
  supplier: state.supplier.get('supplier'),
  error: state.supplier.get('error'),
  loading: state.supplier.get('loading'),
  shouldUpdate: state.supplier.get('shouldUpdate'),

  utilitas: state.utilitas.get('utilitas'),
  utilitasError: state.utilitas.get('error'),
  utilitasLoading: state.utilitas.get('loading'),
}))
export default class Supplier extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      newDataSupplier: {},
      isolatedDataSupplier: {},
      showModal: false,
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);


    this.handleNamaChange = this.handleNamaChange.bind(this);
    this.handleIsolatedNamaChange = this.handleIsolatedNamaChange.bind(this);

    this.handleAlamatChange = this.handleAlamatChange.bind(this);
    this.handleIsolatedAlamatChange = this.handleIsolatedAlamatChange.bind(this);

    this.handleNoTelpChange = this.handleNoTelpChange.bind(this);
    this.handleIsolatedNoTelpChange = this.handleIsolatedNoTelpChange.bind(this);

    this.handleNoHandphoneChange = this.handleNoHandphoneChange.bind(this);
    this.handleIsolatedNoHandphoneChange = this.handleIsolatedNoHandphoneChange.bind(this);

    this.handleAddSupplier = this.handleAddSupplier.bind(this);
    this.handleEditSupplier = this.handleEditSupplier.bind(this);
    this.handleDeleteSupplier = this.handleDeleteSupplier.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getSupplier());
  }

  componentDidUpdate(prevProps) {
    const { dispatch, shouldUpdate } = this.props;
    if (!prevProps.shouldUpdate && shouldUpdate) {
      dispatch(getSupplier());
      this.setState({ showModal: false });
    }
  }

  handleAddSupplier(e) {
    const { dispatch } = this.props;
    const { newDataSupplier } = this.state;
    e.preventDefault();
    dispatch(addSupplier(newDataSupplier));
  }

  handleEditSupplier(e) {
    const { dispatch } = this.props;
    const { isolatedDataSupplier } = this.state;
    e.preventDefault();
    dispatch(editSupplier(isolatedDataSupplier.id, isolatedDataSupplier));
  }

  handleDeleteSupplier(e) {
    const { dispatch } = this.props;
    const { isolatedDataSupplier } = this.state;
    e.preventDefault();
    dispatch(deleteSupplier(isolatedDataSupplier.id));
  }

  handleKotaChange(e) {
    this.setState({ newDataSupplier: {
      ...this.state.newDataSupplier,
      kota: e.target.value,
    } });
  }

  handleIsolatedKotaChange(e) {
    this.setState({ isolatedDataSupplier: {
      ...this.state.isolatedDataSupplier,
      kota: e.target.value,
    } });
  }

  handleNamaChange(e) {
    this.setState({ newDataSupplier: {
      ...this.state.newDataSupplier,
      nama: e.target.value,
    } });
  }

  handleIsolatedNamaChange(e) {
    this.setState({ isolatedDataSupplier: {
      ...this.state.isolatedDataSupplier,
      nama: e.target.value,
    } });
  }

  handleAlamatChange(e) {
    this.setState({ newDataSupplier: {
      ...this.state.newDataSupplier,
      alamat: e.target.value,
    } });
  }

  handleIsolatedAlamatChange(e) {
    this.setState({ isolatedDataSupplier: {
      ...this.state.isolatedDataSupplier,
      alamat: e.target.value,
    } });
  }

  handleNoTelpChange(e) {
    this.setState({ newDataSupplier: {
      ...this.state.newDataSupplier,
      no_telp: e.target.value,
    } });
  }

  handleIsolatedNoTelpChange(e) {
    this.setState({ isolatedDataSupplier: {
      ...this.state.isolatedDataSupplier,
      no_telp: e.target.value,
    } });
  }

  handleNoHandphoneChange(e) {
    this.setState({
      newDataSupplier: {
        ...this.state.newDataSupplier,
        no_handphone: e.target.value,
      },
    });
  }

  handleIsolatedNoHandphoneChange(e) {
    this.setState({
      isolatedDataSupplier: {
        ...this.state.isolatedDataSupplier,
        no_handphone: e.target.value,
      },
    });
  }

  textFilter(filter, row) {
    const result = parseInt(row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()), 10);
    if (result < 0) {
      return false;
    }
    return true;
  }

  handleShowModal(e, rowInfo) {
    const { supplier } = this.props;
    const isolatedDataSupplier = supplier.get('data').filter((item) => item === rowInfo.original)[0];
    this.setState({ isolatedDataSupplier, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedDataSupplier: {}, showModal: false });
  }

  render() {
    const { history, supplier } = this.props;
    const columns = [
      {
        Header: 'Nama Supplier',
        accessor: 'nama',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
        filterable: false,
      },
      {
        Header: 'Alamat',
        accessor: 'alamat',
        filterable: false,
      },
      {
        Header: 'No. Telp',
        accessor: 'no_telp',
        filterable: false,
      },
      {
        Header: 'No. Handphone',
        accessor: 'no_handphone',
        filterable: false,
      },
    ];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <Modal show={ this.state.showModal } onHide={ this.handleCloseModal } dialogClassName='edit-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Detail Supplier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Nama Supplier</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataSupplier.nama }
                    onChange={ this.handleIsolatedNamaChange }
                    placeholder='Nama Supplier'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Alamat Supplier</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataSupplier.alamat }
                    onChange={ this.handleIsolatedAlamatChange }
                    placeholder='Alamat Supplier'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>No Telepon Supplier</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataSupplier.no_telp }
                    onChange={ this.handleIsolatedNoTelpChange }
                    placeholder='No Telepon Supplier'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>No Handphone Supplier</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataSupplier.no_handphone }
                    onChange={ this.handleIsolatedNoHandphoneChange }
                    placeholder='No Handphone Supplier'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={ this.handleEditSupplier }>Edit Supplier</Button>
                  <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteSupplier } >Delete Supplier</Button>
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
                <h3>Supplier</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <h4>Tambah Supplier</h4>
                      <Form onSubmit={ this.handleAddSupplier }>
                        <FormGroup>
                          <ControlLabel>Nama Supplier</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataSupplier.nama }
                            onChange={ this.handleNamaChange }
                            placeholder='Nama Supplier'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Alamat Supplier</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataSupplier.alamat }
                            onChange={ this.handleAlamatChange }
                            placeholder='Alamat Supplier'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>No Telepon Supplier</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataSupplier.no_telp }
                            onChange={ this.handleNoTelpChange }
                            placeholder='No Telepon Supplier'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>No Handphone Supplier</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataSupplier.no_handphone }
                            onChange={ this.handleNoHandphoneChange }
                            placeholder='No Handphone Supplier'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <HelpBlock>{null}</HelpBlock>
                          <Button type='submit' block bsStyle='primary'>Tambah Supplier</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <h4>Daftar Supplier</h4>
                      <h6><em>Klik pada baris tabel untuk merubah / menghapus entri</em></h6>
                      <ReactTable
                        data={ supplier.get('data') }
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
