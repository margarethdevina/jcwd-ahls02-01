import axios from "axios"
import { API_URL } from "../../helper"


export const getProvinceActions = (data) => {
  // console.log("data ADDRESS dari component UI", data)
  return {
    type: "GET_PROVINCE",
    payload: data
  }
}
export const getProvinceActions2 = (data) => {
  // console.log("data ADDRESS dari component UI", data)
  return {
    type: "GET_PROVINCE2",
    payload: data
  }
}

export const getProvinceRajaOngkir = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      // console.log("TOKENN PROVINCE RAJAONGKIR", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/rajaOngkir/getProvince`, {})
        if (res.data) {
          // console.log("RES DATA GET PROVINCE RAJAONGKIR", res.data)
          dispatch(getProvinceActions(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getProvinceRajaOngkir2 = (province_id) => {
  return async (dispatch) => {
    try {
      // console.log("PROVINCE_ID ACTIONS 2", province_id)
      let token = localStorage.getItem("tokenIdUser");
      // console.log("TOKENN PROVINCE 2 RAJAONGKIR", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/rajaOngkir/getProvince2`, {})
        if (res.data) {
          // console.log("RES DATA GET PROVINCE RAJAONGKIR", res.data)
          dispatch(getProvinceActions2(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}