import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useToastHook } from "../CustomToast";
import { API_URL } from "../../helper";
import { getAddress, getAddressActions } from "../../Redux/Actions/addressActions";
import { getProvinceRajaOngkir, getProvinceActions2 } from "../../Redux/Actions/getProvinceActions";
import { getCityRajaOngkir, getCityActions2 } from "../../Redux/Actions/getCityActions";
import { getCostRajaOngkir } from "../../Redux/Actions/getCostActions";
import {
    Box,
    Text,
    Input,
    InputGroup,
    InputLeftAddon,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Select,
    Tooltip,
} from "@chakra-ui/react";

import { FaEdit } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const AccorAddressComponent = (props) => {

    //* assign function
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //& component did mount
    useEffect(() => {
        dispatch(getAddress())
        dispatch(getProvinceRajaOngkir())
        getProvinceRajaOngkir2()
    }, [])

    //^ STATE MANAGEMENT
    const [currentToast, newToast] = useToastHook();
    const [selectedIdAddress, setSelectedIdAddress] = useState(null);
    const [editedIdAddress, setEditedIdAddress] = useState(null);
    const [isAccordionDisabled, setIsAccordionDisabled] = useState(false);
    const [newReceiverName, setNewReceiverName] = useState("");
    const [newReceiverPhone, setNewReceiverPhone] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newProvince, setNewProvince] = useState("");
    const [newIdProvince, setNewIdProvince] = useState(0);
    const [newCity, setNewCity] = useState("");
    const [newIdCity, setNewIdCity] = useState(0);
    const [newPostalCode, setNewPostalCode] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const [accordionIndex, setAccordionIndex] = useState(null);
    const [idCityForOngkir, setIdCityForOngkir] = useState(null);

    const { address, phone, idUser, name, token, getProvince, getProvince2, getCity, getCity2, getCost, getCost2 } = useSelector((state) => {

        if (accordionIndex != null && idCityForOngkir > 0) {
            return {
                address: state.addressReducers.address,
                phone: state.userReducers.phone,
                idUser: state.userReducers.idUser,
                name: state.userReducers.name,
                token: state.userReducers.token,
                getProvince: state.getProvinceReducers.getProvince,
                getProvince2: state.getProvinceReducers.getProvince2,
                getCity: state.getCityReducers.getCity,
                getCity2: state.getCityReducers.getCity2,
                getCost: state.getCostReducers.getCost,
                getCost2: state.getCostReducers.getCost2,
            }
        } else {
            return {
                address: state.addressReducers.address,
                phone: state.userReducers.phone,
                idUser: state.userReducers.idUser,
                name: state.userReducers.name,
                token: state.userReducers.token,
                getProvince: state.getProvinceReducers.getProvince,
                getProvince2: state.getProvinceReducers.getProvince2,
                getCity: state.getCityReducers.getCity,
                getCity2: state.getCityReducers.getCity2,
            }
        }

    });

    //& untuk print list address per user, kalau user decide edit salah 1 address, input forms diprint di sini jg
    const printAddress = () => {
        return address.map((valueAddress, indexAddress) => {
            if (editedIdAddress == valueAddress.idAddress) {
                return (
                    <AccordionItem
                        key={valueAddress.idAddress}
                    >
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left" className="h6b">
                                    {valueAddress.label.toUpperCase()}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>

                        <AccordionPanel pt={0} pb={2} className="font-brand">

                            <Box
                                display="flex"
                                textAlign="left"
                                justifyContent="space-between"
                            >
                                <InputGroup size="sm">
                                    <InputLeftAddon children="Nama Penerima" width={200} />
                                    <Input
                                        placeholder={valueAddress.receiverName}
                                        defaultValue={valueAddress.receiverName}
                                        width="fit-content"
                                        onChange={(e) => setNewReceiverName(e.target.value)}
                                    />
                                </InputGroup>

                                {/* ❗❗❗ btnSaveEdit untuk save address terupdate */}
                                <Tooltip
                                    hasArrow
                                    label="tekan disini untuk simpan perubahan / batallkan perubahan"
                                    isOpen={true}
                                    placement='right'
                                    backgroundColor="var(--colorEight)"
                                >
                                    <Box
                                        mx={0}
                                        my={0}
                                        display="flex"
                                    >
                                        <MdCheckCircle
                                            onClick={() => btnSaveEdit(valueAddress.idAddress, valueAddress.label, valueAddress.isDefaultAddress)}
                                            className="iconFirst"
                                            size={25}
                                        />

                                        <MdCancel
                                            onClick={btnCancelEdit}
                                            className="iconSecond"
                                            size={25}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>

                            <InputGroup size="sm">
                                <InputLeftAddon children="Nomor Telfon Penerima" width={200} />
                                <Input
                                    placeholder={valueAddress.receiverPhone}
                                    defaultValue={valueAddress.receiverPhone}
                                    width="fit-content"
                                    onChange={(e) => setNewReceiverPhone(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup size="sm">
                                <InputLeftAddon children="Alamat" width={200} />
                                <Input
                                    placeholder={valueAddress.address}
                                    defaultValue={valueAddress.address}
                                    width="fit-content"
                                    onChange={(e) => setNewAddress(e.target.value)}
                                />
                            </InputGroup>

                            {/* ❗❗❗ dalam bentuk dropdown provinsi ❗❗❗ */}
                            <InputGroup size="sm">
                                <InputLeftAddon children="Provinsi" width={200} />
                                <Box
                                    w='185px'
                                >
                                    <Select
                                        placeholder="Pilih Provinsi"
                                        onChange={(e) => handleProvince(e.target.value)}
                                        size='sm'
                                    >
                                        {getProvince.data.map((p) => (
                                            <option
                                                key={p.province}
                                                id={p.province}
                                                value={p.province_id}
                                            >
                                                {p.province}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                            </InputGroup>

                            {/* ❗❗❗ dalam bentuk dropdown city ❗❗❗ */}
                            <InputGroup size="sm">
                                <InputLeftAddon children="Kota" width={200} />
                                {
                                    newIdProvince > 0 ?
                                        <Box
                                            w='185px'
                                        >
                                            <Select
                                                placeholder='Pilih Kota'
                                                onClick={handleCity}
                                                size='sm'
                                            >
                                                {
                                                    getCity.data && getCity.data.map((k) => (
                                                        <option
                                                            key={k.city_id}
                                                            value={k.city_id}
                                                        >
                                                            {k.city_name}
                                                        </option>
                                                    ))
                                                }
                                            </Select>
                                        </Box>
                                        :
                                        <Box
                                            w='185px'
                                        >
                                            <Select
                                                isDisabled
                                                placeholder='Pilih Kota'
                                                size='sm'
                                            >
                                            </Select>
                                        </Box>
                                }
                            </InputGroup>
                            <InputGroup size="sm">
                                <InputLeftAddon children="Kode Pos" width={200} />
                                {
                                    newIdCity > 0 ?
                                        <>
                                            <Input
                                                placeholder={valueAddress.postalCode}
                                                defaultValue={valueAddress.postalCode}
                                                width="fit-content"
                                                onChange={(e) => setNewPostalCode(e.target.value)}
                                                size='sm'
                                                onClick={handleCityName}
                                            />
                                        </>
                                        :
                                        <>
                                            <Input
                                                placeholder={valueAddress.postalCode}
                                                defaultValue={valueAddress.postalCode}
                                                width="fit-content"
                                                onChange={(e) => setNewPostalCode(e.target.value)}
                                                size='sm'
                                                isDisabled
                                            />
                                        </>
                                }
                            </InputGroup>

                        </AccordionPanel>
                    </AccordionItem >
                )
            } else {
                return (
                    <AccordionItem
                        key={valueAddress.idAddress}
                        isDisabled={isAccordionDisabled}

                        onClick={() => btnEachAcordion(valueAddress.idAddress,
                            valueAddress.address,
                            valueAddress.idProvince,
                            valueAddress.idCity,
                            valueAddress.receiverName,
                            valueAddress.receiverPhone,
                            valueAddress.label,
                            indexAddress
                        )}
                    >
                        <h2>
                            <AccordionButton
                                _expanded={{ bg: `var(--colorThree)` }}
                            >
                                <Box flex="1" textAlign="left" className="h6b">
                                    {valueAddress.label.toUpperCase()}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>

                        <AccordionPanel pt={0} pb={2}>
                            <Box
                                display="flex"
                                textAlign="left"
                                justifyContent="space-between"
                                className="font-brand"
                                as="i"
                            >
                                <Text
                                >
                                    {valueAddress.receiverName}
                                </Text>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Text
                                    >
                                        {valueAddress.receiverPhone}
                                    </Text>
                                    <FaEdit
                                        onClick={() => btnEditAddress(valueAddress.idAddress)}
                                        className="iconFirst"
                                        size={17}
                                    />
                                </Box>
                            </Box>
                            <Text
                                className="font-brand"
                                as="i"
                            >
                                {valueAddress.address}, {valueAddress.province}, {valueAddress.city}, {valueAddress.postalCode}
                            </Text>
                        </AccordionPanel>

                    </AccordionItem>
                )
            }
        }
        )
    }

    //& onClick akan buka input forms untuk edit salah 1 alamat yg dipilih
    const btnEditAddress = (idAddress) => {
        // console.log(`idAddress yg akan diedit ${idAddress}`);
        setEditedIdAddress(idAddress);
        setIsAccordionDisabled(!isAccordionDisabled);
        props.handleSendingToParentEditedAddress(idAddress);
    }

    //& onClick accordion lain akan kasih notif kalau alamat yg diedit/ditambah belum disave dulu, kalau ga ada yg pending disave editan/alamat tambahannya, otomatis accordion alamat yg dipilih akan masuk setState dan detilnya muncul 
    const btnEachAcordion = (idAddress, address, idProvince, idCity, receiverName, receiverPhone, label, indexAddress) => {
        // console.log(`idAddress yg akan diselect ${idAddress}`);

        if (editedIdAddress) {
            newToast({
                title: `Update Anda Belum Tersimpan`,
                description: "Simpan dahulu pembaharuan alamat Anda",
                status: 'warning'
            })
        } else if (props.isTambahAlamat == 1) {
            newToast({
                title: `Alamat Baru Belum Tersimpan`,
                description: "Simpan dahulu alamat terbaru Anda",
                status: 'warning'
            })
        } else {
            setAccordionIndex(indexAddress);

            dispatch(getCostRajaOngkir(idCity));

            //* kirim info2 alamat terpilih ke Checkout Page
            if (getCost) {
                setIdCityForOngkir(idCity);
            }

            if (idCityForOngkir == null) {

                props.handleSendingToParent(idAddress, address, idProvince, idCity, receiverName, receiverPhone, label);

            } else {
                props.handleSendingToParent(idAddress, address, idProvince, idCityForOngkir, receiverName, receiverPhone, label);
            }

        }
    }

    const handleProvince = (value) => {
        // console.log(`province baru ${value}`);
        setNewIdProvince(value);
    }

    const handleCity = async (e) => {
        try {
            // console.log(`city baru ${e.target.value}`);
            // console.log(`newIdProvince`, newIdProvince);

            if (newIdProvince > 0) {
                let a = newIdProvince
                let city = getCityRajaOngkir(a)
                dispatch(city)
                if (getCity) {
                    setNewIdCity(e.target.value)
                    { getProvinceRajaOngkir2() }
                }
            } else {
                alert('else')
            }

        } catch (error) {
            alert(error)
        }
    }

    const handleCityName = async (e) => {
        try {
            // console.log(`newIdCity`, newIdCity);
            if (newIdCity > 0) {
                { getCityRajaOngkir2() }
            } else {
                alert('else')
            }
        } catch (error) {
            alert(error)
        }
    }

    const getProvinceRajaOngkir2 = async () => {
        try {
            // console.log(newIdProvince, 'newIdProvince');
            if (newIdProvince > 0) {
                // console.log('Province jalan');
                let res = await Axios.get(`${API_URL}/rajaOngkir/getProvince2`, {
                    headers: {
                        provinceid: newIdProvince
                    }
                })
                if (res.data) {
                    // console.log("RES DATA GET PROVINCE RAJAONGKIR", res.data.namaProvinsi[0])
                    dispatch(getProvinceActions2(res.data.namaProvinsi[0]))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCityRajaOngkir2 = async () => {
        try {
            // console.log("CITY_ID ACTIONS 2", newIdCity);
            if (newIdCity > 0) {
                // console.log(`city2 jalan`);
                let res = await Axios.get(`${API_URL}/rajaOngkir/getCity2`, {
                    headers: {
                        provinceid: newIdProvince,
                        cityid: newIdCity
                    }
                })
                if (res.data) {
                    // console.log("RES DATA GET CITY RAJAONGKIR", res.data.namaKota[0])
                    dispatch(getCityActions2(res.data.namaKota[0]))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    //& onClick akan save address yg sudah diedit
    const btnSaveEdit = async (idAddress, currentLabel, isDefaultAddress) => {
        // console.log(`btnSaveEdit -- getProvince2 dan getCity2`, getProvince2, getCity2);
        // console.log(`btnSaveEdit -- newReceiverName, newReceiverPhone, newAddress, newPostalCode`, newReceiverName, newReceiverPhone, newAddress, newPostalCode);
        try {
            if (editedIdAddress) {
                let token = localStorage.getItem('tokenIdUser');
                let res = await Axios.patch(`${API_URL}/address/editAddress`, {
                    idAddress,
                    label: '',
                    address: newAddress,
                    province: getProvince2,
                    provinceid: newIdProvince,
                    city: getCity2, //ga keambil
                    cityid: newIdCity,
                    postalCode: newPostalCode,
                    //editPostalCode: postalCodeOn
                    receiverName: newReceiverName,
                    receiverPhone: newReceiverPhone,
                    isDefaultAddress
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data) {
                    // console.log(`RES DATA EDIT PROFILE`, res.data);
                    dispatch(getAddressActions(res.data));
                    newToast({
                        title: 'Edit Alamat Berhasil.',
                        description: 'Data pada alamat anda sudah terupdate.',
                        status: 'success'
                    })
                    setEditedIdAddress(null);
                    setIsAccordionDisabled(!isAccordionDisabled);
                    props.handleSendingToParentEditedAddress(null);
                }
            }
        } catch (error) {
            newToast({
                title: 'Edit alamat Tidak Berhasil.',
                description: error.response.data.message,
                status: 'error',
            })
        }
    }

    //& onClick akan cancel pengeditan
    const btnCancelEdit = () => {
        setEditedIdAddress(null);
        setIsAccordionDisabled(!isAccordionDisabled);
        props.handleSendingToParentEditedAddress(null);
    }

    //& onClick akan save address baru yg dimasukkan
    const btnSaveNewAddress = async () => {
        // console.log(`getProvince2 dan getCity2`, getProvince2, getCity2);
        // console.log(`newReceiverName, newReceiverPhone, newAddress, newPostalCode, newLabel`, newReceiverName, newReceiverPhone, newAddress, newPostalCode, newLabel)
        try {
            if (newReceiverName == '' || newReceiverPhone == '' || newAddress == '' || getProvince2 == undefined || getCity2 == undefined || newPostalCode == '' || newLabel == '') {
                newToast({
                    title: `Alamat Baru Belum Lengkap`,
                    description: "Lengkapi dahulu form alamat baru sebelum melakukan penyimpanan",
                    status: 'error'
                })
            } else if (newReceiverPhone.length < 11) {
                newToast({
                    title: 'Tambah Alamat Tidak Berhasil.',
                    description: 'Isi nomor telfon penerima dengan nomor telfon aktif',
                    status: 'error',
                })
            } else {
                // console.log(`${newReceiverName},${newReceiverPhone},${newAddress},${newIdProvince},${newIdCity},${newPostalCode},${newLabel},${getProvince2}, ${getCity2}`);

                let token = localStorage.getItem('tokenIdUser');
                let res = await Axios.post(`${API_URL}/address/addAddress`, {
                    label: newLabel,
                    address: newAddress,
                    province: getProvince2,
                    provinceid: newIdProvince,
                    city: getCity2,
                    cityid: newIdCity,
                    postalCode: newPostalCode,
                    receiverName: newReceiverName,
                    receiverPhone: newReceiverPhone,
                    isDefaultAddress: 'false'
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (res.data) {
                    newToast({
                        description: 'Tambah Alamat Berhasil',
                        status: 'success',
                    })
                    // console.log("res.data FE ADDRESS", res.data)
                    dispatch(getAddressActions(res.data))
                    props.handleSendingToParentNewAddress();
                    setAccordionIndex(null);
                }
            }

        } catch (error) {
            newToast({
                title: 'Tambah Alamat Tidak Berhasil.',
                description: error.response.data.message,
                status: 'error',
            })
        }

    }

    //& onClick akan batalin nambah alamat baru
    const btnCancelNewAddress = () => {
        props.handleSendingToParentNewAddress();
        setAccordionIndex(null);
    }

    return (<Accordion
        onChange={setAccordionIndex}
        index={props.isTambahAlamat == 1 ? address.length : accordionIndex}
    >

        {printAddress()}

        {props.isTambahAlamat == 1
            ?
            <AccordionItem>
                <h2>
                    <AccordionButton
                        _expanded={{ bg: `var(--colorThree)` }}
                    >
                        <Box flex="1" textAlign="left" className="h6b">
                            ALAMAT BARU
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>

                <AccordionPanel pt={0} pb={2} className="font-brand">

                    <Box
                        display="flex"
                        textAlign="left"
                        justifyContent="space-between"
                    >
                        <InputGroup size="sm">
                            <InputLeftAddon children="Nama Penerima" width={200} />
                            <Input
                                placeholder="Nama lengkap penerima"
                                width="fit-content"
                                onChange={(e) => setNewReceiverName(e.target.value)}
                            />
                        </InputGroup>

                        {/* ❗❗❗ btnSaveNewAddress untuk save new address */}
                        <Tooltip
                            hasArrow
                            label="tekan disini untuk simpan alamat baru / batal simpan alamat baru"
                            isOpen={true}
                            placement='right'
                            backgroundColor="var(--colorEight)"
                        >
                            <Box
                                mx={0}
                                my={0}
                                display="flex"
                            >
                                <MdCheckCircle
                                    onClick={btnSaveNewAddress}
                                    className="iconFirst"
                                    size={25}
                                />
                                <MdCancel
                                    onClick={btnCancelNewAddress}
                                    className="iconSecond"
                                    size={25}
                                />
                            </Box>
                        </Tooltip>
                    </Box>

                    <InputGroup size="sm">
                        <InputLeftAddon children="Nomor Telfon Penerima" width={200} />
                        <Input
                            placeholder="Nomor handphone aktif"
                            width="fit-content"
                            onChange={(e) => setNewReceiverPhone(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup size="sm">
                        <InputLeftAddon children="Alamat" width={200} />
                        <Input
                            placeholder="Alamat yang dituju"
                            width="fit-content"
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                    </InputGroup>

                    {/* ❗❗❗ dalam bentuk dropdown provinsi ❗❗❗ */}
                    <InputGroup size="sm">
                        <InputLeftAddon children="Provinsi" width={200} />
                        <Box
                            w='185px'
                        >
                            <Select
                                placeholder="Pilih Provinsi"
                                onChange={(e) => handleProvince(e.target.value)}
                                size='sm'
                            >
                                {getProvince.data.map((p) => (
                                    <option
                                        key={p.province}
                                        id={p.province}
                                        value={p.province_id}
                                    >
                                        {p.province}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                    </InputGroup>

                    {/* ❗❗❗ dalam bentuk dropdown city ❗❗❗ */}
                    <InputGroup size="sm">
                        <InputLeftAddon children="Kota" width={200} />
                        {
                            newIdProvince > 0 ?
                                <Box
                                    w='185px'
                                >
                                    <Select
                                        placeholder="Pilih Kota"
                                        onClick={handleCity}
                                        size='sm'
                                    >
                                        {getCity.data && getCity.data.map((k) => (
                                            <option
                                                key={k.city_id}
                                                value={k.city_id}
                                            >
                                                {k.city_name}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                :
                                <Box
                                    w='185px'
                                >
                                    <Select
                                        isDisabled
                                        placeholder='Pilih Kota'
                                        size='sm'
                                    >
                                    </Select>
                                </Box>
                        }
                    </InputGroup>

                    <InputGroup size="sm">
                        <InputLeftAddon children="Kode Pos" width={200} />
                        {
                            newIdCity > 0 ?
                                <>
                                    <Input
                                        placeholder="Kode pos alamat tujuan"
                                        width="fit-content"
                                        onChange={(e) => setNewPostalCode(e.target.value)}
                                        size='sm'
                                        onClick={handleCityName}
                                    />
                                </>
                                :
                                <>
                                    <Input
                                        placeholder="Kode pos alamat tujuan"
                                        width="fit-content"
                                        onChange={(e) => setNewPostalCode(e.target.value)}
                                        size='sm'
                                        isDisabled
                                    />
                                </>
                        }
                    </InputGroup>

                    <InputGroup size="sm">
                        <InputLeftAddon children="Label" width={200} />
                        <Input
                            size='sm'
                            placeholder="Label alamat baru"
                            width="fit-content"
                            onChange={(e) => setNewLabel(e.target.value)}
                        />
                    </InputGroup>

                </AccordionPanel>
            </AccordionItem >
            :
            null
        }

    </Accordion >)
}

export default AccorAddressComponent;