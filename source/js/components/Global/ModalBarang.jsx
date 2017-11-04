import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

// react table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { barang } from '../../views/data.json';

export default class Barang extends Component {
  static propTypes = {
    hidden: PropTypes.bool,
    onHide: PropTypes.func,
    columns: PropTypes.array,
  }

  render() {
    return (
      <Modal show={ !this.props.hidden } dialogClassName='edit-modal' onHide={ this.props.onHide }>
        <Modal.Header closeButton>
          <Modal.Title>Cari Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactTable
            data={ barang.data }
            columns={ this.props.columns }
            noDataText='No Data Available'
            filterable
            defaultPageSize={ 10 }
            className='-striped -highlight'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.props.onHide }>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
