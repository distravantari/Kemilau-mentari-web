import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { routeCodes } from 'config/routes';

export default class Menu extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push(e.target.dataset.to);
  }

  handleLogout(e) {
    // TODO: call logout action
    e.preventDefault();
    const { history } = this.props;
    history.push(routeCodes.LOGIN);
  }

  render() {
    return (
      <section className='menu-section'>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink className='navbar-brand' exact to={ routeCodes.BARANG }>Universal POS</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title='DATA' id='basic-nav-dropdown'>
                <NavItem data-to={ routeCodes.BARANG } onClick={ this.handleNavigation }>Barang</NavItem>
                <NavItem data-to={ routeCodes.KONSUMEN } onClick={ this.handleNavigation }>Konsumen</NavItem>
                <NavItem data-to={ routeCodes.PEGAWAI } onClick={ this.handleNavigation }>Pegawai</NavItem>
                <NavItem data-to={ routeCodes.SUPPLIER } onClick={ this.handleNavigation }>Supplier</NavItem>
                <NavItem data-to={ routeCodes.UTILITAS } onClick={ this.handleNavigation }>Utilitas</NavItem>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title='AKUN' id='basic-nav-dropdown'>
                <NavItem data-to={ routeCodes.TAMBAH_AKUN } onClick={ this.handleNavigation }>Tambah Akun</NavItem>
                <NavItem data-to={ routeCodes.EDIT_AKUN } onClick={ this.handleNavigation }>Edit Akun</NavItem>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title='TRANSACTION' id='basic-nav-dropdown'>
                <NavItem data-to={ routeCodes.PENGELUARAN_BIAYA } onClick={ this.handleNavigation }>Pengeluaran Biaya</NavItem>
                <NavItem data-to={ routeCodes.RETUR_PEMBELIAN } onClick={ this.handleNavigation }>Retur Pembelian</NavItem>
                <NavItem data-to={ routeCodes.RETUR_PENJUALAN } onClick={ this.handleNavigation }>Retur Penjualan</NavItem>
                <NavItem data-to={ routeCodes.PENERIMAAN_BARANG } onClick={ this.handleNavigation }>Penerimaan Barang</NavItem>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavItem data-to={ routeCodes.HISTORY } onClick={ this.handleNavigation }>HISTORY</NavItem>
            </Nav>
            <Nav>
              <NavItem data-to={ routeCodes.UPLOAD_DATA } onClick={ this.handleNavigation }>UPLOAD DATA</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem onClick={ this.handleLogout }>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </section>
    );
  }
}
