import { UserProductCollectionTypes } from "./userProductCollectionActionTypes";

export const setCurrentUser = productlist => ({
    type : UserProductCollectionTypes.UPDATE_LIST,
    payload : productlist
});