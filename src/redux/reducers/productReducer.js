import {PRODUCT_SELL} from "../const"
const initialState = {
    products: [],
    productInfos: [],
    selectedItem: ""
}

export const productReducer = (state=initialState, action) => {
    if(action.type === PRODUCT_SELL){
        return {
            ...state,
            ...action.payload
        }
    }
    return state
}