import axios from "axios"
import { API_URL } from "../../helper"


export const getCityActions = (data) => {
  // console.log("data ADDRESS dari component UI", data)
  return {
    type: "GET_CITY",
    payload: data
  }
}
export const getCityActions2 = (data) => {
  // console.log("data GETCITY dari component UI", data)
  return {
    type: "GET_CITY2",
    payload: data
  }
}

export const getCityRajaOngkir = (provinceid) => {
  return async (dispatch) => {
    try {
      // console.log("=====provinceid getCity Raja Ongkir", provinceid)
      // console.log("getCity Raja Ongkir JALANN", provinceid)
      if (provinceid) {
        let res = await axios.get(`${API_URL}/rajaOngkir/getCity`, {
          headers: {
            provinceid: provinceid
          }
        })
        if (res.data) {
          // console.log("RES DATA GET CITY RAJAONGKIR", res.data)
          dispatch(getCityActions(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}