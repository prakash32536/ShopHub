
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import uiReducer from './reducers/uiReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    ui: uiReducer
  }
});

export default store;
