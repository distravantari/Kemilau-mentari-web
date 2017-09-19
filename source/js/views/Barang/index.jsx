import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Modal, HelpBlock } from 'react-bootstrap';

import { getBarang, addBarang, editBarang, deleteBarang } from 'actions/barang';
import { getUtilitas } from 'actions/utilitas';
import { getSupplier } from 'actions/supplier';

import Menu from 'components/Global/Menu';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

@connect(state => ({
  barang: state.barang.get('barang'),
  error: state.barang.get('error'),
  loading: state.barang.get('loading'),
  shouldUpdate: state.barang.get('shouldUpdate'),

  utilitas: state.utilitas.get('utilitas'),
  utilitasError: state.utilitas.get('error'),
  utilitasLoading: state.utilitas.get('loading'),

  supplier: state.supplier.get('supplier'),
  supplierError: state.supplier.get('error'),
  supplierLoading: state.supplier.get('loading'),
}))

export default class Barang extends Component {
  static propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func,
    shouldUpdate: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.object,
    barang: PropTypes.object,
    utilitas: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      newDataBarang: {},
      isolatedDataBarang: {},
      showModal: false,
      listMerek: [],
      listKategori: [],
      listSatuan: [],
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.handleKategoriChange = this.handleKategoriChange.bind(this);
    this.handleIsolatedKategoriChange = this.handleIsolatedKategoriChange.bind(this);

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

