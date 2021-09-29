import {PRODUCT_SELL} from "../const";
import {API_URL} from "../const"
import axios from "axios";


export function updateState(data) {
    return {
        type: PRODUCT_SELL,
        payload: data
    }
}

export const getSaleProducts = () => (dispatch) => {
        axios.get( API_URL + "sale-product")
            .then(res => {
                dispatch(updateState({products: res.data}))
        })

        dispatch(getProductByQuantity());
}
export const getProductByQuantity = () => (dispatch) => {
    axios.get( API_URL + "product")
        .then(res => {
            // console.log(res.data)
            dispatch(updateState({productInfos: res.data}))
        })
}

export const deleteItem = () => (dispatch, getState) => {
    axios.delete( API_URL + "sale-product/" + getState().product.selectedItem)
        .then(res => {
            // dispatch(updateState({}))
            dispatch(getSaleProducts());
        })
}
