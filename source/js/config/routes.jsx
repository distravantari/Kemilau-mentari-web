import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from 'views/Login';
import Barang from 'views/Barang';
import Konsumen from 'views/Konsumen';
import Pegawai from 'views/Pegawai';
import Supplier from 'views/Supplier';
import Utilitas from 'views/Utilitas';
import TambahAkun from 'views/TambahAkun';
import EditAkun from 'views/EditAkun';
import PengeluaranBiaya from 'views/PengeluaranBiaya';
import ReturPembelian from 'views/ReturPembelian';
import ReturPenjualan from 'views/ReturPenjualan';
import History from 'views/History';

import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  LOGIN: publicPath,
  BARANG: `${ publicPath }barang`,
  KONSUMEN: `${ publicPath }konsumen`,
  PEGAWAI: `${ publicPath }pegawai`,
  SUPPLIER: `${ publicPath }supplier`,
  UTILITAS: `${ publicPath }utilitas`,
  TAMBAH_AKUN: `${ publicPath }tambah-akun`,
  EDIT_AKUN: `${ publicPath }edit-akun`,
  PENGELUARAN_BIAYA: `${ publicPath }pengeluaran-biaya`,
  RETUR_PEMBELIAN: `${ publicPath }retur-pembelian`,
  RETUR_PENJUALAN: `${ publicPath }retur-penjualan`,
  HISTORY: `${ publicPath }history`,
};

export default () => (
  <Switch>
    <Route exact path={ routeCodes.LOGIN } component={ Login } />
    <Route exact path={ routeCodes.BARANG } component={ Barang } />
    <Route exact path={ routeCodes.KONSUMEN } component={ Konsumen } />
    <Route exact path={ routeCodes.PEGAWAI } component={ Pegawai } />
    <Route exact path={ routeCodes.SUPPLIER } component={ Supplier } />
    <Route exact path={ routeCodes.UTILITAS } component={ Utilitas } />
    <Route exact path={ routeCodes.TAMBAH_AKUN } component={ TambahAkun } />
    <Route exact path={ routeCodes.EDIT_AKUN } component={ EditAkun } />
    <Route exact path={ routeCodes.PENGELUARAN_BIAYA } component={ PengeluaranBiaya } />
    <Route exact path={ routeCodes.RETUR_PEMBELIAN } component={ ReturPembelian } />
    <Route exact path={ routeCodes.RETUR_PENJUALAN } component={ ReturPenjualan } />
    <Route exact path={ routeCodes.HISTORY } component={ History } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
