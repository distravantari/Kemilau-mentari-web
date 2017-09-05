import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Image, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import { routeCodes } from 'config/routes';

import data from '../data.json';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class Pegawai extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      dataPegawai: data.pegawai.data,
      newDataPegawai: {},
      isolatedDataPegawai: {},
      showModal: false,
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);


    this.handleNamaChange = this.handleNamaChange.bind(this);
    this.handleIsolatedNamaChange = this.handleIsolatedNamaChange.bind(this);

    this.handleAlamatChange = this.handleAlamatChange.bind(this);
    this.handleIsolatedAlamatChange = this.handleIsolatedAlamatChange.bind(this);

    this.handleHandphoneChange = this.handleHandphoneChange.bind(this);
    this.handleIsolatedHandphoneChange = this.handleIsolatedHandphoneChange.bind(this);

    this.handleJabatanChange = this.handleJabatanChange.bind(this);
    this.handleIsolatedJabatanChange = this.handleIsolatedJabatanChange.bind(this);

    this.handleKomisiChange = this.handleKomisiChange.bind(this);
    this.handleIsolatedKomisiChange = this.handleIsolatedKomisiChange.bind(this);
  }

  handleKotaChange(e) {
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, kota: e.target.value } });
  }

  handleIsolatedKotaChange(e) {
    this.setState({ isolatedDataPegawai: { ...this.state.isolatedDataPegawai, kota: e.target.value } });
  }

  handleNamaChange(e) {
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, nama_pegawai: e.target.value } });
  }

  handleIsolatedNamaChange(e) {
    this.setState({ isolatedDataPegawai: { ...this.state.isolatedDataPegawai, nama_pegawai: e.target.value } });
  }

  handleAlamatChange(e) {
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, alamat: e.target.value } });
  }

  handleIsolatedAlamatChange(e) {
    this.setState({ isolatedDataPegawai: { ...this.state.isolatedDataPegawai, alamat: e.target.value } });
  }

  handleHandphoneChange(e) {
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, handphone: e.target.value } });
  }

  handleIsolatedHandphoneChange(e) {
    this.setState({ isolatedDataPegawai: { ...this.state.isolatedDataPegawai, handphone: e.target.value } });
  }

  handleJabatanChange(e) {
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, jabatan: e.target.value } });
  }

  handleIsolatedJabatanChange(e) {
    this.setState({ isolatedDataPegawai: { ...this.state.isolatedDataPegawai, jabatan: e.target.value } });
  }

  handleKomisiChange(e) {
    this.setState({ newDataPegawai: { ...this.state.newDataPegawai, komisi: e.target.value } });
  }

  handleIsolatedKomisiChange(e) {
    this.setState({ isolatedDataPegawai: { ...this.state.isolatedDataPegawai, komisi: e.target.value } });
  }

  textFilter(filter, row) {
    const result = parseInt(row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()), 10);
    if (result < 0) {
      return false;
    }
    return true;
  }

  handleShowModal(e, rowInfo) {
    const { dataPegawai } = this.state;
    const isolatedDataPegawai = dataPegawai.filter((item) => item === rowInfo.original)[0];
    this.setState({ isolatedDataPegawai, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedDataPegawai: {}, showModal: false });
  }

  render() {
    const { dataPegawai } = this.state;
    const { history } = this.props;
    const columns = [
      {
        Header: 'Nama Pegawai',
        accessor: 'nama_pegawai',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
        filterable: false,
      },
      {
        Header: 'Handphone',
        accessor: 'handphone',
        filterable: false,
      },
      {
        Header: 'Alamat',
        accessor: 'alamat',
        filterable: false,
      },
      {
        Header: 'Jabatan',
        accessor: 'jabatan',
      },
      {
        Header: '% Komisi',
        accessor: 'komisi',
      },
    ];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <Modal show={ this.state.showModal } onHide={ this.handleCloseModal } dialogClassName='edit-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Detail Pegawai</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Nama Pegawai</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataPegawai.nama_pegawai }
                    onChange={ this.handleIsolatedNamaChange }
                    placeholder='Nama Pegawai'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Alamat Pegawai</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataPegawai.alamat }
                    onChange={ this.handleIsolatedAlamatChange }
                    placeholder='Alamat Pegawai'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Handphone Pegawai</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataPegawai.handphone }
                    onChange={ this.handleIsolatedHandphoneChange }
                    placeholder='Handphone Pegawai'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Jabatan</ControlLabel>
                  <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleIsolatedJabatanChange } value={ this.state.isolatedDataPegawai.jabatan }>
                    <option value='0'>--Pilih Jabatan--</option>
                    <option value='1'>Jabatan 1</option>
                    <option value='2'>Jabatan 2</option>
                    <option value='3'>Jabatan 3</option>
                    <option value='4'>Jabatan 4</option>
                    <option value='5'>Jabatan 5</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Prosentase Komisi</ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.isolatedDataPegawai.komisi}
                    onChange={this.handleIsolatedKomisiChange}
                    placeholder='Prosentase Komisi'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Edit Pegawai</Button>
                  <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteProduct } >Delete Pegawai</Button>
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
                <h3>Pegawai</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <h4>Tambah Pegawai</h4>
                      <Form>
                        <FormGroup>
                          <ControlLabel>Nama Pegawai</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataPegawai.nama_pegawai }
                            onChange={ this.handleNamaChange }
                            placeholder='Nama Pegawai'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Alamat Pegawai</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataPegawai.alamat }
                            onChange={ this.handleAlamatChange }
                            placeholder='Alamat Pegawai'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Handphone Pegawai</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataPegawai.handphone }
                            onChange={ this.handleHandphoneChange }
                            placeholder='Handphone Pegawai'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Jabatan</ControlLabel>
                          <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleJabatanChange } value={ this.state.newDataPegawai.jabatan }>
                            <option value='0'>--Pilih Jabatan--</option>
                            <option value='1'>Jabatan 1</option>
                            <option value='2'>Jabatan 2</option>
                            <option value='3'>Jabatan 3</option>
                            <option value='4'>Jabatan 4</option>
                            <option value='5'>Jabatan 5</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Prosentase Komisi</ControlLabel>
                          <FormControl
                            type='text'
                            value={this.state.newDataPegawai.komisi}
                            onChange={this.handleKomisiChange}
                            placeholder='Prosentase Komisi'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <HelpBlock>{null}</HelpBlock>
                          <Button type='submit' block bsStyle='primary' onClick={ this.handleEditProduct }>Tambah Pegawai</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <h4>Daftar Pegawai</h4>
                      <h6><em>Klik pada baris tabel untuk merubah / menghapus entri</em></h6>
                      <ReactTable
                        data={ dataPegawai }
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
