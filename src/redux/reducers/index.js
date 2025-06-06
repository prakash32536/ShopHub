
import { combineReducers } from 'redux';
import authReducer from '../slice/authSlice';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  ui: uiReducer
});

export default rootReducer;
