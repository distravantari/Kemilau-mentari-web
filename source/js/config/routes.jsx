import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from 'views/Login';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  LOGIN: publicPath,
};

export default () => (
  <Switch>
    <Route exact path={ routeCodes.LOGIN } component={ Login } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
