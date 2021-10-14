import {PRODUCT_SELL} from "../const"
const initialState = {
    products: [],
    productInfos: null,
    productsByStatus: [],
    searchInProducts: [],
    productsPrice: [0],
    isSearching: false,
    searchingValue: "",
    selectedItem: "",
    selectedIndex: 0,
    canvasMenu: false,
    selectItems: [],
    selectItem: false,
    isDeleted: false,
    isCalculate: false,
    totalPriceArray: [],
    totalPrice: "",

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