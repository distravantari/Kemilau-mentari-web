import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock } from 'react-bootstrap';

import { getKonsumen, addKonsumen, editKonsumen, deleteKonsumen } from 'actions/konsumen';
import { getUtilitas } from 'actions/utilitas';
import { getPegawai } from 'actions/pegawai';

import Menu from 'components/Global/Menu';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';


import data from '../data.json';

@connect(state => ({
  konsumen: state.konsumen.get('konsumen'),
  error: state.konsumen.get('error'),
  loading: state.konsumen.get('loading'),
  shouldUpdate: state.konsumen.get('shouldUpdate'),

  utilitas: state.utilitas.get('utilitas'),
  utilitasError: state.utilitas.get('error'),
  utilitasLoading: state.utilitas.get('loading'),

  pegawai: state.pegawai.get('pegawai'),
  pegawaiError: state.pegawai.get('error'),
  pegawaiLoading: state.pegawai.get('loading'),
}))
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
      listKota: [],
      listSalesman: [],
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

    this.handleAddKonsumen = this.handleAddKonsumen.bind(this);
    this.handleEditKonsumen = this.handleEditKonsumen.bind(this);
    this.handleDeleteKonsumen = this.handleDeleteKonsumen.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getKonsumen());
    dispatch(getUtilitas());
    dispatch(getPegawai());
  }

  componentDidUpdate(prevProps) {
    const { shouldUpdate, dispatch, utilitas } = this.props;

    if (!prevProps.shouldUpdate && shouldUpdate) {
      dispatch(getKonsumen());
      this.setState({ showModal: false });
    }

    if (prevProps.utilitas.get('data') !== utilitas.get('data')) {
      const kota = utilitas.get('data').filter(item => item.tipe.nama.toUpperCase() === 'KOTA');
      const salesman = utilitas.get('data').filter(item => item.tipe.nama.toUpperCase() === 'JABATAN' && item.nama.toUpperCase() === 'SALESMAN');
      this.setState({ listKota: kota, listSalesman: salesman });
    }
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
      nama: e.target.value,
    } });
  }

  handleIsolatedNamaChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      nama: e.target.value,
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
      no_telp: e.target.value,
    } });
  }

  handleIsolatedNoTelpChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      no_telp: e.target.value,
    } });
  }

  handleHandphoneChange(e) {
    this.setState({ newDataKonsumen: {
      ...this.state.newDataKonsumen,
      no_handphone: e.target.value,
    } });
  }

  handleIsolatedHandphoneChange(e) {
    this.setState({ isolatedDataKonsumen: {
      ...this.state.isolatedDataKonsumen,
      no_handphone: e.target.value,
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
    const { konsumen } = this.props;
    const isolatedDataKonsumen = konsumen.get('data').filter((item) => item === rowInfo.original)[0];
    const temp = {
      id: isolatedDataKonsumen.id,
      alamat: isolatedDataKonsumen.alamat,
      kota: isolatedDataKonsumen.kota.id,
      limit_piutang: isolatedDataKonsumen.limit_piutang,
      nama: isolatedDataKonsumen.nama,
      no_handphone: isolatedDataKonsumen.no_handphone,
      no_telp: isolatedDataKonsumen.no_telp,
      salesman: isolatedDataKonsumen.salesman.id,
    };
    this.setState({ isolatedDataKonsumen: temp, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedDataKonsumen: {}, showModal: false });
  }

  handleAddKonsumen(e) {
    e.preventDefault();
    const { newDataKonsumen } = this.state;
    const { dispatch } = this.props;

    dispatch(addKonsumen(newDataKonsumen));
  }

  handleEditKonsumen(e) {
    e.preventDefault();
    const { isolatedDataKonsumen } = this.state;
    const { dispatch } = this.props;

    dispatch(editKonsumen(isolatedDataKonsumen.id, isolatedDataKonsumen));
  }

  handleDeleteKonsumen(e) {
    e.preventDefault();
    const { isolatedDataKonsumen } = this.state;
    const { dispatch } = this.props;

    dispatch(deleteKonsumen(isolatedDataKonsumen.id));
  }

  render() {
    const { history, konsumen } = this.props;
    const { listKota, listSalesman } = this.state;
    const columns = [
      {
        Header: 'Nama Konsumen',
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
        Header: 'Kota',
        accessor: 'kota.nama',
        filterMethod: (filter, row) => { return this.textFilter(filter, row); },
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
      {
        Header: 'Salesman',
        accessor: 'salesman.nama',
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
                    {
                      listKota.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                    }
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Nama Konsumen</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataKonsumen.nama }
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
                    value={ this.state.isolatedDataKonsumen.no_telp }
                    onChange={ this.handleIsolatedNoTelpChange }
                    placeholder='No. Telp Konsumen'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Handphone Konsumen</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataKonsumen.no_handphone }
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
                    {
                      listSalesman.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                    }
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={ this.handleEditKonsumen }>Edit Konsumen</Button>
                  <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteKonsumen } >Delete Konsumen</Button>
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
                            {
                              listKota.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                            }
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Nama Konsumen</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataKonsumen.nama }
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
                            value={ this.state.newDataKonsumen.no_telp }
                            onChange={ this.handleNoTelpChange }
                            placeholder='No. Telp Konsumen'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Handphone Konsumen</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataKonsumen.no_handphone }
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
                            {
                              listSalesman.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                            }
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <HelpBlock>{null}</HelpBlock>
                          <Button type='submit' block bsStyle='primary' onClick={ this.handleAddKonsumen }>Tambah Konsumen</Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <h4>Daftar Konsumen</h4>
                      <h6><em>Klik pada baris tabel untuk merubah / menghapus entri</em></h6>
                      <ReactTable
                        data={ konsumen.get('data') }
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
