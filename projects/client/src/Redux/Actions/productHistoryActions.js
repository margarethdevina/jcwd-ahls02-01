import Axios from "axios"
import { API_URL } from "../../helper"

// getProduct
export const savedProductHistoryPaginateAction = (data) => {
  // console.log("ProductHistoryPaginateAction", data);
  return {
    type: "PRODUK_HISTORY_PAGINATE",
    payload: data
  }
}
export const savedProductHistoryPaginateLengthAction = (data) => {
  // console.log("savedProductHistoryPaginateLengthAction", data);
  return {
    type: "PRODUK_HISTORY_PAGINATE_LENGTH",
    payload: data
  }
}

// searchProduk
export const savedSearchPaginateAction = (data) => {
  // console.log("ProductSearchAction", data);
  return {
    type: "SEARCH_PAGINATE",
    payload: data
  }
}
export const savedSearchPaginateLengthAction = (data) => {
  // console.log("savedSearchPaginateLengthAction", data);
  return {
    type: "SEARCH_PAGINATE_LENGTH",
    payload: data
  }
}

// filterProduk
export const savedFilterPaginateAction = (data) => {
  // console.log("ProductFilterAction", data);
  return {
    type: "FILTER_PAGINATE",
    payload: data
  }
}
export const savedFilterPaginateLengthAction = (data) => {
  // console.log("savedFilterPaginateLengthAction", data);
  return {
    type: "FILTER_PAGINATE_LENGTH",
    payload: data
  }
}

// sortTanggalASCProduk
export const savedSortTanggalASCPaginateAction = (data) => {
  // console.log("SortTanggalASCPaginateAction", data);
  return {
    type: "SORT_TANGGAL_ASC_PAGINATE",
    payload: data
  }
}
export const savedSortTanggalASCPaginateLengthAction = (data) => {
  // console.log("savedSortTanggalASCPaginateLengthAction", data);
  return {
    type: "SORT_TANGGAL_ASC_PAGINATE_LENGTH",
    payload: data
  }
}

// sortTanggalDSCProduk
export const savedSortTanggalDSCPaginateAction = (data) => {
  // console.log("SortTanggalDSCPaginateAction", data);
  return {
    type: "SORT_TANGGAL_DSC_PAGINATE",
    payload: data
  }
}
export const savedSortTanggalDSCPaginateLengthAction = (data) => {
  // console.log("savedSortTanggalDSCPaginateLengthAction", data);
  return {
    type: "SORT_TANGGAL_DSC_PAGINATE_LENGTH",
    payload: data
  }
}

export const getProductHistoryPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      // console.log(`getProductHistoryPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/productHistory/getProdukHistory?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        // console.log(`res.data getProductHistoryPaginateAction`, res.data.produkHistoryPaginate);

        dispatch(savedProductHistoryPaginateAction(res.data.produkHistoryPaginate));
        dispatch(savedProductHistoryPaginateLengthAction(res.data.productHistoryPaginateLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getSearchProductHistoryPaginateAction = (page = 1, searchProduk) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      // console.log(`getProductHistoryPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.post(`${API_URL}/productHistory/getSearchProdukHistory?_page=${page}`, {
          inputProduk: searchProduk
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        // console.log(`res.data getSearchPaginateAction`, res.data.searchProdukHistoryPaginate);

        dispatch(savedSearchPaginateAction(res.data.searchProdukHistoryPaginate));
        dispatch(savedSearchPaginateLengthAction(res.data.searchProdukHistoryLength));
      }
    } catch (error) {
      console.log(error);
    }
  }

}
export const getFilterProductHistoryPaginateAction = (page = 1, filterTanggalAwal, filterTanggalAkhir) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      // console.log(`getProductHistoryPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.post(`${API_URL}/productHistory/getFilterProdukHistory?_page=${page}`, {
          tanggalAwal: filterTanggalAwal,
          tanggalAkhir: filterTanggalAkhir
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        // console.log(`res.data getFilterPaginateAction`, res.data.filterProdukHistoryPaginate);

        dispatch(savedFilterPaginateAction(res.data.filterProdukHistoryPaginate));
        dispatch(savedFilterPaginateLengthAction(res.data.filterProdukHistoryLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getSortTanggalASCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      // console.log(`getSortTanggalASCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/productHistory/getProdukHistoryTanggalASC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        // console.log(`res.data getSortTanggalASCPaginateAction`, res.data.produkHistoryPaginatedLength);

        dispatch(savedSortTanggalASCPaginateAction(res.data.produkHistoryPaginated));
        dispatch(savedSortTanggalASCPaginateLengthAction(res.data.produkHistoryPaginatedLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getSortTanggalDSCPaginateAction = (page = 1) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      // console.log(`getSortTanggalDSCPaginateAction tokenIdUser`, token);

      if (token) {
        let res = await Axios.get(`${API_URL}/productHistory/getProdukHistoryTanggalDSC?_page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        //^ cek isi res.data
        // console.log(`res.data getSortTanggalDSCPaginateAction`, res.data.produkHistoryPaginatedLength);

        dispatch(savedSortTanggalDSCPaginateAction(res.data.produkHistoryPaginated));
        dispatch(savedSortTanggalDSCPaginateLengthAction(res.data.produkHistoryPaginatedLength));
      }
    } catch (error) {
      console.log(error);
    }
  }
}