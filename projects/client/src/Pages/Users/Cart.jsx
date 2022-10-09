import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useToastHook } from "../../Components/CustomToast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemComponent from "../../Components/Users/CartItem";
import NavbarComponent from "../../Components/Users/Navbar";
import { getCartAction } from "../../Redux/Actions/cartActions";
import { API_URL } from "../../helper";
import {
    Box,
    Divider,
    Center,
    Text,
    Button,
} from "@chakra-ui/react";

const CartPage = (props) => {

    //* assign function
    const navigate = useNavigate();
    const [currentToast, newToast] = useToastHook();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartAction());

    }, [])

    //^ STATE MANAGEMENT
    const [subTotalAllCartItems, setSubTotalAllCartItems] = useState(0);
    const [arrayIdCart, setArrayIdCart] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const { databaseCart } = useSelector((state) => {
        return {
            databaseCart: state.cartReducers.cart.filter(val=>val.isActive=="true"),
        }
    })

    //^ check isi databaseCart
    // console.log(`databaseCart`, databaseCart);

    const handleCallbackToChild = (subTotalData = 0, selectedIdCart) => {
        setSubTotalAllCartItems(subTotalData);
        setArrayIdCart(selectedIdCart);
    };

    // console.log(`arrayIdCart cartPage ${arrayIdCart}`);
    // console.log(`typeof arrayIdCart di cartPage ${typeof (arrayIdCart)}`);

    const btnCheckout = () => {
        setLoadingStatus(true);
        //idCart yang terselect, isActive diubah jd false, subTotal dijumlah semua
        // console.log(`subTotal ${subTotalAllCartItems}`);
        // console.log(`arrayIdCart onCLick btnCheckout ${arrayIdCart}`);

        if (arrayIdCart.length == 0) {
            // console.log(`arrayIdCart ${arrayIdCart}`);

            setLoadingStatus(false);
            newToast({
                title: `Informasi Tidak Lengkap`,
                description: "Pilih dahulu item keranjang sebelum melakukan checkout",
                status: 'error'
            })
        } else {

            // console.log(`arrayIdCart onClick btnCheckout`, arrayIdCart);

            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            // console.log(`btnCheckout tokenIdUser`, token);

            if (token) {
                Axios.post(`${API_URL}/cart/checkout`, {
                    arrayIdCart
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    // console.log("isi res.data pas checkout", res.data);
                    dispatch(getCartAction());
                    navigate("/checkout", { state: arrayIdCart });
                    setLoadingStatus(false);
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    return (
        <>
            <Box boxShadow='md'>
                <NavbarComponent />
            </Box>
            <div className="container py-3">
                <Text
                    className="h3"
                    py={{ base: 0, md: 2 }}
                >
                    Keranjang
                </Text>

                <div className="row mx-auto">
                    <div
                        className="pt-2 border-0 rounded-2 shadow-sm col-12 col-xl-9 order-1"
                    >

                        <CartItemComponent
                            dbCart={databaseCart}
                            handleCallback={handleCallbackToChild}
                        />

                    </div>

                    <div
                        className="pt-2 border-0 rounded-2 shadow-sm col-12 col-xl-3 order-2"
                    >
                        <Center
                            pt={3}
                        >
                            <Button
                                className="btn-def"
                                width={250}
                                onClick={() => navigate("/productList")}
                            >
                                Tambah Produk Lainnya
                            </Button>
                        </Center>

                        <Divider
                            className="py-2"
                            variant="dashed"
                        />

                        <div
                            className="col-12 d-flex align-items-center justify-content-between py-3"
                        >

                            <Text className="font-brand" as='b'>
                                Total
                            </Text>

                            <Text className="font-brand" as='b'>
                                Rp {subTotalAllCartItems.toLocaleString()}
                            </Text>

                        </div>

                        <Center
                            py={3}
                        >
                            <Button
                                className="btn-def_second"
                                width={250}
                                onClick={btnCheckout}
                                isLoading={loadingStatus}
                                loadingText=""
                            >
                                Checkout Keranjang
                            </Button>
                        </Center>

                    </div>
                </div>


            </div>
        </>
    )

}

export default CartPage;