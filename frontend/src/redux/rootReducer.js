import { combineReducers } from 'redux'
import userReducer from './user/userReducer';
import userProductCollectionReducer from './userProductCollection/userProductCollectionReducer';

export default combineReducers({
    user : userReducer,
    productList : userProductCollectionReducer
});