import { CurrentProduct } from "./currentProductActionTypes";

const INITIAL_STATE = {
    currentProduct : null
} 

const currentProductReduer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case CurrentProduct.SET_CURRENT_PRODUCT :
            return ({
                ...state,
                currentProduct : action.payload
            })
        case CurrentProduct.REMOVE_CURRENT_PRODUCT :
            return({
                ...state,
                currentProduct : null
            })
        default : 
            return state;
    }
}

export default currentProductReduer;