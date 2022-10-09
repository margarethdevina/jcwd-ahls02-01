import Axios from "axios"
import { API_URL } from "../../helper"

//* SAVED SEMUA TRANSAKSI USER DI REDUCER -- U0
export const savedTransactionAction = (data) => {
    console.log("savedTransactionAction", data);

    return {
        type: "SAVED_TRANSACTION",
        payload: data
    }
}

//* SAVED USER VALIDASI RESEP ACTION -- U1
export const savedUserValidasiResepAction = (data) => {
    console.log("savedUserValidasiResepAction", data);

    return {
        type: "USER_VALIDASI_RESEP",
        payload: data
    }
}

//* SAVED USER MENUNGGU PEMBAYARAN ACTION -- U2
export const savedUserMenungguPembayaranAction = (data) => {
    console.log("savedUserMenungguPembayaranAction", data);

    return {
        type: "USER_MENUNGGU_PEMBAYARAN",
        payload: data
    }
}

//* SAVED USER MENUNGGU KONFIRMASI ACTION -- U3
export const savedUserMenungguKonfirmasiAction = (data) => {
    console.log("savedUserMenungguKonfirmasiAction", data);

    return {
        type: "USER_MENUNGGU_KONFIRMASI",
        payload: data
    }
}

//* SAVED USER DIPROSES ACTION -- U4
export const savedUserDiprosesAction = (data) => {
    console.log("savedUserDiprosesAction", data);

    return {
        type: "USER_DIPROSES",
        payload: data
    }
}

//* SAVED USER DIKIRIM ACTION -- U5
export const savedUserDikirimAction = (data) => {
    console.log("savedUserDikirimAction", data);

    return {
        type: "USER_DIKIRIM",
        payload: data
    }
}

//* SAVED USER PESANAN DIKONFIRMASI ACTION -- U6
export const savedUserPesananDikonfirmasiAction = (data) => {
    console.log("savedUserPesananDikonfirmasiAction", data);

    return {
        type: "USER_PESANAN_DIKONFIRMASI",
        payload: data
    }
}

//* SAVED USER DIBATALKAN ACTION -- U7
export const savedUserDibatalkanAction = (data) => {
    console.log("savedUserDibatalkanAction", data);

    return {
        type: "USER_DIBATALKAN",
        payload: data
    }
}


