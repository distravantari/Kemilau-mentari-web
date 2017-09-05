import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from 'views/Login';
import Barang from 'views/Barang';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  LOGIN: publicPath,
  BARANG: `${ publicPath }barang`,
};

export default () => (
  <Switch>
    <Route exact path={ routeCodes.LOGIN } component={ Login } />
    <Route exact path={ routeCodes.BARANG } component={ Barang } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
