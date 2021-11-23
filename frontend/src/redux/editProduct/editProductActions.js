import {EditProductActionTypes} from "./editProductActionTypes";

export const setEditProductData = (product) =>({
    type:EditProductActionTypes.SET_EDIT_PRODUCT_DATA,
    payload: product
})

export const createNewProduct = (product) => ({
    type: EditProductActionTypes.CREATE_NEW_PRODUCT_DATA,
    payload : product
})