import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import AccorAddressComponent from "../../Components/Users/AccorAddress";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import { getCartAction } from "../../Redux/Actions/cartActions";
import { API_URL, BE_URL } from "../../helper";
import { getAddress } from "../../Redux/Actions/addressActions";
import { getProvinceRajaOngkir } from "../../Redux/Actions/getProvinceActions";
import { getCostActions2 } from "../../Redux/Actions/getCostActions";
import { getTransactionAction } from "../../Redux/Actions/transactionActions";
import {
    Box,
    Divider,
    VStack,
    Center,
    Stack,
    Image,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    Radio,
    RadioGroup,
    useMediaQuery
} from "@chakra-ui/react";

import { TiArrowBack } from "react-icons/ti";
import { TiShoppingCart } from "react-icons/ti";
import { ImLocation2 } from "react-icons/im";
import { MdDeliveryDining } from "react-icons/md";

const CheckoutPage = (props) => {

    // * untuk warnain dan atur size icon kembali ke keranjang saat di mobile phone display
    let iconStyles = { color: "var(--colorSix)", fontSize: "1.5em" };

    // * media query
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

    // * assign function
    const [currentToast, newToast] = useToastHook();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state, search } = useLocation();

    //^ check state dari hasil navigate
    // console.log(`checkout pg-state dari page cart ${state}`);

    //^ STATE MANAGEMENT
    const [subTotalAllCartItems, setSubTotalAllCartItems] = useState(0);
    const [idAddressForOngkir, setIdAddressForOngkir] = useState(null);
    const [addressForOngkir, setAddressForOngkir] = useState("");
    const [idProvinceForOngkir, setIdProvinceForOngkir] = useState(null);
    const [idCityForOngkir, setIdCityForOngkir] = useState(null);
    const [receiverNameForOngkir, setReceiverNameForOngkir] = useState("");
    const [receiverPhoneForOngkir, setReceiverPhoneForOngkir] = useState("");
    const [labelForOngkir, setLabelForOngkir] = useState("");
    const [ongkir, setOngkir] = useState(0);
    const [total, setTotal] = useState(0);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
    const [isTambahAlamat, setIsTambahAlamat] = useState(0);
    const [isEditedAlamat, setIsEditedAlamat] = useState(null);
    const [radioDelivery, setRadioDelivery] = useState("jne");
    const [deliveryDropdownValue, setDeliveryDropdownValue] = useState("null");

    const { databaseCart, getCost, getCost2 } = useSelector((state) => {
        if (idCityForOngkir > 0) {
            return {
                databaseCart: state.cartReducers.cart.filter(val => val.isActive == "false"),
                getCost: state.getCostReducers.getCost
            }
        } else if (idCityForOngkir > 0 && getCost.length > 0) {
            return {
                databaseCart: state.cartReducers.cart.filter(val => val.isActive == "false"),
                getCost2: state.getCostReducers.getCost2
            }
        } else {
            return {
                databaseCart: state.cartReducers.cart.filter(val => val.isActive == "false"),
            }
        }
    })

    //^ check isi databaseCart
    // console.log(`isi state databaseCart`, databaseCart);
    // console.log(`isi state getCost`, getCost);
    // console.log(`isi state getCost2`, getCost2);

    // & component did mount
    useEffect(() => {
        handleSubTotal();
        dispatch(getAddress());
        dispatch(getProvinceRajaOngkir());

    }, [idAddressForOngkir, ongkir, total])

    // & btn onclick kembali ke page Cart
    const btnBackToCart = () => {

        setLoadingStatus(true);

        let arrayIdCart = state
        // console.log(`arrayIdCart onCLick btnBackToCart ${arrayIdCart}`)

        if (arrayIdCart.length > 0) {
            // console.log(`arrayIdCart.length > 0`);

            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            // console.log(`btnBackToCart tokenIdUser`, token);

            if (token) {
                Axios.post(`${API_URL}/cart/returnStock`, {
                    arrayIdCart
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    // console.log("isi res.data pas returnToCart", res.data);
                    dispatch(getCartAction());
                    navigate("/cart");
                    setLoadingStatus(false);
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    // & untuk show subTotal dan total berdasarkan CartItem yang dicentang / checkout
    const handleSubTotal = () => {
        // & untuk show subTotal dan total berdasarkan CartItem yang dicentang / checkout
        let temp = 0
        databaseCart.map((valueCart, indexCart) => {
            for (let i = 0; i < state.length; i++) {
                if (valueCart.idCart == state[i]) {
                    temp += valueCart.subTotal
                }
            }
            return temp
        })
        setSubTotalAllCartItems(temp);
        handleTotalPaymentWithoutAdmin();
    }

    // & untuk ambil alamat terpilih dari AccorAddressComponent
    const handleCallbackToChild = (idAddress, address, idProvince, idCity, receiverName, receiverPhone, label) => {
        // console.log(`isi handleCallbackToChild`, idAddress, address, idProvince, idCity, receiverName, receiverPhone, label);

        setLabelForOngkir(label);
        setReceiverNameForOngkir(receiverName);
        setReceiverPhoneForOngkir(receiverPhone);
        setIdAddressForOngkir(idAddress);
        setAddressForOngkir(address);
        setIdProvinceForOngkir(idProvince);
        setIdCityForOngkir(idCity);

        if (idCity > 0) {
            getCostRajaOngkir2();
        }

    }

    const getCostRajaOngkir2 = async () => {
        try {
            // console.log(`idCityForOngkir`, idCityForOngkir);

            if (idCityForOngkir > 0) {
                // console.log(`getCostRajaOngkir 2 jalan`)
                let res = await Axios.get(`${API_URL}/rajaOngkir/getCost2`, {
                    headers: {
                        kota: idCityForOngkir
                    }
                })
                if (res.data) {
                    // console.log(`RES DATA GETCOST2 RAJA ONGKIR`, res.data.dataOngkir);
                    dispatch(getCostActions2(res.data.dataOngkir));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // & untuk ambil idAddress kalau ada alamat yg diedit
    const handleCallbackToChildEditedAddress = (idAddress) => {
        setIsEditedAlamat(idAddress);
    }

    // & untuk cancel proses tambah alamat baru
    const handleCallbackToChildNewAddress = () => {
        setIsTambahAlamat(0);
    }

    // & onClick btn tambah alamat akan kasih notif kalau ada alamat yg diedit belum disave atau alamat baru belum disave. Kalau 2 kondisi itu ga ditemukan akan setState tambah alamat jadi 1
    const btnTambahAlamat = () => {

        if (isEditedAlamat) {
            newToast({
                title: `Update Anda Belum Tersimpan`,
                description: "Simpan dahulu pembaharuan alamat Anda",
                status: 'warning'
            })
        } else if (!isTambahAlamat) {
            setIsTambahAlamat(1)
        } else {
            newToast({
                title: `Alamat Baru Belum Tersimpan`,
                description: "Simpan dahulu alamat terbaru Anda",
                status: 'warning'
            })
        }
    }

    // & onCLick untuk simpan alamat yang terpilih, kalau sudah pernah pilih alamat saat onCLick meskipun ga melakukan pemilihan lagi by default akan pilih alamat yg pernah dipilih itu
    const btnSimpan = async () => {
        try {
            if (isEditedAlamat) {
                newToast({
                    title: `Update Anda Belum Tersimpan`,
                    description: "Simpan dahulu pembaharuan alamat Anda",
                    status: 'warning'
                })
            } else if (isTambahAlamat) {
                newToast({
                    title: `Alamat Baru Belum Tersimpan`,
                    description: "Simpan dahulu alamat terbaru Anda",
                    status: 'warning'
                })
            } else if (idAddressForOngkir) {

                // console.log(`DARI ACCORDION idAddress ${idAddressForOngkir}, address ${addressForOngkir}, idProvince ${idProvinceForOngkir}, idCity ${idCityForOngkir}, receiverName ${receiverNameForOngkir}, receiverPhone ${receiverPhoneForOngkir}, label ${labelForOngkir}`);

                setIsTambahAlamat(0);
                setIsModalAddressOpen(false);

                if (idCityForOngkir) {
                    // console.log(`ada idCityForOngkir nya untuk dioper ke getCost2`);
                    let res = await Axios.get(`${API_URL}/rajaOngkir/getCost2`, {
                        headers: {
                            kota: idCityForOngkir
                        }
                    })
                    if (res.data) {
                        // console.log(`RES DATA GETCOST2 RAJAONGKIR`, res.data);
                        dispatch(getCostActions2(res.data));
                    }
                } else {
                    alert('else')
                }


            } else {
                // console.log(`idAddressForOngkir`, idAddressForOngkir)
                newToast({
                    title: `Alamat Belum Terpilih`,
                    description: "Pilih dahulu alamat yang ingin dituju",
                    status: 'warning'
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // & onChange radio button yg akan setState value radio, value dropdown = null per pergantian radio, value ongkir = 0, aktifin hitung ulang angka total
    const handleDeliveryMethodRadio = (selectedRadioMethod) => {
        setRadioDelivery(selectedRadioMethod);
        setDeliveryDropdownValue("null");
        setOngkir(0);
        handleTotalPaymentWithoutAdmin();
        getCostRajaOngkir2();
    }

    // & onChange dropdown metode pengiriman yg akan setState value dropdown dan ongkir per pergantian dropdown, aktifin hitung ulang angka total
    const handleDeliveryMethodDropdown = (selectedDropdownMethod) => {
        setDeliveryDropdownValue(selectedDropdownMethod)
        if (selectedDropdownMethod == "null") {
            setOngkir(0);
            handleTotalPaymentWithoutAdmin();
            newToast({
                title: `Metode Pengiriman Belum Dipilih`,
                description: "Metode pengiriman tidak boleh kosong",
                status: 'warning'
            })
        } else {
            setOngkir(parseInt(selectedDropdownMethod.split("-")[1]));
            handleTotalPaymentWithoutAdmin();
        }
    }

    // & hitung ulang angka total pembayaran
    const handleTotalPaymentWithoutAdmin = () => {
        setTotal(subTotalAllCartItems + ongkir);
    }

    // & printList metode pengririman berdasarkan onChange radio button
    const printDelivery = (radioDelivery) => {
        if (getCost != undefined) {

            // console.log(`isi getCost di printDelivery`, getCost);
            // console.log(`isi getCost2 di printDelivery`, getCost2);
            let arrayDelivery = getCost[radioDelivery];
            // console.log(`isi arrayDelivery`, arrayDelivery);

            if (arrayDelivery != undefined) {

                return arrayDelivery.map((valueDelivery, indexDelivery) => {
                    return (<option
                        key={indexDelivery}
                        value={`${valueDelivery.description}-${valueDelivery.cost[0].value}`}
                    >
                        <Text
                            className="font-brand"
                        >
                            {
                                valueDelivery.cost[0].etd.toLowerCase().includes("hari")
                                    ?
                                    <>
                                        {valueDelivery.service}--Rp {valueDelivery.cost[0].value.toLocaleString()}--Estimasi terkirim dalam waktu {valueDelivery.cost[0].etd.toLowerCase()}
                                    </>
                                    :
                                    <>
                                        {valueDelivery.service}--Rp {valueDelivery.cost[0].value.toLocaleString()}--Estimasi terkirim dalam waktu {valueDelivery.cost[0].etd.toLowerCase()} hari
                                    </>
                            }
                        </Text>
                    </option>
                    )
                })

            }

        } else if (getCost2 != undefined) {

            // console.log(`isi getCost2 di printDelivery`, getCost2);
            let arrayDelivery = getCost2[radioDelivery];
            // console.log(`isi arrayDelivery`, arrayDelivery);

            if (arrayDelivery != undefined) {
                return arrayDelivery.map((valueDelivery, indexDelivery) => {
                    return (<option
                        key={indexDelivery}
                        value={`${valueDelivery.description}-${valueDelivery.cost[0].value}`}
                    >
                        <Text
                            className="font-brand"
                        >
                            {
                                valueDelivery.cost[0].etd.toLowerCase().includes("hari")
                                    ?
                                    <>
                                        {valueDelivery.service}--Rp {valueDelivery.cost[0].value.toLocaleString()}--Estimasi terkirim dalam waktu {valueDelivery.cost[0].etd.toLowerCase()}
                                    </>
                                    :
                                    <>
                                        {valueDelivery.service}--Rp {valueDelivery.cost[0].value.toLocaleString()}--Estimasi terkirim dalam waktu {valueDelivery.cost[0].etd.toLowerCase()} hari
                                    </>
                            }
                        </Text>
                    </option>
                    )
                })
            }
        }
    }

    //& onClick akan simpan info alamat dan ongkir terpilih, navigate ke transactionlist tab menunggu pembayaran
    const btnBayar = async() => {
        setLoadingStatus(true);

        let arrayIdCart = state
        // console.log(`arrayIdCart onCLick btnBayar ${arrayIdCart}`)
        // console.log(`idAddressForOngkir`, idAddressForOngkir);
        // console.log(`ongkir`, ongkir)

        if (arrayIdCart.length > 0) {
            // console.log(`arrayIdCart.length > 0`);

            let token = localStorage.getItem("tokenIdUser");

            //^ cek ada token atau tidak
            console.log(`btnBayar tokenIdUser`, token);

            if (token) {
                Axios.post(`${API_URL}/transaction/addNormalTransaction`, {
                    arrayIdCart,
                    idAddress: idAddressForOngkir,
                    prescription: "null",
                    transactionStatus: "Menunggu Pembayaran",
                    transferReceipt: "null",
                    freightCost: ongkir
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    // console.log("isi res.data pas btnBayar", res.data);
                    dispatch(getTransactionAction());
                    navigate("/transactionlist");
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
                <div
                    className="d-flex align-items-center justify-content-between"
                >
                    <Text
                        className="col-6 col-md-6 h3"
                        py={{ base: 0, md: 2 }}
                    >
                        Checkout
                    </Text>
                    <Button
                        className="col-12 col-md-6 d-none d-md-flex btn-def"
                        width={200}
                        isLoading={loadingStatus}
                        loadingText=""
                        onClick={btnBackToCart}
                    >
                        Kembali ke Keranjang
                    </Button>
                    <Box
                        width="auto"
                        borderWidth={1}
                        borderRadius={5}
                        borderColor="var(--colorSix)"
                        className="d-flex d-md-none col-6"
                        onClick={btnBackToCart}
                    >
                        <TiArrowBack
                            style={iconStyles}
                        />
                        <TiShoppingCart
                            style={iconStyles}
                        />
                    </Box>
                </div>

                <Center>
                    <Box
                        w={isSmallScreen ? "75%" : "50%"}
                        className="shadow-sm"
                        style={{ backgroundColor: "var(--colorTwo)" }}
                    >
                        {/* ❗❗❗ Obat-obat dari Cart page yang akan dibeli: productName, productPicture, purchaseQuantity, subTotal */}
                        {databaseCart.map((valueCart, indexCart) => {
                            for (let i = 0; i < state.length; i++) {
                                if (valueCart.idCart == state[i]) {
                                    return (
                                        <Box
                                            key={valueCart.idCart}
                                            display="flex"
                                            alignItems="center"
                                            p={2}
                                        >
                                            <div
                                                className="col-12 d-flex align-items-start justify-content-between"
                                            >
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                >
                                                    <Image
                                                        borderRadius='xl'
                                                        boxSize='50px'
                                                        src={BE_URL + valueCart.productPicture}
                                                        alt='...'
                                                        className="d-md-flex d-none"
                                                    />
                                                    <Box>
                                                        <Text
                                                            className="font-brand"
                                                        >
                                                            {valueCart.productName}
                                                        </Text>
                                                        <Text
                                                            className="font-brand"
                                                            color='var(--colorFour)'
                                                            fontSize={12}
                                                        >
                                                            {valueCart.cartQuantity}  {valueCart.stockType}
                                                        </Text>
                                                    </Box>
                                                </Box>
                                                <Text
                                                    className="font-brand"
                                                >
                                                    Rp {valueCart.subTotal.toLocaleString()}
                                                </Text>
                                            </div>
                                        </Box>
                                    )
                                }
                            }
                        })
                        }
                        <Divider
                            variant="dashed"
                            borderColor={"var(--colorSeven)"}
                            my={2}
                        />
                        <div
                            className="col-12 d-flex align-items-start justify-content-between"
                        >
                            <Text
                                className="font-brand"
                                ps={2}
                            >
                                Sub total
                            </Text>
                            <Text
                                className="font-brand"
                                pe={2}
                            >
                                Rp {subTotalAllCartItems.toLocaleString()}
                            </Text>

                        </div>
                        <div
                            className="col-12 d-flex align-items-start justify-content-between"
                        >
                            <Text
                                className="font-brand"
                                ps={2}
                            >
                                Ongkos kirim
                            </Text>
                            <Text
                                className="font-brand"
                                pe={2}
                            >
                                Rp {ongkir.toLocaleString()}
                            </Text>
                        </div>
                        <Divider
                            variant="solid"
                            borderColor={"var(--colorSeven)"}
                            my={2}
                        />
                        <div
                            className="col-12 d-flex align-items-start justify-content-between"
                        >
                            <Text
                                className="font-brand"
                                ps={2}
                                as="b"
                            >
                                Total
                            </Text>
                            <Text
                                className="font-brand"
                                pe={2}
                                as="b"
                            >
                                Rp {(subTotalAllCartItems + ongkir).toLocaleString()}
                            </Text>
                        </div>
                        <Divider
                            variant="solid"
                            borderColor={"var(--colorSeven)"}
                            my={2}
                        />
                        {/*❗❗❗ Alamat Pengiriman */}
                        <Box>

                            <Modal
                                isOpen={isModalAddressOpen}
                                onOverlayClick={() => setIsModalAddressOpen(isModalAddressOpen)}
                                isCentered
                                size={isSmallScreen ? "md" : "xl"}
                            >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader
                                        className="h5b"
                                    >
                                        Pilih Alamat
                                    </ModalHeader>
                                    <ModalBody>

                                        <AccorAddressComponent
                                            handleSendingToParent={handleCallbackToChild}
                                            handleSendingToParentNewAddress={handleCallbackToChildNewAddress}
                                            handleSendingToParentEditedAddress={handleCallbackToChildEditedAddress}
                                            isTambahAlamat={isTambahAlamat}
                                        />

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            onClick={btnTambahAlamat}
                                            className="btn-def"
                                            width={150}
                                            me={2}
                                        >
                                            Tambah Alamat
                                        </Button>
                                        <Button
                                            onClick={btnSimpan}
                                            className="btn-def_second"
                                            width={150}
                                        >
                                            Simpan
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            {/* ❗❗❗ end of Alamat Pengiriman */}

                            <Box
                                display="flex"
                                alignItems="normal"
                                justifyContent="space-between"
                                p={2}
                            >
                                <VStack
                                    alignItems="start"
                                >
                                    <Text
                                        className="font-brand"
                                        as="b"
                                    >
                                        Alamat Pengiriman
                                    </Text>
                                    {idAddressForOngkir
                                        ?
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            className="font-brand"
                                            as="cite"
                                        >
                                            <Text>
                                                {receiverNameForOngkir}
                                            </Text>
                                            <Text>
                                                {receiverPhoneForOngkir}
                                            </Text>
                                            <Text>
                                                {addressForOngkir}
                                            </Text>
                                        </Box>
                                        :
                                        <Text
                                            className="font-brand"
                                            as="cite"
                                        >
                                            Pilih alamat penerima
                                        </Text>
                                    }
                                </VStack>
                                <Button
                                    p={2}
                                    color="var(--colorSix)"
                                    variant="ghost"
                                    className="iconFirst"
                                    _hover={{ backgroundColor: "var(--colorTwo)" }}
                                    onClick={() => setIsModalAddressOpen(!isModalAddressOpen)}
                                >
                                    <VStack
                                        alignItems="center"
                                    >
                                        <Text className="font-brand d-none d-md-flex" as="b">
                                            Ubah
                                        </Text>
                                        <ImLocation2
                                            fontSize="1.5em"
                                        />
                                    </VStack>
                                </Button>
                            </Box>
                            <Divider
                                borderColor={"var(--colorSeven)"}
                                my={2}
                            />
                            {/* ❗❗❗ Metode Pengiriman */}
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                ps={2}
                            >
                                <Text
                                    className="font-brand"
                                    as="b"
                                >
                                    Metode Pengiriman
                                </Text>
                                <Box
                                    pe={[4, 4, 5, 6]}
                                    py={2}
                                >
                                    <MdDeliveryDining
                                        fontSize="1.5em"
                                        color="var(--colorSix)"
                                        alignItems="center"
                                    />
                                </Box>
                            </Box>
                            <RadioGroup
                                onChange={(eRadio) => handleDeliveryMethodRadio(eRadio)}
                                value={radioDelivery}
                                ps={2}
                                pb={2}
                            >
                                <Stack direction="row">
                                    <Radio colorScheme="red" name="deliveryList" size="sm" value="jne">JNE</Radio>
                                    <Radio colorScheme="red" name="deliveryList" size="sm" value="pos">POS</Radio>
                                    <Radio colorScheme="red" name="deliveryList" size="sm" value="tiki">TIKI</Radio>
                                </Stack>
                            </RadioGroup>
                            <Select
                                px={2}
                                alignItems="left"
                                className="font-brand"
                                variant="filled"
                                style={{ fontStyle: "italic" }}
                                value={deliveryDropdownValue}
                                onChange={(e) => handleDeliveryMethodDropdown(e.target.value)}
                            >
                                <option
                                    value="null"
                                >
                                    Pilih metode pengiriman
                                </option>
                                {getCost != undefined || getCost2 != undefined ?
                                    printDelivery(radioDelivery) : null}
                            </Select>

                            <Divider
                                borderColor={"var(--colorSeven)"}
                                my={2}
                            />

                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                                p={2}
                            >
                                <Button
                                    className="btn-def_second"
                                    width={150}
                                    mb={2}
                                    loadingStatus={loadingStatus}
                                    onClick={btnBayar}
                                >
                                    Bayar
                                </Button>
                            </Box>

                        </Box>
                    </Box>
                </Center >

            </div >
        </>
    )

}

export default CheckoutPage;