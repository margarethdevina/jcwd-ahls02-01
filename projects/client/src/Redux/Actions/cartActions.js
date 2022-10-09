import Axios from "axios"
import { API_URL } from "../../helper"

//* storing cart info into reducer
export const savedCartAction = (data) => {
    // console.log("data savedCartAction", data);

    return {
        type: "SAVED_CART",
        payload: data
    }
}

//* initially get user's cart info
//* also use for getting the latest user's cart info
export const getCartAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            // console.log(`getCartAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/cart/getAllCart`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                // console.log(`res.data`, res.data);

                dispatch(savedCartAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const savedMainStockAction = (data) => {
    // console.log("data savedMainStockAction", data);

    return {
        type: "SAVED_MAIN_STOCK",
        payload: data
    }
}

export const getAllMainStockAction = () => {
    return async (dispatch) => {
        try {

            let res = await Axios.get(`${API_URL}/cart/getAllMainStock`)

            //^ cek isi res.data
            // console.log(`res.data`, res.data);

            dispatch(savedMainStockAction(res.data));

        } catch (error) {
            console.log(error);
        }
    }
}