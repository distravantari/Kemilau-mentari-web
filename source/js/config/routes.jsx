import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from 'views/Login';
import Barang from 'views/Barang';
import Konsumen from 'views/Konsumen';
import Pegawai from 'views/Pegawai';
import Supplier from 'views/Supplier';
import Utilitas from 'views/Utilitas';

import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  LOGIN: publicPath,
  BARANG: `${ publicPath }barang`,
  KONSUMEN: `${ publicPath }konsumen`,
  PEGAWAI: `${ publicPath }pegawai`,
  SUPPLIER: `${ publicPath }supplier`,
  UTILITAS: `${ publicPath }utilitas`,
};

export default () => (
  <Switch>
    <Route exact path={ routeCodes.LOGIN } component={ Login } />
    <Route exact path={ routeCodes.BARANG } component={ Barang } />
    <Route exact path={ routeCodes.KONSUMEN } component={ Konsumen } />
    <Route exact path={ routeCodes.PEGAWAI } component={ Pegawai } />
    <Route exact path={ routeCodes.SUPPLIER } component={ Supplier } />
    <Route exact path={ routeCodes.UTILITAS } component={ Utilitas } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
