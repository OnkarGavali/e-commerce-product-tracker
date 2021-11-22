import { UserProductCollectionTypes } from "./userProductCollectionActionTypes";

export const setCurrentProductList = productlist => ({
    type : UserProductCollectionTypes.UPDATE_LIST,
    payload : productlist
});