//* GET SEMUA TRANSAKSI USER -- GET U1
//* initially get transaction's cart info
//* also use for getting the latest user's transaction info
export const getTransactionAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getTransactionAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetAllTransaction`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getTransactionAction`, res.data);

                dispatch(savedTransactionAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER VALIDASI RESEP -- GET U1A
export const getUserValidasiResepAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserValidasiResepAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetValidasiResep?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserValidasiResepAction`, res.data);

                dispatch(savedUserValidasiResepAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER VALIDASI RESEP TERFILTER DAN TERSORTIR -- GET U1B
export const getUserFilterValidasiResepAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterValidasiResepAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterValidasiResep${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterValidasiResepAction`, res.data);

                dispatch(savedUserValidasiResepAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER MENUNGGU PEMBAYARAN -- GET U2A
export const getUserMenungguPembayaranAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserMenungguPembayaranAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetMenungguPembayaran?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserMenungguPembayaranAction`, res.data);

                dispatch(savedUserMenungguPembayaranAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER MENUNGGU PEMBAYARAN TERFILTER DAN TERSORTIR -- GET U2B
export const getUserFilterMenungguPembayaranAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterMenungguPembayaranAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterMenungguPembayaran${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterMenungguPembayaranAction`, res.data);

                dispatch(savedUserMenungguPembayaranAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER MENUNGGU KONFIRMASI -- GET U3A
export const getUserMenungguKonfirmasiAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserMenungguKonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetMenungguKonfirmasi?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserMenungguKonfirmasiAction`, res.data);

                dispatch(savedUserMenungguKonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER MENUNGGU KONFIRMASI TERFILTER DAN TERSORTIR -- GET U3B
export const getUserFilterMenungguKonfirmasiAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterMenungguKonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterMenungguKonfirmasi${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterMenungguKonfirmasiAction`, res.data);

                dispatch(savedUserMenungguKonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIPROSES -- GET U4A
export const getUserDiprosesAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserDiprosesAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetDiproses?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserDiprosesAction`, res.data);

                dispatch(savedUserDiprosesAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIPROSES TERFILTER DAN TERSORTIR -- GET U4B
export const getUserFilterDiprosesAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterDiprosesAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterDiproses${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterDiprosesAction`, res.data);

                dispatch(savedUserDiprosesAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIKIRIM -- GET U5A
export const getUserDikirimAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserDikirimAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetDikirim?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserDikirimAction`, res.data);

                dispatch(savedUserDikirimAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIKIRIM TERFILTER DAN TERSORTIR -- GET U5B
export const getUserFilterDikirimAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterDikirimAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterDikirim${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterDikirimAction`, res.data);

                dispatch(savedUserDikirimAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER PESANAN DIKONFIRMASI -- GET U6A
export const getUserPesananDikonfirmasiAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserPesananDikonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetPesananDikonfirmasi?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserPesananDikonfirmasiAction`, res.data);

                dispatch(savedUserPesananDikonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER PESANAN DIKONFIRMASI TERFILTER DAN TERSORTIR -- GET U6B
export const getUserFilterPesananDikonfirmasiAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterPesananDikonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterPesananDikonfirmasi${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterPesananDikonfirmasiAction`, res.data);

                dispatch(savedUserPesananDikonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIBATALKAN -- GET U7A
export const getUserDibatalkanAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserDibatalkanAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userGetDibatalkan?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserDibatalkanAction`, res.data);

                dispatch(savedUserDibatalkanAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI USER DIBATALKAN TERFILTER DAN TERSORTIR -- GET U7B
export const getUserFilterDibatalkanAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getUserFilterDibatalkanAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/userFilterDibatalkan${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getUserFilterDibatalkanAction`, res.data);

                dispatch(savedUserDibatalkanAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//! ===============================================================

//* SAVED SEMUA TRANSAKSI ADMIN -- A0
export const savedTransactionAdminAction = (data) => {
    console.log("savedTransactionAdminAction", data);

    return {
        type: "SAVED_TRANSACTION_ADMIN",
        payload: data
    }
}

//* SAVED ADMIN VALIDASI RESEP ACTION -- A1
export const savedAdminValidasiResepAction = (data) => {
    console.log("savedAdminValidasiResepAction", data);

    return {
        type: "ADMIN_VALIDASI_RESEP",
        payload: data
    }
}

//* SAVED ADMIN MENUNGGU PEMBAYARAN ACTION -- A2
export const savedAdminMenungguPembayaranAction = (data) => {
    console.log("savedAdminMenungguPembayaranAction", data);

    return {
        type: "ADMIN_MENUNGGU_PEMBAYARAN",
        payload: data
    }
}

//* SAVED ADMIN MENUNGGU KONFIRMASI ACTION -- A3
export const savedAdminMenungguKonfirmasiAction = (data) => {
    console.log("savedAdminMenungguKonfirmasiAction", data);

    return {
        type: "ADMIN_MENUNGGU_KONFIRMASI",
        payload: data
    }
}

//* SAVED ADMIN DIPROSES ACTION -- A4
export const savedAdminDiprosesAction = (data) => {
    console.log("savedAdminDiprosesAction", data);

    return {
        type: "ADMIN_DIPROSES",
        payload: data
    }
}

//* SAVED ADMIN DIKIRIM ACTION -- A5
export const savedAdminDikirimAction = (data) => {
    console.log("savedAdminDikirimAction", data);

    return {
        type: "ADMIN_DIKIRIM",
        payload: data
    }
}

//* SAVED ADMIN PESANAN DIKONFIRMASI ACTION -- A6
export const savedAdminPesananDikonfirmasiAction = (data) => {
    console.log("savedAdminPesananDikonfirmasiAction", data);

    return {
        type: "ADMIN_PESANAN_DIKONFIRMASI",
        payload: data
    }
}

//* SAVED ADMIN DIBATALKAN ACTION -- A7
export const savedAdminDibatalkanAction = (data) => {
    console.log("savedAdminDibatalkanAction", data);

    return {
        type: "ADMIN_DIBATALKAN",
        payload: data
    }
}

//* GET SEMUA TRANSAKSI ADMIN -- GET A1
export const getTransactionAdminAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getTransactionAdminAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetAllTransaction`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getTransactionAdminAction`, res.data);

                dispatch(savedTransactionAdminAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN VALIDASI RESEP -- GET A1A
export const getAdminValidasiResepAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminValidasiResepAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetValidasiResep?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminValidasiResepAction`, res.data);

                dispatch(savedAdminValidasiResepAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN VALIDASI RESEP TERFILTER DAN TERSORTIR -- GET A1B
export const getAdminFilterValidasiResepAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminFilterValidasiResepAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminFilterValidasiResep${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminFilterValidasiResepAction`, res.data);

                dispatch(savedAdminValidasiResepAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN MENUNGGU PEMBAYARAN -- GET A2A
export const getAdminMenungguPembayaranAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminMenungguPembayaranAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetMenungguPembayaran?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminMenungguPembayaranAction`, res.data);

                dispatch(savedAdminMenungguPembayaranAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN MENUNGGU PEMBAYARAN TERFILTER DAN TERSORTIR -- GET A2B
export const getAdminFilterMenungguPembayaranAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminFilterMenungguPembayaranAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminFilterMenungguPembayaran${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminFilterMenungguPembayaranAction`, res.data);

                dispatch(savedAdminMenungguPembayaranAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN MENUNGGU KONFIRMASI -- GET A3A
export const getAdminMenungguKonfirmasiAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminMenungguKonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetMenungguKonfirmasi?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminMenungguKonfirmasiAction`, res.data);

                dispatch(savedAdminMenungguKonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN MENUNGGU KONFIRMASI TERFILTER DAN TERSORTIR -- GET A3B
export const getAdminFilterMenungguKonfirmasiAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminFilterMenungguKonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminFilterMenungguKonfirmasi${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminFilterMenungguKonfirmasiAction`, res.data);

                dispatch(savedAdminMenungguKonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN DIPROSES -- GET A4A
export const getAdminDiprosesAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminDiprosesAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetDiproses?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminDiprosesAction`, res.data);
                dispatch(savedAdminDiprosesAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN MENUNGGU KONFIRMASI TERFILTER DAN TERSORTIR -- GET A4B
export const getAdminFilterDiprosesAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminFilterDiprosesiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminFilterDiproses${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminFilterDiprosesiAction`, res.data);

                dispatch(savedAdminDiprosesAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN DIKIRIM -- GET A5A
export const getAdminDikirimAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminDikirimAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetDikirim?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminDikirimAction`, res.data);
                dispatch(savedAdminDikirimAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN DIKIRIM TERFILTER DAN TERSORTIR -- GET A5B
export const getAdminFilterDikirimAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminFilterDikirimAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminFilterDikirim${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminFilterDikirimAction`, res.data);

                dispatch(savedAdminDikirimAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN PESANAN DIKONFIRMASI -- GET A6A
export const getAdminPesananDikonfirmasiAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminPesananDikonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetPesananDikonfirmasi?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminPesananDikonfirmasiAction`, res.data);
                dispatch(savedAdminPesananDikonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN PESANAN DIKONFIRMASI TERFILTER DAN TERSORTIR -- GET A6B
export const getAdminFilterPesananDikonfirmasiAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminFilterPesananDikonfirmasiAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminFilterPesananDikonfirmasi${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminFilterPesananDikonfirmasiAction`, res.data);

                dispatch(savedAdminPesananDikonfirmasiAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN DIPROSES -- GET A7A
export const getAdminDibatalkanAction = (page = 1) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminDibatalkanAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminGetDibatalkan?_page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminDibatalkanAction`, res.data);
                dispatch(savedAdminDibatalkanAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* GET TRANSAKSI ADMIN MENUNGGU KONFIRMASI TERFILTER DAN TERSORTIR -- GET A7B
export const getAdminFilterDibatalkanAction = (query) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`getAdminFilterDibatalkanAction tokenIdUser`, token);

            if (token) {
                let res = await Axios.get(`${API_URL}/transaction/adminFilterDibatalkan${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data getAdminFilterDibatalkanAction`, res.data);

                dispatch(savedAdminDibatalkanAction(res.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

//* UPDATE TRANSACTION STATUS ONLY
export const updateTransactionStatusOnlyAction = (idTransaction, newTransactionStatus) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            if (token) {
                let res = await Axios.patch(`${API_URL}/transaction/adminEditTransactionStatusOnly/${idTransaction}`, {
                    newTransactionStatus
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data updateTransactionStatusOnlyAction`, res.data);

                dispatch(getTransactionAction());
                dispatch(getTransactionAdminAction());
                dispatch(getUserValidasiResepAction());
                dispatch(getUserMenungguPembayaranAction());
                dispatch(getUserDiprosesAction());
                dispatch(getUserDikirimAction());
                dispatch(getUserPesananDikonfirmasiAction());
                dispatch(getAdminValidasiResepAction());
                dispatch(getAdminMenungguPembayaranAction());
                dispatch(getAdminMenungguKonfirmasiAction());
                dispatch(getAdminDiprosesAction());
                dispatch(getAdminDikirimAction());
                dispatch(getUserDibatalkanAction());
                dispatch(getAdminDibatalkanAction());
                
            }

        } catch (error) {
            console.log(error);
        }
    }
}

