import {PRODUCT_SELL} from "../const";
import {API_URL} from "../const";
import axios from "axios";

export function updateState(data) {
    return {
        type: PRODUCT_SELL,
        payload: data
    }
}

export const getSaleProducts = () => (dispatch) => {
    axios.get( API_URL + "sale/2")
        .then(res => {
            dispatch(updateState({productInfos: res.data}));
        })
}

export const deleteItem = () => (dispatch, getState) => {
    axios.delete( API_URL + "sale-product/" + getState().product.selectedItem)
        .then(res => {
            dispatch(getSaleProducts());
            console.log(getState().product.selectedItem)
        })
}

export const getProductsByStatus = () => (dispatch) => {
    axios.get(API_URL + "product-by-status")
        .then(res => {
            dispatch(updateState({productsByStatus: res.data}))
            console.log(res)
            dispatch(searchInProducts())
        })
}

export const deleteProductsByStatus = (id) => (dispatch, getState) => {
    axios.delete(API_URL + "product-by-status/" + id)
        .then(res => {
            console.log(res)
            dispatch(moveProductsByStatus(id))
            dispatch(updateState({productsByStatus: getState().product.productsByStatus.filter(item => item.id !== id)}))
            dispatch(getProductsByStatus())
        })
}

export const moveProductsByStatus = (id) => (dispatch) => {  
    let value = {
        quantity: 1,
        sale: 1,
        product: id
    }
    axios.post(API_URL + "sale-product/", value)
        .then(res => {
            console.log(res)
            dispatch(getSaleProducts())
        })
}

export const searchInProducts = () => (dispatch) => {
    axios( API_URL + "search-in-product")
        .then(res => {
            dispatch(updateState({searchInProducts: res.data}))
        })
}

export const addSearchedProducts = (id) => (dispatch, getState) => {
    let values = {
        quantity: 1,
        sale: 2,
        product: id
    }
    axios.post(API_URL + "sale-product/", values)
        .then(res => { 
            console.log("res", res)
            // dispatch(updateState({productInfos: [...getState().product.productInfos, res.data]})) 
            dispatch(getSaleProducts())   
        })
        .catch(err => console.log(err))
}