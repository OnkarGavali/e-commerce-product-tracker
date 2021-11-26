import { UserProductCollectionTypes } from "./userProductCollectionActionTypes";

export const setCurrentProductList = productlist => ({
    type : UserProductCollectionTypes.SET_CURRENT_PRODUCT_LIST,
    payload : productlist
});

export const updateCurrentProductList = product => ({
    type : UserProductCollectionTypes.UPDATE_CURRENT_PRODUCT_LIST,
    payload : product
});

export const deleteFromCurrentProductList = product => ({
    type : UserProductCollectionTypes.DELETE_PRODUCT_FROM_LIST,
    payload : product
});

export const addNewInProductList = product => ({
    type : UserProductCollectionTypes.ADD_PRODUCT_IN_LIST,
    payload : product
});