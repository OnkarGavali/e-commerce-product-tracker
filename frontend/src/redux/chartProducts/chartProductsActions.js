import { ChartProductsActionTypes } from "./chartProductsActionTypes";

export const addProductInChart = product => ({
    type : ChartProductsActionTypes.ADD_PRODUCT,
    payload : product
});

export const removeProductFromChart = product_id =>({
    type : ChartProductsActionTypes.REMOVE_PRODUCT,
    payload : product_id
})