import { ChartProductsActionTypes } from "./chartProductsActionTypes";
const INITIAL_STATE = {
    chartProductList : []
} 

const chartProductReducer = ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case ChartProductsActionTypes.ADD_PRODUCT :
            return ({
                ...state,
                chartProductList : [...state.chartProductList ,action.payload]
            })
        case ChartProductsActionTypes.REMOVE_PRODUCT :
            const filteredList = state.chartProductList.filter((pro) =>pro.id != action.payload.id )
            return ({
                ...state,
                chartProductList : filteredList
            })
        default : 
            return state;
    }
}

export default chartProductReducer;