//* CANCELLING ORDER ACTION ==> UPDATE STATUS DAN STOK
export const cancellingOrderAction = (idTransaction, newTransactionStatus) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            if (token) {
                let res = await Axios.patch(`${API_URL}/transaction/adminCancelingTheOrder/${idTransaction}`, {
                    newTransactionStatus
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data cancellingOrderAction`, res.data);

                dispatch(getTransactionAction());
                dispatch(getTransactionAdminAction());
                dispatch(getUserDibatalkanAction());
                dispatch(getAdminDibatalkanAction());

            }

        } catch (error) {
            console.log(error);
        }
    }
}

//* USER CONFIRM RECEIVING THE PACKAGE ==> UPDATE STATUS DAN PRODUCTHISTORY
export const confirmReceivePackageAction = (idTransaction, newTransactionStatus) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("tokenIdUser");

            if (token) {
                let res = await Axios.patch(`${API_URL}/transaction/userConfirmReceivingThePackage/${idTransaction}`, {
                    newTransactionStatus
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                //^ cek isi res.data
                console.log(`res.data confirmReceivePackageAction`, res.data);

                dispatch(getTransactionAction());
                dispatch(getTransactionAdminAction());
                dispatch(getUserPesananDikonfirmasiAction());
                dispatch(getAdminPesananDikonfirmasiAction());

            }

        } catch (error) {
            console.log(error);
        }
    }
}