import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProduct, addProduct, editProduct, deleteProduct } from 'actions/product';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Form, Button, Image, Modal, HelpBlock } from 'react-bootstrap';

import Menu from 'components/Global/Menu';
import { routeCodes } from 'config/routes';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

@connect(state => ({
  products: state.product.get('products'),
  error: state.product.get('error'),
  loading: state.product.get('loading'),
  isAuthenticated: state.user.get('isAuthenticated'),
}))

export default class Product extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.object,
    loading: PropTypes.bool,
    products: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.state = {
      newProduct: {
        name: '',
        price: 0,
        qty_s: 0,
        qty_m: 0,
        qty_l: 0,
        qty_xl: 0,
        thumbnail_1: '',
        thumbnail_2: '',
        thumbnail_3: '',
        description: '',
      },
      isolatedProduct: {
        name: '',
        price: 0,
        qty_s: 0,
        qty_m: 0,
        qty_l: 0,
        qty_xl: 0,
        thumbnail_1: '',
        thumbnail_2: '',
        thumbnail_3: '',
        description: '',
      },
      showModal: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.handleIsolatedNameChange = this.handleIsolatedNameChange.bind(this);
    this.handleIsolatedPriceChange = this.handleIsolatedPriceChange.bind(this);
    this.handleIsolatedQtyChange = this.handleIsolatedQtyChange.bind(this);
    this.handleIsolatedDescriptionChange = this.handleIsolatedDescriptionChange.bind(this);
    this.handleIsolatedImageChange = this.handleIsolatedImageChange.bind(this);

    this.handleAddNewProduct = this.handleAddNewProduct.bind(this);
    this.handleEditProduct = this.handleEditProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
  }

  componentWillMount() {
    const { dispatch, isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      dispatch(getProduct());
    } else {
      history.push(routeCodes.LOGIN);
    }
  }

  componentDidUpdate(prevProps) {
    const { products } = this.props;
    if (prevProps.products && prevProps.products !== products) {
      this.handleCloseModal();
    }
  }

  getValidationState() { // eslint-disable-line consistent-return
    const length = this.state.newProduct.name.length;
    if (length > 5) {
      return 'success';
    } else if (length > 1) {
      return 'warning';
    } else if (length > 0) {
      return 'error';
    }
  }

  textFilter(filter, row) {
    const result = parseInt(row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()), 10);
    if (result < 0) {
      return false;
    }
    return true;
  }

  handleNameChange(e) {
    this.setState({ newProduct: { ...this.state.newProduct, name: e.target.value } });
  }

  handlePriceChange(e) {
    this.setState({ newProduct: { ...this.state.newProduct, price: e.target.value } });
  }

  handleDescriptionChange(e) {
    this.setState({ newProduct: { ...this.state.newProduct, description: e.target.value } });
  }

  handleQtyChange(e) { // eslint-disable-line consistent-return
    switch (e.target.dataset.type) {
      case 's':
        this.setState({ newProduct: { ...this.state.newProduct, qty_s: e.target.value } });
        break;
      case 'm':
        this.setState({ newProduct: { ...this.state.newProduct, qty_m: e.target.value } });
        break;
      case 'l':
        this.setState({ newProduct: { ...this.state.newProduct, qty_l: e.target.value } });
        break;
      case 'xl':
        this.setState({ newProduct: { ...this.state.newProduct, qty_xl: e.target.value } });
        break;

      default:
        return null;
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    const idx = e.target.dataset.idx;

    reader.onloadend = () => {
      switch (idx) {
        case '1':
          this.setState({ newProduct: { ...this.state.newProduct, thumbnail_1: reader.result } });
          break;
        case '2':
          this.setState({ newProduct: { ...this.state.newProduct, thumbnail_2: reader.result } });
          break;
        case '3':
          this.setState({ newProduct: { ...this.state.newProduct, thumbnail_3: reader.result } });
          break;
        default:
          break;
      }
    };

    reader.readAsDataURL(file);
  }

  handleIsolatedNameChange(e) {
    this.setState({ isolatedProduct: { ...this.state.isolatedProduct, name: e.target.value } });
  }

  handleIsolatedPriceChange(e) {
    this.setState({ isolatedProduct: { ...this.state.isolatedProduct, price: e.target.value } });
  }

  handleIsolatedDescriptionChange(e) {
    this.setState({
      isolatedProduct: { ...this.state.isolatedProduct, description: e.target.value },
    });
  }

  handleIsolatedQtyChange(e) { // eslint-disable-line consistent-return
    switch (e.target.dataset.type) {
      case 's':
        this.setState({
          isolatedProduct: { ...this.state.isolatedProduct, qty_s: e.target.value },
        });
        break;
      case 'm':
        this.setState({
          isolatedProduct: { ...this.state.isolatedProduct, qty_m: e.target.value },
        });
        break;
      case 'l':
        this.setState({
          isolatedProduct: { ...this.state.isolatedProduct, qty_l: e.target.value },
        });
        break;
      case 'xl':
        this.setState({
          isolatedProduct: { ...this.state.isolatedProduct, qty_xl: e.target.value },
        });
        break;

      default:
        return null;
    }
  }

  handleIsolatedImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    const idx = e.target.dataset.idx;

    reader.onloadend = () => {
      switch (idx) {
        case '1':
          this.setState({
            isolatedProduct: { ...this.state.isolatedProduct, thumbnail_1: reader.result },
          });
          break;
        case '2':
          this.setState({
            isolatedProduct: { ...this.state.isolatedProduct, thumbnail_2: reader.result },
          });
          break;
        case '3':
          this.setState({
            isolatedProduct: { ...this.state.isolatedProduct, thumbnail_3: reader.result },
          });
          break;
        default:
          break;
      }
    };

    reader.readAsDataURL(file);
  }

  handleAddNewProduct(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const productData = { ...this.state.newProduct };
    dispatch(addProduct(productData));
  }

  handleEditProduct(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const productData = { ...this.state.isolatedProduct };
    dispatch(editProduct(productData));
  }

  handleDeleteProduct(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const productId = this.state.isolatedProduct.id;
    dispatch(deleteProduct(productId));
  }

  handleShowModal(e, rowInfo) {
    const { products } = this.props;
    const isolatedProduct = products.filter((item) => item === rowInfo.original).get('0');
    this.setState({ isolatedProduct, showModal: true });
  }

  handleCloseModal() {
    this.setState({ isolatedProduct: {}, showModal: false });
  }

  render() {
    const { loading, error, products, history } = this.props;
    const columns = [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            filterMethod: (filter, row) => { return this.textFilter(filter, row); },
          },
        ],
      },
      {
        Header: 'Price',
        columns: [
          {
            Header: 'Local Price',
            accessor: 'price',
          },
          {
            Header: 'International Price',
            accessor: 'price_en',
          },
        ],
      },
      {
        Header: 'Quantity',
        columns: [
          {
            Header: 'S',
            accessor: 'qty_s',
          },
          {
            Header: 'M',
            accessor: 'qty_m',
          },
          {
            Header: 'L',
            accessor: 'qty_l',
          },
          {
            Header: 'XL',
            accessor: 'qty_xl',
          },
        ],
      },
    ];
    return (
      <div>
        <Menu history={ history } />
        <section className='product-section'>
          <Modal show={ this.state.showModal } onHide={ this.handleCloseModal } dialogClassName='edit-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Product Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    type='text'
                    value={ this.state.isolatedProduct.name }
                    onChange={ this.handleIsolatedNameChange }
                    placeholder='Product Name'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Price</ControlLabel>
                  <FormControl
                    min={ 0 }
                    type='number'
                    value={ this.state.isolatedProduct.price }
                    onChange={ this.handleIsolatedPriceChange }
                    placeholder='Product Price'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <h5>Quantity</h5>
                <FormGroup
                  className='form-inline'
                >
                  <ControlLabel>S</ControlLabel>
                  <FormControl
                    type='number'
                    min={ 0 }
                    max={ 999 }
                    value={ this.state.isolatedProduct.qty_s }
                    onChange={ this.handleIsolatedQtyChange }
                    data-type='s'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  className='form-inline'
                >
                  <ControlLabel>M</ControlLabel>
                  <FormControl
                    type='number'
                    min={ 0 }
                    max={ 999 }
                    value={ this.state.isolatedProduct.qty_m }
                    onChange={ this.handleIsolatedQtyChange }
                    data-type='m'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  className='form-inline'
                >
                  <ControlLabel>L</ControlLabel>
                  <FormControl
                    type='number'
                    min={ 0 }
                    max={ 999 }
                    value={ this.state.isolatedProduct.qty_l }
                    onChange={ this.handleIsolatedQtyChange }
                    data-type='l'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  className='form-inline'
                >
                  <ControlLabel>XL</ControlLabel>
                  <FormControl
                    type='number'
                    min={ 0 }
                    max={ 999 }
                    value={ this.state.isolatedProduct.qty_xl }
                    onChange={ this.handleIsolatedQtyChange }
                    data-type='xl'
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <h5>Thumbnails</h5>
                <FormGroup className='form-inline image-form'>
                  <ControlLabel>Thumbnail 1</ControlLabel>
                  {
                    (this.state.isolatedProduct.thumbnail_1 !== '') ? (
                      <Image src={ this.state.isolatedProduct.thumbnail_1 } responsive />
                    ) : (
                        null
                      )
                  }
                  <FormControl type='file' label='Thumbnail 1' data-idx='1' onChange={ this.handleIsolatedImageChange } accept='image/*' />
                </FormGroup>
                <FormGroup className='form-inline image-form'>
                  <ControlLabel>Thumbnail 2</ControlLabel>
                  {
                    (this.state.isolatedProduct.thumbnail_2 !== '') ? (
                      <Image src={ this.state.isolatedProduct.thumbnail_2 } responsive />
                    ) : (
                        null
                      )
                  }
                  <FormControl type='file' label='Thumbnail 2' data-idx='2' onChange={ this.handleIsolatedImageChange } accept='image/*' />
                </FormGroup>
                <FormGroup className='form-inline image-form'>
                  <ControlLabel>Thumbnail 3</ControlLabel>
                  {
                    (this.state.isolatedProduct.thumbnail_3 !== '') ? (
                      <Image src={ this.state.isolatedProduct.thumbnail_3 } responsive />
                    ) : (
                        null
                      )
                  }
                  <FormControl type='file' label='Thumbnail 3' data-idx='3' onChange={ this.handleIsolatedImageChange } accept='image/*' />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl componentClass='textarea' placeholder='Product Description' rows='3' value={ this.state.isolatedProduct.description } onChange={ this.handleIsolatedDescriptionChange } />
                </FormGroup>
                <FormGroup>
                  {
                    (error)?(
                      <HelpBlock>{error.get('message')}</HelpBlock>
                    ):(
                      null
                    )
                  }
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
                <h3>Product</h3>
              </Col>
            </Row>
            <Row className='content-row'>
              <Col xs={ 12 }>
                <Row className='add-product-row'>
                  <Col xs={ 12 }>
                    <Panel>
                      <h4>Add New Product</h4>
                      <Form onSubmit={ this.handleAddNewProduct }>
                        <FormGroup
                          validationState={ this.getValidationState() }
                        >
                          <ControlLabel>Name</ControlLabel>
                          <FormControl
                            type='text'
                            value={ this.state.newProduct.name }
                            onChange={ this.handleNameChange }
                            placeholder='Product Name'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Price</ControlLabel>
                          <FormControl
                            min={ 0 }
                            type='number'
                            value={ this.state.newProduct.price }
                            onChange={ this.handlePriceChange }
                            placeholder='Product Price'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <h5>Quantity</h5>
                        <FormGroup
                          className='form-inline'
                        >
                          <ControlLabel>S</ControlLabel>
                          <FormControl
                            type='number'
                            min={ 0 }
                            max={ 999 }
                            value={ this.state.newProduct.qty_s }
                            onChange={ this.handleQtyChange }
                            data-type='s'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup
                          className='form-inline'
                        >
                          <ControlLabel>M</ControlLabel>
                          <FormControl
                            type='number'
                            min={ 0 }
                            max={ 999 }
                            value={ this.state.newProduct.qty_m }
                            onChange={ this.handleQtyChange }
                            data-type='m'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup
                          className='form-inline'
                        >
                          <ControlLabel>L</ControlLabel>
                          <FormControl
                            type='number'
                            min={ 0 }
                            max={ 999 }
                            value={ this.state.newProduct.qty_l }
                            onChange={ this.handleQtyChange }
                            data-type='l'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup
                          className='form-inline'
                        >
                          <ControlLabel>XL</ControlLabel>
                          <FormControl
                            type='number'
                            min={ 0 }
                            max={ 999 }
                            value={ this.state.newProduct.qty_xl }
                            onChange={ this.handleQtyChange }
                            data-type='xl'
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                        <h5>Thumbnails</h5>
                        <FormGroup className='form-inline image-form'>
                          <ControlLabel>Thumbnail 1</ControlLabel>
                          {
                            (this.state.newProduct.thumbnail_1 !== '') ? (
                              <Image src={ this.state.newProduct.thumbnail_1 } responsive />
                            ) : (
                              null
                            )
                          }
                          <FormControl type='file' label='Thumbnail 1' data-idx='1' onChange={ this.handleImageChange } accept='image/*' />
                        </FormGroup>
                        <FormGroup className='form-inline image-form'>
                          <ControlLabel>Thumbnail 2</ControlLabel>
                          {
                            (this.state.newProduct.thumbnail_2 !== '') ? (
                              <Image src={ this.state.newProduct.thumbnail_2 } responsive />
                            ) : (
                                null
                              )
                          }
                          <FormControl type='file' label='Thumbnail 2' data-idx='2' onChange={ this.handleImageChange } accept='image/*' />
                        </FormGroup>
                        <FormGroup className='form-inline image-form'>
                          <ControlLabel>Thumbnail 3</ControlLabel>
                          {
                            (this.state.newProduct.thumbnail_3 !== '') ? (
                              <Image src={ this.state.newProduct.thumbnail_3 } responsive />
                            ) : (
                                null
                              )
                          }
                          <FormControl type='file' label='Thumbnail 3' data-idx='3' onChange={ this.handleImageChange } accept='image/*' />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Description</ControlLabel>
                          <FormControl componentClass='textarea' placeholder='Product Description' rows='3' value={ this.state.newProduct.description } onChange={ this.handleDescriptionChange } />
                        </FormGroup>
                        <FormGroup>
                          {
                            (error) ? (
                              <HelpBlock>{error.get('message')}</HelpBlock>
                            ) : (
                                null
                              )
                          }
                          <Button type='submit' block bsStyle='primary' disabled={ loading }>
                            Add New Product
                          </Button>
                        </FormGroup>
                      </Form>
                    </Panel>
                    <Panel>
                      <h4>Product List</h4>
                      <h6><em>Click on the table item to edit / delete</em></h6>
                      {
                        (loading) ? ( // eslint-disable-line no-nested-ternary
                          <h5>Loading...</h5>
                        ) : (
                          (!error && products) ? (
                            <ReactTable
                              data={ products.toJS() }
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
                                  } };
                              } }
                            />
                          ) : (
                            <h5>{error}</h5>
                          )
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
