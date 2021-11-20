import { UserProductCollectionTypes } from "./userProductCollectionActionTypes";

const INITIAL_STATE = {
    currentProductList : []
} 

const userProductCollectionReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case UserProductCollectionTypes.UPDATE_LIST :
            return ({
                ...state,
                currentProductList : action.payload
            })
        default : 
            return state;
    }
}

export default userProductCollectionReducer;