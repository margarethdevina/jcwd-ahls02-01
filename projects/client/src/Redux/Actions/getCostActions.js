import axios from "axios"
import { API_URL } from "../../helper"

export const getCostActions = (data) => {
    // console.log("data rajaongkir cost dari component UI", data)
    return {
        type: "GET_COST",
        payload: data
    }
}

export const getCostActions2 = (data) => {
    // console.log("data rajaongkir cost kedua dari component UI", data)
    return {
        type: "GET_COST2",
        payload: data
    }
}

export const getCostRajaOngkir = (idCity) => {
    return async (dispatch) => {
        try {
            // console.log("=====idCity getCostRajaOngkir", idCity);
            if (idCity > 0) {
                let res = await axios.get(`${API_URL}/rajaOngkir/getCost`, {
                    headers: {
                        kota: idCity
                    }
                })
                if (res.data) {
                    // console.log("RES DATA GET COST RAJAONGKIR", res.data.dataOngkir)
                    dispatch(getCostActions(res.data.dataOngkir));
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}