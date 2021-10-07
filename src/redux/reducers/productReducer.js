import {PRODUCT_SELL} from "../const"
const initialState = {
    products: [],
    productInfos: [],
    productsByStatus: [],
    searchInProducts: [],
    productsPrice: [0],
    isSearching: false,
    selectedItem: "",
    selectedIndex: 0,
    canvasMenu: false

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