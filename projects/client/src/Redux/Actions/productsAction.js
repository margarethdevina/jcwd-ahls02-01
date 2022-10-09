
export const getProductActions = (data) => {
  // console.log("data PRODUCT dari component UI", data)
  return {
    type: "GET_PRODUCT",
    payload: data
  }
}

export const getAllProductActions = (data) => {
  // console.log("data ALL PRODUCT dari component UI", data)
  return {
    type: "GET_ALLPRODUCT",
    payload: data
  }
}