import { CurrentProduct } from "./currentProductActionTypes";

export const setCurrentProduct = product => ({
    type : CurrentProduct.SET_CURRENT_PRODUCT,
    payload : product
});

export const removeCurrentProduct = () => ({
    type : CurrentProduct.REMOVE_CURRENT_PRODUCT
})