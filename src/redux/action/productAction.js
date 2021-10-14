import { PRODUCT_SELL } from "../const";
import { API_URL } from "../const";
import axios from "axios";

export function updateState(data) {
    return {
        type: PRODUCT_SELL,
        payload: data
    }
}

export const getSaleProducts = () => (dispatch, getState) => {
    axios.get(API_URL + "sale/10")
        .then(res => {
            dispatch(updateState({ productInfos: res.data, totalPriceArray: [] }));
            res.data.forEach(a => {
                dispatch(updateState({totalPriceArray: [...getState().product.totalPriceArray, a.sold_price * a.quantity]}))
            })
            dispatch(updateState({totalPrice: getState().product.totalPriceArray?.reduce((a, b) => a + b)}))
        })
}

export const deleteItem = () => (dispatch, getState) => {
    axios.delete(API_URL + "sale-product/" + getState().product.selectedItem)
        .then(res => {
            dispatch(getSaleProducts());
            console.log(getState().product.selectedItem)
        })
}

export const deleteItemsByGroup = () => (dispatch, getState) => {
    axios.delete(API_URL + "sale-product/" + getState().product.selectItems.join(","))
        .then(res => {
            console.log(res)
            dispatch(getSaleProducts())
            dispatch(updateState({ selectItems: [] }))
        })


}

export const getProductsByStatus = () => (dispatch) => {
    axios.get(API_URL + "product-by-status")
        .then(res => {
            dispatch(updateState({ productsByStatus: res.data }))
            dispatch(searchInProducts())
        })
}


export const moveProductsByStatus = (id) => (dispatch) => {
    console.log(id)
    var value = {
        quantity: 1,
        sold_price: 123,
        sale: 10,
        product: id
    }
    axios.post(API_URL + "sale-product/", value)
        .then(res => {
            console.log(res)
            dispatch(getSaleProducts())
        })
}

export const searchInProducts = () => (dispatch) => {
    axios(API_URL + "search-in-product")
        .then(res => {
            dispatch(updateState({ searchInProducts: res.data }))
        })
}

export const addSearchedProducts = (id) => (dispatch, getState) => {
    console.log(id)
    var values = {
        quantity: 1,
        sold_price: 132,
        sale: 10,
        product: id
    }
    axios.post(API_URL + "sale-product/", values)
        .then(res => {
            console.log("res", res)
            dispatch(getSaleProducts())
        })
        .catch(err => console.log(err))
}

export const updateSetCounts = (quantity, info) => (dispatch, getState) => {
    var values = {
        id: info.sale_product_id,
        quantity: quantity,
    }

    console.log(info.sale_product_id)

    axios.put(API_URL + "sale-product-quantity/" + info.sale_product_id + "/", values)
        .then(res => {
            console.log(res)
            dispatch(getSaleProducts())
        })
}

