import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Image, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import { routeCodes } from 'config/routes';

import data from '../data.json';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class Supplier extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      dataSupplier: data.supplier.data,
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
  }

  handleKotaChange(e) {
    this.setState({ newDataSupplier: { ...this.state.newDataSupplier, kota: e.target.value } });
  }

  handleIsolatedKotaChange(e) {
    this.setState({ isolatedDataSupplier: { ...this.state.isolatedDataSupplier, kota: e.target.value } });
  }

  handleNamaChange(e) {
    this.setState({ newDataSupplier: { ...this.state.newDataSupplier, nama_supplier: e.target.value } });
  }

  handleIsolatedNamaChange(e) {
    this.setState({ isolatedDataSupplier: { ...this.state.isolatedDataSupplier, nama_supplier: e.target.value } });
  }

  handleAlamatChange(e) {
    this.setState({ newDataSupplier: { ...this.state.newDataSupplier, alamat: e.target.value } });
  }

  handleIsolatedAlamatChange(e) {
    this.setState({ isolatedDataSupplier: { ...this.state.isolatedDataSupplier, alamat: e.target.value } });
  }

  handleNoTelpChange(e) {
    this.setState({ newDataSupplier: { ...this.state.newDataSupplier, no_telpon: e.target.value } });
  }

  handleIsolatedNoTelpChange(e) {
    this.setState({ isolatedDataSupplier: { ...this.state.isolatedDataSupplier, no_telpon: e.target.value } });
  }

  textFilter(filter, row) {
    const result = parseInt(row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()), 10);
    if (result < 0) {
      return false;
    }
    return true;
  }

  handleShowModal(e, rowInfo) {
    const { dataSupplier } = this.state;
    const isolatedDataSupplier = dataSupplier.filter((item) => item === rowInfo.original)[0];
    this.setState({ isolatedDataSupplier, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedDataSupplier: {}, showModal: false });
  }

  render() {
    const { dataSupplier } = this.state;
    const { history } = this.props;
    const columns = [
      {
        Header: 'Kode',
        accessor: 'kode',
        filterable: false,
      },
      {
        Header: 'Nama Supplier',
        accessor: 'nama_supplier',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
        filterable: false,
      },
      {
        Header: 'Alamat',
        accessor: 'alamat',
        filterable: false,
      },
      {
        Header: 'NoTelp',
        accessor: 'no_telpon',
        filterable: false,
      },
    ];
    return (
      <div>
        <Menu history={history} />
        <section className='product-section'>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal} dialogClassName='edit-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Detail Supplier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Nama Supplier</ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.isolatedDataSupplier.nama_supplier}
                    onChange={this.handleIsolatedNamaChange}
                    placeholder='Nama Supplier'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Alamat Supplier</ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.isolatedDataSupplier.alamat}
                    onChange={this.handleIsolatedAlamatChange}
                    placeholder='Alamat Supplier'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>No Telepon Supplier</ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.isolatedDataSupplier.no_telpon}
                    onChange={this.handleIsolatedNoTelpChange}
                    placeholder='No Telepon Supplier'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={this.handleEditProduct}>Edit Supplier</Button>
                  <Button type='submit' block bsStyle='danger' onClick={this.handleDeleteProduct} >Delete Supplier</Button>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Grid>
            <Row className='title-row'>
              <Col xs={12}>
                <h3>Supplier</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={12}>
                <Row className='add-product-row'>
                  <Col xs={12}>
                    <Panel>
                      <h4>Tambah Supplier</h4>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Nama Supplier</ControlLabel>
                          <FormControl
                            type='text'
                            value={this.state.newDataSupplier.nama_supplier}
                            onChange={this.handleNamaChange}
                            placeholder='Nama Supplier'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Alamat Supplier</ControlLabel>
                          <FormControl
                            type='text'
                            value={this.state.newDataSupplier.alamat}
                            onChange={this.handleAlamatChange}
                            placeholder='Alamat Supplier'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>No Telepon Supplier</ControlLabel>
                          <FormControl
                            type='text'
                            value={this.state.newDataSupplier.no_telpon}
                            onChange={this.handleNoTelpChange}
                            placeholder='No Telepon Supplier'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <HelpBlock>{null}</HelpBlock>
                          <Button type='submit' block bsStyle='primary' onClick={this.handleEditProduct}>Tambah Supplier</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <h4>Daftar Supplier</h4>
                      <h6><em>Klik pada baris tabel untuk merubah / menghapus entri</em></h6>
                      <ReactTable
                        data={dataSupplier}
                        columns={columns}
                        noDataText='No Data Available'
                        filterable
                        defaultPageSize={10}
                        className='-striped -highlight'
                        getTdProps={(state, rowInfo) => {
                          return {
                            onClick: (e, handleOriginal) => {
                              this.handleShowModal(e, rowInfo);

                              if (handleOriginal) {
                                handleOriginal();
                              }
                            },
                          };
                        }}
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
