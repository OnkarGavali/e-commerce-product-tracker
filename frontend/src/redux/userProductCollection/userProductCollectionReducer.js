import { UserProductCollectionTypes } from "./userProductCollectionActionTypes";

const INITIAL_STATE = {
    currentProductList : []
} 

const userProductCollectionReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case UserProductCollectionTypes.SET_CURRENT_PRODUCT_LIST :
            return ({
                ...state,
                currentProductList : action.payload
            })
        case UserProductCollectionTypes.UPDATE_CURRENT_PRODUCT_LIST :
            const filteredUpdatedList = state.currentProductList.filter((pro) =>{ return pro.id != action.payload.id })
            return ({
                ...state,
                currentProductList : [...filteredUpdatedList,action.payload]
            })
        case UserProductCollectionTypes.DELETE_PRODUCT_FROM_LIST :
            const filteredDeletedList = state.currentProductList.filter((pro) =>{ return pro.id != action.payload.id })
            return ({
                ...state,
                currentProductList : filteredDeletedList
            })
        case UserProductCollectionTypes.ADD_PRODUCT_IN_LIST :
            return ({
                ...state,
                currentProductList : [...state.currentProductList,action.payload]
            })
        default : 
            return state;
    }
}

export default userProductCollectionReducer;