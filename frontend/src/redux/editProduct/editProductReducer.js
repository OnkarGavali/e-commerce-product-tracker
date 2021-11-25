import {EditProductActionTypes} from "./editProductActionTypes"

const INITIAL_STATE = {
    editProductData : null
} 

const editProductReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case EditProductActionTypes.SET_EDIT_PRODUCT_DATA :
            return ({
                ...state,
                editProductData : action.payload
            })
        case EditProductActionTypes.CREATE_NEW_PRODUCT_DATA :
            return({
                ...state,
                editProductData : null
            })
        default : 
            return state;
    }
}


export default editProductReducer;