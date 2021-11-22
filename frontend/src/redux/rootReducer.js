import { combineReducers } from 'redux'
import chartProductReducer from './chartProducts/chartProductsReducer';
import currentProductReduer from './currentProduct.js/currentProductReducer';
import userReducer from './user/userReducer';
import userProductCollectionReducer from './userProductCollection/userProductCollectionReducer';

export default combineReducers({
    user : userReducer,
    productList : userProductCollectionReducer,
    currentProduct : currentProductReduer,
    chartProductList: chartProductReducer
});