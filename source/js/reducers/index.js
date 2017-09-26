import { combineReducers } from 'redux';
import barang from './barang';
import konsumen from './konsumen';
import pegawai from './pegawai';
import supplier from './supplier';
import tipeUtilitas from './tipeUtilitas';
import utilitas from './utilitas';

export default combineReducers({
  barang,
  konsumen,
  pegawai,
  supplier,
  tipeUtilitas,
  utilitas,
});
