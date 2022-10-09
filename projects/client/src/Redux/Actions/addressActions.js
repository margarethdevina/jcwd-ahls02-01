import axios from "axios"
import { API_URL } from "../../helper"


export const getAddressActions = (data) => {
  // console.log("data ADDRESS dari component UI", data)
  return {
    type: "GET_ADDRESS",
    payload: data
  }
}

export const getAddress = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      // console.log("TOKENN ADDRESS", token)
      // memeriksa adanya token
      if (token) {
        let res = await axios.get(`${API_URL}/address/getAddress`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data) {
          // console.log("RES DATA GETADDRESS", res.data)
          dispatch(getAddressActions(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}