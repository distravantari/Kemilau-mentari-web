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
              <NavItem data-to={ routeCodes.BARANG } onClick={ this.handleNavigation }>Barang</NavItem>
              <NavItem data-to={ routeCodes.KONSUMEN } onClick={ this.handleNavigation }>Konsumen</NavItem>
              <NavItem data-to={ routeCodes.PEGAWAI } onClick={ this.handleNavigation }>Pegawai</NavItem>
              <NavItem data-to={ routeCodes.SUPPLIER } onClick={ this.handleNavigation }>Supplier</NavItem>
              <NavItem data-to={ routeCodes.UTILITAS } onClick={ this.handleNavigation }>Utilitas</NavItem>
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
