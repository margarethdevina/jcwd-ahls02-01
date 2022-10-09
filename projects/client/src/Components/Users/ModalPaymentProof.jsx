import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import bank1 from "../../Assets/DevImage/LogoBCA.png";
import bank2 from "../../Assets/DevImage/LogoMandiri.png";
import { getTransactionAction,getUserMenungguKonfirmasiAction } from "../../Redux/Actions/transactionActions";
import { API_URL } from "../../helper";
import { useToastHook } from "../../Components/CustomToast";

import {
    Box,
    Image,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    List,
    ListItem,
    ListIcon,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody
} from "@chakra-ui/react";

import { FaCircle } from "react-icons/fa";

const ModalPaymentProofComponent = (props) => {

    //* assign function
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentToast, newToast] = useToastHook();

    //* untuk warnain dan atur size icon kembali ke keranjang saat di mobile phone display
    let iconStyles = { color: "var(--colorFive)", fontSize: "0.5em" };

    //^ STATE MANAGEMENT
    const [isModalPaymentProofOpen, setIsModalPaymentProofOpen] = useState(false);
    const [newImageBukti, setNewImageBukti] = useState(null);
    const inputIdImageBukti = useRef(null);
    const [accordionIndex, setAccordionIndex] = useState(null);
    const [paymentPlusAdminBank, setPaymentPlusAdminBank] = useState(0);
    const [bankInformation] = useState([
        {
            idBank: 1,
            bankName: "bca",
            adminFee: 1500,
            bankImage: bank1
        },
        {
            idBank: 2,
            bankName: "mandiri",
            adminFee: 1000,
            bankImage: bank2
        }
    ])

    //& onClick akan update state PaymentPlusAdminBank 
    const btnEachAccorBank = (adminFee) => {
        if (adminFee) {
            setPaymentPlusAdminBank(props.totalPayment + adminFee);
        }
    }

    //& print bank list di dalam format accordion
    const printAccorBank = () => {
        return bankInformation.map((valBank, idxBank) => {
            return (
                <AccordionItem
                    key={valBank.idBank}
                    onClick={() => btnEachAccorBank(valBank.adminFee)}
                >
                    <h2>
                        <AccordionButton
                            _expanded={{ bg: `var(--colorThree)` }}
                        >
                            <Box flex="1" textAlign="left" className="h6b">
                                {valBank.bankName.toUpperCase()}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>

                    <AccordionPanel pt={0} pb={2} className="font-brand">

                        <Box
                            display="flex"
                            gap={2}
                            justifyContent="space-between"
                            py={2}
                        >
                            <Image
                                height='25px'
                                width="70px"
                                src={valBank.bankImage}
                                alt='imgLogoBca'
                            />
                            <Text
                                className="font-brand"
                            >
                                Transfer Bank {valBank.bankName.toUpperCase()}
                            </Text>
                        </Box>

                        <List
                            spacing={2}
                            p={2}
                            borderRadius={5}
                            bg="var(--colorTwo)"
                            className="font-brand"
                        >
                            <ListItem
                                display='flex'
                                alignItems='baseline'
                            >
                                <ListIcon as={FaCircle}
                                    style={iconStyles}
                                />
                                <Text>
                                    <span
                                        className="me-1"
                                    >
                                        Total tagihan sudah termasuk biaya transaksi
                                    </span>
                                    <br />
                                    <span
                                        style={{ color: 'var(--colorSix)' }}
                                    >
                                        Rp {valBank.adminFee}
                                    </span>
                                </Text>
                            </ListItem>
                            <ListItem
                                display='flex'
                                alignItems='baseline'
                            >
                                <ListIcon as={FaCircle}
                                    style={iconStyles}
                                />
                                <Text>
                                    <span
                                        className="me-1"
                                    >
                                        Nomor Rekening Medhika:
                                    </span>
                                    <span
                                        style={{ color: 'var(--colorSix)' }}
                                    >
                                        7777777 a.n. CV Medhika
                                    </span>
                                </Text>
                            </ListItem>
                            <ListItem
                                display='flex'
                                alignItems='baseline'
                            >
                                <ListIcon
                                    as={FaCircle}
                                    style={iconStyles}
                                />
                                <Text>
                                    <span
                                        className="me-1"
                                    >
                                        Dengan
                                    </span>
                                    <span
                                        className="me-1"
                                    >
                                        melakukan pembayaran, Anda menyetujui
                                    </span>
                                    <Popover
                                        placement="right-end"
                                        arrowShadowColor="var(--colorSix)"
                                    >
                                        <PopoverTrigger>
                                            <span
                                                style={{ color: 'var(--colorSix)' }}
                                            >
                                                Kebijakan Privasi Medhika.
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            style={{ backgroundColor: 'var(--colorOne)', borderColor: 'var(--colorSix)' }}
                                        >
                                            <PopoverArrow
                                            />
                                            <PopoverCloseButton
                                                color='var(--colorSix)'
                                            />
                                            <PopoverHeader
                                                borderColor='var(--colorSix)'
                                                as='b'
                                            >
                                                Kebijakan Privasi Medhika
                                            </PopoverHeader>
                                            <PopoverBody>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus rerum consequuntur. Porro recusandae tempora enim cupiditate quibusdam est eaque totam eum repellendus iste nobis placeat, vitae necessitatibus quod debitis!
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Text>
                            </ListItem>
                        </List>

                    </AccordionPanel>
                </AccordionItem >
            )
        })
    }

    //& component did mount
    useEffect(() => {
        handleModalPaymentProof();

    }, [props.openModalPaymentProofFromCard])


    //& mungkin bisa di delete ini kalau semua dah digabung jadi 1 modal (si info bayar bca sama mandiri)
    const handleModalPaymentProof = () => {
        // console.log(`selectedTransaction`, props.selectedTransaction);
        // console.log(`totalPayment`, props.totalPayment);

        if (props.openModalPaymentProofFromCard == true) {
            setPaymentPlusAdminBank(props.totalPayment);
            setIsModalPaymentProofOpen(true);
        }
    }

    const handleImageBukti = (value) => {
        // console.log(`value handleImageBukti`, value);
        // console.log(`show value size image resep`, value.size);
        
        if (value.size <= 1000000) {
            if(value.type == "image/png" || value.type=="image/jpeg"){
                setNewImageBukti(value);
            } else {
                newToast({
                    description: "Tipe gambar bukan jpg/jpeg/png",
                    status: 'error'
                })
            }
        } else {
            newToast({
                description: "Ukuran gambar melebihi 1M",
                status: 'error'
            })
        }
    }

    //& onClick akan upload bukti bayar ke tabel transaksi lalu tutup modal payment proof
    const btnUnggahBukti = async () => {
        // console.log(`btnUnggahBukti diklik`);
        // console.log(`selectedTransaction yg masuk ke modal`, props.selectedTransaction);

        let { idTransaction } = props.selectedTransaction;
        // console.log(`idTransaction setelah dipecah objeknya props`, idTransaction)

        let token = localStorage.getItem("tokenIdUser");

        //^ cek ada token atau tidak
        // console.log(`btnBayar tokenIdUser`, token);

        try {
            if (newImageBukti == null || idTransaction == 0 || accordionIndex == null) {
                newToast({
                    title: `Informasi Belum Lengkap`,
                    description: "Lengkapi dahulu form nya",
                    status: 'warning'
                })
            } else {

                if (token) {
                    let formData = new FormData();
                    let data = {
                        idTransaction
                    }
                    // console.log(`data`, data);
                    formData.append('data', JSON.stringify(data));
                    formData.append('buktiPicture', newImageBukti);

                    let res = await Axios.patch(`${API_URL}/transaction/addBuktiBayar`, formData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    // console.log("isi res.data pas btnUnggahBukti", res.data);
                    dispatch(getTransactionAction());
                    dispatch(getUserMenungguKonfirmasiAction());
                    props.handleSendingToCardParentPaymentMethod();
                    setIsModalPaymentProofOpen(false);
                    setAccordionIndex(null);
                    setNewImageBukti(null)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    //& start -- handle modal open/not open, triggering state between parent-child
    const handleOverlayClicked = () => {
        props.handleSendingToCardParentPaymentMethodOVERLAY();
        setIsModalPaymentProofOpen(false);
        setAccordionIndex(null);
        setNewImageBukti(null)
    }

    const onCloseModalClicked = () => {
        props.handleSendingToCardParentPaymentMethodONCLOSE();
        setIsModalPaymentProofOpen(false);
        setAccordionIndex(null);
        setNewImageBukti(null)
    }
    //& end -- handle modal open/not open, triggering state between parent-child

    return (
        <>
            <Accordion
                onChange={setAccordionIndex}
            >
                <Modal
                    isOpen={props.openModalPaymentProofFromCard}
                    onOverlayClick={handleOverlayClicked}
                    onClose={onCloseModalClicked}
                    isCentered
                    size="4xl"
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader
                            className="h5b"
                        >
                            Lampirkan Bukti Pembayaran
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody
                            className="font-brand"
                        >
                            <div
                                className="row"
                            >
                                <div
                                    className="col-6"
                                >
                                    <Text
                                        // as='b'
                                        pb={2}
                                    >
                                        Pilih metode pembayaran, lakukan pembayaran dan unggah bukti bayar.
                                    </Text>
                                    <Text
                                        as='b'
                                        py={2}
                                    >
                                        <span
                                            className="me-1"
                                        >
                                            Total tagihan berikut biaya bank adalah
                                        </span>
                                        <span
                                            style={{ color: 'var(--colorSix)' }}
                                        >
                                            Rp {paymentPlusAdminBank.toLocaleString()}
                                        </span>
                                    </Text>
                                    <Box
                                        pt={5}
                                    >
                                        {printAccorBank()}
                                    </Box>
                                </div>
                                <div
                                    className="col-6"
                                >
                                    <Box
                                    >
                                        <label
                                            for='inputIdImageBukti'
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            <span
                                                className="me-1"
                                            >
                                                Unggah bukti bayar
                                            </span>
                                            <span
                                                style={{ color: 'var(--colorSix)' }}
                                            >
                                                (max 1MB, .jpg/.png):
                                            </span>
                                        </label>
                                        <Input
                                            id='inputIdImageBukti'
                                            ref={inputIdImageBukti}
                                            type='file'
                                            accept='.jpg, .png, .jpeg'
                                            display='none'
                                            onChange={(e) => handleImageBukti(e.target.files[0])}
                                        />
                                        <Image
                                            src={!newImageBukti
                                                ?
                                                "https://images.vexels.com/media/users/3/131734/isolated/preview/05d86a9b63d1930d6298b27081ddc345-photo-preview-frame-icon.png"
                                                :
                                                URL.createObjectURL(newImageBukti)
                                            }
                                            for='inputIdImageBukti'
                                            onClick={() => inputIdImageBukti.current.click()}
                                            style={{ width: '60%', height: 'auto', borderRadius: '2%' }}
                                        />
                                    </Box>

                                    <List
                                        spacing={2}
                                        p={2}
                                        borderRadius={5}
                                        bg="var(--colorTwo)"
                                        className="font-brand"
                                    >
                                        <ListItem
                                            display='flex'
                                            alignItems='baseline'
                                        >
                                            <ListIcon as={FaCircle}
                                                style={iconStyles}
                                            />
                                            <Text>
                                                Bukti bayar yang diunggah harus jelas, sesuai dengan jumlah yang harus dibayar dan akan divalidasi oleh penjual. Bila tidak tepat / tidak jelas, penjual akan meminta pengunggahan ulang.
                                            </Text>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>

                        </ModalBody>

                        <ModalFooter>
                            < Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                className="btn-def_second"
                                width={85}
                                gap={0.5}
                                onClick={btnUnggahBukti}
                            >
                                Unggah
                            </Box>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Accordion>
        </>
    )

}

export default ModalPaymentProofComponent;