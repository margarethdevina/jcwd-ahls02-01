import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { useToastHook } from "../CustomToast";
import { API_URL } from "../../helper";
import { getAddress, getAddressActions } from "../../Redux/Actions/addressActions";
import { getProvinceRajaOngkir, getProvinceActions2 } from "../../Redux/Actions/getProvinceActions";
import { getCityRajaOngkir, getCityActions2 } from "../../Redux/Actions/getCityActions";
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
    Select
} from "@chakra-ui/react";

import { FaEdit } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const AccorAddressComponent = (props) => {

    //* assign function
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { state, search } = useLocation();

    //& component did mount
    useEffect(() => {
        //❗❗❗ fungsi untuk get province dan city dr rajaongkir biar bisa edit alamat & create alamat baru
        dispatch(getAddress())
        dispatch(getProvinceRajaOngkir())
        // getProvinceRajaOngkir2()
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

    //TODO ❗❗❗ ambil dari reducer address
    const { address, phone, idUser, name, token, getProvince, getProvince2, getCity, getCity2 } = useSelector((state) => {
        return {
            address: state.addressReducers.address,
            phone: state.userReducers.phone,
            idUser: state.userReducers.idUser,
            name: state.userReducers.name,
            token: state.userReducers.token,
            getProvince: state.getProvinceReducers.getProvince,
            getProvince2: state.getProvinceReducers.getProvince2,
            getCity: state.getCityReducers.getCity,
            getCity2: state.getCityReducers.getCity2
        }
    });

    const [dbAddress, setDbAddress] = useState([
        {
            idAddress: 1,
            idUser: 6, // pas ada keeplogin ini bisa didelete
            receiverName: "Margareth Devina",
            receiverPhone: "081287908000",
            address: "Jl. Aster VI No. 7",
            province: "Jawa Barat",
            idProvince: 9,
            city: "Bogor",
            idCity: 79,
            postalCode: "16134",
            isDefaultAddress: "true",
            label: "rumah",
        },
        {
            idAddress: 2,
            idUser: 6,
            receiverName: "Margareth",
            receiverPhone: "081287908001",
            address: "Jl. Tanjung Badai",
            province: "Jakarta",
            idProvince: 6,
            city: "Jakarta Pusat",
            idCity: 152,
            postalCode: "10540",
            isDefaultAddress: "false",
            label: "kantor",
        }
    ]);

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
                                <MdCheckCircle
                                    onClick={btnSaveEdit}
                                    className="iconFirst"
                                    size={25}
                                />

                                <MdCancel
                                    onClick={btnCancelEdit}
                                    className="iconSecond"
                                    size={25}
                                />
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
                                                onChange={(e) => handleCity(e.target.value)}
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
                                            // onClick={handleCityName}
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
        console.log(`idAddress yg akan diedit ${idAddress}`);
        setEditedIdAddress(idAddress);
        setIsAccordionDisabled(!isAccordionDisabled);
        props.handleSendingToParentEditedAddress(idAddress);
    }

    //& onClick accordion lain akan kasih notif kalau alamat yg diedit/ditambah belum disave dulu, kalau ga ada yg pending disave editan/alamat tambahannya, otomatis accordion alamat yg dipilih akan masuk setState dan detilnya muncul 
    const btnEachAcordion = (idAddress, address, idProvince, idCity, receiverName, receiverPhone, label, indexAddress) => {
        console.log(`idAddress yg akan diselect ${idAddress}`);

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

            //TODO ❗❗❗ get ongkir dr rajaongkir di sini??? ❗❗❗

            //* kirim info2 alamat terpilih ke Checkout Page
            props.handleSendingToParent(idAddress, address, idProvince, idCity, receiverName, receiverPhone, label);
        }
    }

    // const handleReceiverName = (value) => {
    //     console.log(`receiverName baru ${value}`);
    // }

    // const handleReceiverPhone = (value) => {
    //     console.log(`receiverPhone baru ${value}`);
    // }

    // const handleAddress = (value) => {
    //     console.log(`address baru ${value}`);
    // }

    //TODO ❗❗❗ province baru yang dipilih bakal select idProvince juga
    const handleProvince = (value) => {
        console.log(`province baru ${value}`);
        setNewProvince(value);
    }

    //TODO ❗❗❗ city baru yang dipilih bakal select idCity juga
    const handleCity = (value) => {
        console.log(`city baru ${value}`);
        setNewCity(value);
    }

    // const handlePostalCode = (value) => {
    //     console.log(`postalCode baru ${value}`);
    // }

    //& onClick akan save address yg sudah diedit
    //TODO ❗❗❗ untuk save address terupdate
    const btnSaveEdit = () => {
        console.log(`${newReceiverName},${newReceiverPhone},${newAddress},${newProvince},${newCity},${newPostalCode}`);

        setEditedIdAddress(null);
        setIsAccordionDisabled(!isAccordionDisabled);
        props.handleSendingToParentEditedAddress(null);
    }

    //& onClick akan cancel pengeditan
    const btnCancelEdit = () => {
        setEditedIdAddress(null);
        setIsAccordionDisabled(!isAccordionDisabled);
        props.handleSendingToParentEditedAddress(null);
    }

    //& onClick akan save address baru yg dimasukkan
    const btnSaveNewAddress = () => {

        if (!newReceiverName || !newReceiverName || !newAddress || !newProvince || !newCity || !newPostalCode || !newLabel) {
            newToast({
                title: `Alamat Baru Belum Lengkap`,
                description: "Lengkapi dahulu form alamat baru sebelum melakukan penyimpanan",
                status: 'error'
            })
        } else {
            console.log(`${newReceiverName},${newReceiverPhone},${newAddress},${newProvince},${newCity},${newPostalCode},${newLabel}`);

            props.handleSendingToParentNewAddress();
            setAccordionIndex(null);
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

                        {/* ❗❗❗ btnSaveEdit untuk save address terupdate */}
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
                                        onChange={(e) => handleCity(e.target.value)}
                                        size='sm'
                                    >
                                        {getCity.data && getCity.map((k) => (
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
                                    // onClick={handleCityName}
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

    </Accordion>)
}

export default AccorAddressComponent;