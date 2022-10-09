import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCartAction } from "../../Redux/Actions/cartActions";
import { getAllMainStockAction } from "../../Redux/Actions/cartActions";
import { API_URL, BE_URL } from "../../helper";
import { useToastHook } from "../../Components/CustomToast";
import {
    Box,
    HStack,
    Image,
    Text,
    Input,
    Checkbox,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useMediaQuery,
    Button,
    Modal,
    ModalHeader,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalOverlay
} from "@chakra-ui/react";

import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";

const CartItemComponent = (props) => {

    //* MEDIA QUERY CHAKRA ❗❗❗
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    //* assign function
    const dispatch = useDispatch();
    const [currentToast, newToast] = useToastHook();

    //^ STATE MANAGEMENT
    const [checkedCartIds, setCheckedCartIds] = useState([]);
    const [qtyHandleQuantity, setQtyHandleQuantity] = useState(0);

    const [isDeletedClicked, setIsDeletedClicked] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [idCartDeleted, setIdCartDeleted] = useState(null);
    const [idStockDeleted, setIdStockDeleted] = useState(null);
    const [openModalPenghapusan, setOpenModalPenghapusan] = useState(false);

    //& component did mount
    useEffect(() => {
        handleToParent();
        dispatch(getAllMainStockAction());
        setIsDeletedClicked(0)

    }, [isDeletedClicked, checkedCartIds, qtyHandleQuantity])

    const { dbMainStock } = useSelector((state) => {
        return {
            dbMainStock: state.cartReducers.mainStock,
        }
    })

    //^ check isi databaseCart
    // console.log(`dbMainStock`, dbMainStock);

    //& supaya qty bisa diinput manual jg
    const handleQty = (e, idCart, idStock) => {
        let newQty = parseInt(e.target.value);

        setQtyHandleQuantity(parseInt(e.target.value))

        //^ cari idProduct untuk di transfer ke BE in case product list ga return idStock
        let selectedIdProduct = dbMainStock.filter(val => val.idStock == idStock)[0];
        selectedIdProduct = selectedIdProduct.idProduct;
        // console.log(`selectedIdProduct`, selectedIdProduct);

        let token = localStorage.getItem("tokenIdUser");

        //^ cek ada token atau tidak
        // console.log(`handleQty tokenIdUser`, token);

        if (token) {
            Axios.patch(`${API_URL}/cart/${idCart}`, {
                idProduct: selectedIdProduct,
                cartQuantity: newQty
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                // console.log("isi res.data pas onChange quantity", res.data);
                dispatch(getCartAction());
                handleToParent();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    //& onClick untuk delete 1 cart item
    const btnDeleteItem = (currentQty, idCart, idStock) => {

        setCurrentQuantity(currentQty);
        setIdCartDeleted(idCart);
        setIdStockDeleted(idStock);
        setOpenModalPenghapusan(!openModalPenghapusan);

        // console.log(`btnDeleteItem diklik`)

    }

    const btnYaDelete = () => {
        setIsDeletedClicked(1);
        //^ cari idProduct untuk di transfer ke BE in case product list ga return idStock
        let selectedIdProduct = dbMainStock.filter(val => val.idStock == idStockDeleted)[0];
        selectedIdProduct = selectedIdProduct.idProduct;
        // console.log(`selectedIdProduct`, selectedIdProduct);

        let token = localStorage.getItem("tokenIdUser");

        //^ cek ada token atau tidak
        // console.log(`handleQty tokenIdUser`, token);

        if (token) {
            Axios.patch(`${API_URL}/cart/delete/${idCartDeleted}`, {
                "idProduct": selectedIdProduct,
                "cartQuantity": currentQuantity
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                // console.log("isi res.data pas delete diklik", res.data);
                dispatch(getCartAction());
                setOpenModalPenghapusan(!openModalPenghapusan);
                newToast({
                    title: "Delete item",
                    description: "Item keranjang terpilih berhasil didelete",
                    status: 'info'
                });
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const btnBatalDelete = () => {
        setIsDeletedClicked(0);
        setCurrentQuantity(0);
        setIdCartDeleted(null);
        setIdStockDeleted(null);
        setOpenModalPenghapusan(!openModalPenghapusan);

    }

    //& onClick akan kurangi jumlah unit per item
    const btnDecreaseQuantity = (currentQty, idCart, idStock) => {
        // console.log(`btnDecreaseQuantity diklik`)

        let temp = currentQty;
        if (temp > 1) {
            temp--;
            // console.log(`new cartQuantity`, temp);
        } else {
            newToast({
                title: "Jumlah minimal",
                description: "Jumlah produk pada keranjang tidak bisa kurang dari 1",
                status: 'warning'
            });

            setCurrentQuantity(currentQty);
            setIdCartDeleted(idCart);
            setIdStockDeleted(idStock);
            setOpenModalPenghapusan(!openModalPenghapusan);
            handleToParent();
        }
        // console.log(`new cartQuantity`, temp);

        //^ cari idProduct untuk di transfer ke BE in case product list ga return idStock
        let selectedIdProduct = dbMainStock.filter(val => val.idStock == idStock)[0];
        selectedIdProduct = selectedIdProduct.idProduct;
        // console.log(`selectedIdProduct`, selectedIdProduct);

        let token = localStorage.getItem("tokenIdUser");

        //^ cek ada token atau tidak
        // console.log(`handleQty tokenIdUser`, token);

        if (token) {
            Axios.patch(`${API_URL}/cart/${idCart}`, {
                idProduct: selectedIdProduct,
                cartQuantity: temp
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                // console.log("isi res.data pas decrease quantity", res.data);
                dispatch(getCartAction());
            }).catch((err) => {
                console.log(err)
            })
        }

    }

    //& onClick akan tambah jumlah unit per item
    const btnIncreaseQuantity = (currentQty, idCart, idStock) => {
        // console.log(`btnIncreaseQuantity diklik`)

        //^ untuk buat proteksi
        let quantityMax = dbMainStock.filter(val => val.idStock == idStock)[0];
        quantityMax = quantityMax.stockQuantity;
        // console.log(`quantityMax`, quantityMax);

        //^ proteksi saat tambah kuantiti per item
        let temp = currentQty;
        if (temp < quantityMax) {
            temp++;
            // console.log(`new cartQuantity`, temp);
        } else {
            newToast({
                title: "Jumlah maksimal",
                description: "Jumlah produk yang ingin dibeli melebihi stok yang ada",
                status: 'warning'
            })
        }

        //^ cari idProduct untuk di transfer ke BE in case product list ga return idStock
        let selectedIdProduct = dbMainStock.filter(val => val.idStock == idStock)[0];
        selectedIdProduct = selectedIdProduct.idProduct;
        // console.log(`selectedIdProduct`, selectedIdProduct);

        //^ untuk hitung ulang subTotal saat ada request increase kuantiti
        let tempSubTotal = 0;

        let token = localStorage.getItem("tokenIdUser");

        //^ cek ada token atau tidak
        // console.log(`handleQty tokenIdUser`, token);

        if (token) {
            Axios.patch(`${API_URL}/cart/${idCart}`, {
                idProduct: selectedIdProduct,
                cartQuantity: temp
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                // console.log("isi res.data pas increase quantity", res.data);
                dispatch(getCartAction());
                handleToParent();

            }).catch((err) => {
                console.log(err)
            })

        }
    }

    const handleToParent = () => {
        //^💚 untuk kirim idCart terpilih dan sum subTotalnya💚
        let tempSubTotal = 0;

        if (!checkedCartIds) {
            // console.log(`checkedCartIds di cartItem comp ${checkedCartIds}`);
            // console.log(`typeof checkedCartIds di cartItem comp ${typeof (checkedCartIds)}`);
            props.handleCallback(0, []);
        } else {
            // console.log(`checkedCartIds di cartItem comp ${checkedCartIds}`);
            // console.log(`typeof checkedCartIds di cartItem comp ${typeof (checkedCartIds)}`);
            props.dbCart.map((valueCart, indexCart) => {
                checkedCartIds.forEach((valueId, indexId) => {
                    if (valueCart.idCart == valueId) {
                        tempSubTotal += valueCart.subTotal
                    }
                })
            });
            props.handleCallback(tempSubTotal, checkedCartIds);
        }
    }

    return (<>

        <Modal
            isOpen={openModalPenghapusan}
            onOverlayClick={() => setOpenModalPenghapusan(!openModalPenghapusan)}
            onClose={() => setOpenModalPenghapusan(!openModalPenghapusan)}
            isCentered
            size="sm"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    className="h5b"
                >
                    Konfirmasi Penghapusan
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    className="font-brand"
                >
                    <div className="mb-3">
                        Anda yakin ingin menghapus item ini?
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <Button
                            className="btn-def"
                            width={55}
                            me={2}
                            onClick={btnYaDelete}
                        >
                            Ya
                        </Button>
                        <Button
                            className="btn-def_second"
                            width={55}
                            onClick={btnBatalDelete}
                        >
                            Tidak
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>


        <Table
            variant="simple"
        >
            <Thead>
                <Tr>
                    <Th width={10}>
                        <HStack spacing={7}>
                            <Checkbox
                                isChecked={
                                    checkedCartIds.length ===
                                    props.dbCart.map(value => value.idCart).length
                                }
                                onChange={() => {
                                    const cartIds = props.dbCart.map(value => value.idCart);
                                    if (checkedCartIds.length === cartIds.length) {
                                        setCheckedCartIds([]);
                                    } else {
                                        setCheckedCartIds(cartIds);
                                    }
                                }}
                            ></Checkbox>
                            <Text className="h6b">
                                Pilih Semua
                            </Text>
                        </HStack>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.dbCart.map((value, index) => (
                    <Tr
                        key={value.idCart}
                        _hover={{ bg: "var(--colorThree)" }}
                        _groupHover={{ bg: "var(--colorThree)" }}
                        cursor="pointer"
                        height={20}
                    >
                        <Td width={1500}>
                            <div className="row">
                                <div className="col-12 col-md-6 order-md-1 d-flex align-items-center">
                                    <Checkbox
                                        className="me-2"
                                        isChecked={checkedCartIds.includes(value.idCart)}
                                        onChange={event => {
                                            event.stopPropagation();
                                            const index = checkedCartIds.indexOf(value.idCart);

                                            if (index > -1) {
                                                setCheckedCartIds([
                                                    ...checkedCartIds.slice(0, index),
                                                    ...checkedCartIds.slice(index + 1)
                                                ]);
                                            } else {
                                                setCheckedCartIds([
                                                    ...checkedCartIds,
                                                    value.idCart
                                                ]);
                                            }

                                        }}
                                    >
                                    </Checkbox>
                                    <Box
                                        me='3'
                                    >
                                        <Image
                                            borderRadius='xl'
                                            boxSize='80px'
                                            src={BE_URL + value.productPicture}
                                            alt={`IMG-${value.productName}`}
                                            className="d-md-flex d-none"
                                        />
                                    </Box>
                                    <Box
                                    >
                                        <Text className="font-brand" as='b'>
                                            {value.productName}
                                        </Text>
                                        <Text className="font-brand" color='var(--colorFour)'>
                                            Per {value.stockType}
                                        </Text>
                                    </Box>
                                </div>
                                <div className="col-12 col-md-6 order-md-2 d-md-flex align-items-center justify-content-between">

                                    <Box
                                        display='flex'
                                        ms={isSmallScreen ? 9 : 0}
                                        my={isSmallScreen ? 2 : 0}
                                    >
                                        <AiOutlineDelete
                                            size={30}
                                            onClick={() => btnDeleteItem(value.cartQuantity, value.idCart, value.idStock)}
                                        />
                                        <AiOutlineMinusSquare
                                            size={30}
                                            onClick={() => btnDecreaseQuantity(value.cartQuantity, value.idCart, value.idStock)}
                                        />
                                        <Input
                                            value={value.cartQuantity}
                                            height="30px"
                                            htmlSize={1}
                                            width='auto'
                                            textAlign='center'
                                            onChange={(e) => handleQty(e, value.idCart, value.idStock)}
                                        />
                                        <AiOutlinePlusSquare
                                            size={30}
                                            onClick={() => btnIncreaseQuantity(value.cartQuantity, value.idCart, value.idStock)}
                                        />
                                    </Box>
                                    <Text
                                        className="font-brand"
                                        as='b'
                                        mx={isSmallScreen ? 9 : 0}
                                    >
                                        Rp {value.subTotal.toLocaleString()}
                                    </Text>

                                </div>
                            </div>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>

    </>)

}

export default CartItemComponent;