    this.handleAddBarang = this.handleAddBarang.bind(this);
    this.handleEditBarang = this.handleEditBarang.bind(this);
    this.handleDeleteBarang = this.handleDeleteBarang.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getBarang());
    dispatch(getUtilitas());
    dispatch(getSupplier());
  }

  componentDidUpdate(prevProps) {
    const { shouldUpdate, dispatch, utilitas } = this.props;
    const { listMerek, listKategori, listSatuan } = this.state;

    if (!prevProps.shouldUpdate && shouldUpdate) {
      dispatch(getBarang());
      this.setState({ showModal: false });
    }
    if (utilitas.get('data') && (listMerek.length === 0 || listKategori.length === 0 || listSatuan.length === 0)) {
      const merek = utilitas.get('data').filter(item => item.tipe.nama.toUpperCase() === 'MEREK');
      const kategori = utilitas.get('data').filter(item => item.tipe.nama.toUpperCase() === 'KATEGORI');
      const satuan = utilitas.get('data').filter(item => item.tipe.nama.toUpperCase() === 'SATUAN');
      this.setState({ listMerek: merek, listKategori: kategori, listSatuan: satuan });
    }
  }

  handleAddBarang(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { newDataBarang } = this.state;

    console.log(newDataBarang);
    dispatch(addBarang(newDataBarang));
  }

  handleEditBarang(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { isolatedDataBarang } = this.state;

    console.log(isolatedDataBarang);
    dispatch(editBarang(isolatedDataBarang.id, isolatedDataBarang));
  }

  handleDeleteBarang(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { isolatedDataBarang } = this.state;

    console.log(isolatedDataBarang);
    dispatch(deleteBarang(isolatedDataBarang.id));
  }

  handleKategoriChange(e) {
    this.setState({ newDataBarang: {
      ...this.state.newDataBarang,
      kategori: e.target.value,
    } });
  }

  handleIsolatedKategoriChange(e) {
    this.setState({ isolatedDataBarang: {
      ...this.state.isolatedDataBarang,
      kategori: e.target.value,
    } });
  }

  handleMerekChange(e) {
    this.setState({ newDataBarang: {
      ...this.state.newDataBarang,
      merek: e.target.value,
    } });
  }

  handleIsolatedMerekChange(e) {
    this.setState({ isolatedDataBarang: {
      ...this.state.isolatedDataBarang,
      merek: e.target.value,
    } });
  }

  handleTipeChange(e) {
    this.setState({ newDataBarang: {
      ...this.state.newDataBarang,
      tipe: e.target.value } });
  }

  handleIsolatedTipeChange(e) {
    this.setState({ isolatedDataBarang: {
      ...this.state.isolatedDataBarang,
      tipe: e.target.value } });
  }

  handleNamaChange(e) {
    this.setState({ newDataBarang: {
      ...this.state.newDataBarang,
      nama_barang: e.target.value } });
  }

  handleIsolatedNamaChange(e) {
    this.setState({ isolatedDataBarang: {
      ...this.state.isolatedDataBarang,
      nama_barang: e.target.value } });
  }

  handleSatuanChange(e) {
    this.setState({ newDataBarang: {
      ...this.state.newDataBarang,
      satuan: e.target.value } });
  }

  handleIsolatedSatuanChange(e) {
    this.setState({ isolatedDataBarang: {
      ...this.state.isolatedDataBarang,
      satuan: e.target.value } });
  }

  handleHargaBeliChange(e) {
    this.setState({ newDataBarang: {
      ...this.state.newDataBarang,
      harga_beli: e.target.value } });
  }

  handleIsolatedHargaBeliChange(e) {
    this.setState({ isolatedDataBarang: {
      ...this.state.isolatedDataBarang,
      harga_beli: e.target.value } });
  }

  handleHargaJualChange(e) {
    this.setState({ newDataBarang: {
      ...this.state.newDataBarang,
      harga_jual: e.target.value } });
  }

  handleIsolatedHargaJualChange(e) {
    this.setState({ isolatedDataBarang: {
      ...this.state.isolatedDataBarang,
      harga_jual: e.target.value } });
  }

  handleSupplierChange(e) {
    this.setState({ newDataBarang: {
      ...this.state.newDataBarang,
      supplier_barang: e.target.value } });
  }

  handleIsolatedSupplierChange(e) {
    this.setState({ isolatedDataBarang: {
      ...this.state.isolatedDataBarang,
      supplier_barang: e.target.value } });
  }

  textFilter(filter, row) {
    const result = parseInt(row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()), 10);
    if (result < 0) {
      return false;
    }
    return true;
  }

  handleShowModal(e, rowInfo) {
    const { barang } = this.props;
    const isolatedDataBarang = barang.get('data').filter((item) => item === rowInfo.original)[0];
    const temp = {
      harga_beli: isolatedDataBarang.harga_beli,
      harga_jual: isolatedDataBarang.harga_jual,
      id: isolatedDataBarang.id,
      kategori: isolatedDataBarang.kategori.id,
      merek: isolatedDataBarang.merek.id,
      nama_barang: isolatedDataBarang.nama_barang,
      satuan: isolatedDataBarang.satuan.id,
      supplier_barang: isolatedDataBarang.supplier_barang.id,
      tipe: isolatedDataBarang.tipe,
    };
    this.setState({ isolatedDataBarang: temp, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedDataBarang: {}, showModal: false });
  }

  render() {
    const { history, barang, supplier } = this.props;
    const { listKategori, listMerek, listSatuan } = this.state;
    const columns = [
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
                  <ControlLabel>Kategori</ControlLabel>
                  {
                    (this.state.isolatedDataBarang.kategori) ? (
                      <FormControl componentClass='select' placeholder='Kategori' onChange={ this.handleIsolatedKategoriChange } value={ this.state.isolatedDataBarang.kategori }>
                        <option value='0'>--Pilih Kategori--</option>
                        {
                          listKategori.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                        }
                      </FormControl>
                    ) : (
                      null
                    )
                  }
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Merek</ControlLabel>
                  {
                    (this.state.isolatedDataBarang.merek) ? (
                      <FormControl componentClass='select' placeholder='Merek' onChange={ this.handleIsolatedMerekChange } value={ this.state.isolatedDataBarang.merek }>
                        <option value='0'>--Pilih Merek--</option>
                        {
                          listMerek.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                        }
                      </FormControl>
                    ) : (
                      null
                    )
                  }
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Tipe Barang</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedDataBarang.tipe }
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
                  {
                    (this.state.isolatedDataBarang.satuan) ? (
                      <FormControl componentClass='select' placeholder='Satuan' onChange={ this.handleIsolatedSatuanChange } value={ this.state.isolatedDataBarang.satuan }>
                        <option value='0'>--Pilih Satuan--</option>
                        {
                          listSatuan.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                        }
                      </FormControl>
                    ) : (
                      null
                    )
                  }
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
                  {
                    (this.state.isolatedDataBarang.supplier_barang) ? (
                      <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleIsolatedSupplierChange } value={ this.state.isolatedDataBarang.supplier_barang }>
                        <option value='0'>--Pilih Supplier--</option>
                        {
                          (supplier.get('data')) ? (
                            supplier.get('data').map((item) => { return (<option key={ item.id } value={ item.id }>{item.nama}</option>); })
                          ) : (
                              null
                            )
                        }
                      </FormControl>
                    ) : (
                      null
                    )
                  }
                </FormGroup>
                <FormGroup>
                  <HelpBlock>{null}</HelpBlock>
                  <Button type='submit' block bsStyle='primary' onClick={ this.handleEditBarang }>Edit Barang</Button>
                  <Button type='submit' block bsStyle='danger' onClick={ this.handleDeleteBarang } >Delete Barang</Button>
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
                      <Form onSubmit={ this.handleAddBarang }>
                        <FormGroup>
                          <ControlLabel>Kategori</ControlLabel>
                          <FormControl componentClass='select' placeholder='Kategori' onChange={ this.handleKategoriChange } value={ this.state.newDataBarang.kategori }>
                            <option value='0'>--Pilih Kategori--</option>
                            {
                              listKategori.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                            }
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Merek</ControlLabel>
                          <FormControl componentClass='select' placeholder='Merek' onChange={ this.handleMerekChange } value={ this.state.newDataBarang.merek }>
                            <option value='0'>--Pilih Merek--</option>
                            {
                              listMerek.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                            }
                          </FormControl>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Tipe Barang</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newDataBarang.tipe }
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
                            {
                              listSatuan.map(item => <option key={ item.id } value={ item.id }>{item.nama}</option>)
                            }
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
                          <FormControl componentClass='select' placeholder='Supplier' onChange={ this.handleSupplierChange } value={ this.state.newDataBarang.supplier_barang }>
                            <option value='0'>--Pilih Supplier--</option>
                            {
                              (supplier.get('data')) ? (
                                supplier.get('data').map((item) => { return (<option key={ item.id } value={ item.id }>{item.nama}</option>); })
                              ) : (
                                null
                              )
                            }
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
                      {
                        (barang.get('data')) ? (
                          <ReactTable
                            data={ barang.get('data') }
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
                        ) : (
                          null
                        )
                      }
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
