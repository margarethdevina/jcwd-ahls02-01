import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, BE_URL } from "../../helper";
import { getUserDikirimAction, getUserFilterDikirimAction, confirmReceivePackageAction } from "../../Redux/Actions/transactionActions";
import {
    Box,
    Image,
    Text,
    Button,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

const TransCardDikirimComponent = (props) => {

    //^ assign functions
    const dispatch = useDispatch();

    //^ state management
    const { transactionList, transactionLength } = useSelector((state) => {
        return {
            transactionList: state.transactionReducers.userdikirim,
            transactionLength: state.transactionReducers.transaction.filter(val => val.transactionStatus == "Dikirim").length
        }
    })
    const [terimaPesanan, setTerimaPesanan] = useState(0);
    const [openModalTerimaPesanan, setOpenModalTerimaPesanan] = useState(false);
    const [idTerimaPesanan, setIdTerimaPesanan] = useState(null);
    const [statusBaru, setStatusBaru] = useState(``);

    //& component did mount
    useEffect(() => {
        if (props.query.length > 0) {
            getArrayFilteredSortedTransaction();
            setTerimaPesanan(0)
        } else {
            getPaginatedTransaction();
            setTerimaPesanan(0)
        }
    }, [props.query,terimaPesanan])

    //^ cek props, state
    // console.log(`props.query`, props.query)
    // console.log(`transactionList`, transactionList);
    // console.log(`transactionLength`, transactionLength);

    const getArrayFilteredSortedTransaction = () => {
        dispatch(getUserFilterDikirimAction(props.query))
    }

    const getPaginatedTransaction = (page = 0) => {
        if (props.query.length == 0) {
            dispatch(getUserDikirimAction(page + 1))
        }
    }

    const handlePaginate = (paginate) => {
        getPaginatedTransaction(paginate);
    }

    const printBtnPagination = () => {
        let btn = []
        // console.log(`transactionLength di printBtnPagination`, transactionLength);
        // console.log(`Math.ceil(transactionLength)/3 di printBtnPagination`, Math.ceil(transactionLength) / 3);
        for (let i = 0; i < Math.ceil(transactionLength / 3); i++) {
            btn.push(
                <Box
                    as='button'
                    height='30px'
                    lineHeight='1.5'
                    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                    border='1px'
                    px='8px'
                    borderRadius='4px'
                    className="font-brand"
                    fontSize='14px'
                    fontWeight='bold'
                    bg='var(--colorTwo)'
                    borderColor='var(--colorSix)'
                    color='var(--colorSix)'
                    _hover={{ bg: 'var(--colorSix)', borderColor: 'var(--colorOne)', color: 'var(--colorOne)' }}
                    _active={{
                        bg: 'var(--colorSix)',
                        color: 'var(--colorOne)',
                        borderColor: 'var(--colorOne)'
                    }}
                    _focus={{
                        bg: 'var(--colorSix)',
                        color: 'var(--colorOne)',
                        borderColor: 'var(--colorOne)',
                        boxShadow:
                            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    }}
                    onClick={() => handlePaginate(i)}
                >
                    {i + 1}
                </Box>
            )
        }
        return btn;
    }

    const printDikirim = () => {
        if (transactionList.length > 0) {
            return transactionList.map((value, index) => {
                return (
                    <div
                        className="card mb-2" key={value.idTransaction}
                    >
                        <div className="card-body">
                            <Box
                                display='flex'
                                flexDirection={{ base: 'column', md: 'row' }}
                                alignItems={{ base: 'start', md: 'center' }}
                                justifyContent='space-between'
                                className="font-brand"
                                as='b'
                                pb={3}
                            >
                                <Box
                                    display='flex'
                                    flexDirection={{ base: 'column', md: 'row' }}
                                    alignItems={{ base: 'start', md: 'center' }}
                                    justifyContent='space-between'
                                    gap={5}
                                >
                                    <Text>
                                        {value.addDate}
                                    </Text>
                                    <Text>
                                        {value.invoiceNumber}
                                    </Text>
                                </Box>
                                <Text
                                    textColor='var(--colorSix)'
                                >
                                    {value.transactionStatus} Ke Pembeli
                                </Text>
                            </Box>

                            <>
                                {value.purchasedProducts.map((valProduct, idxProduct) => {
                                    return (
                                        <Box
                                            display='flex'
                                            alignItems='start'
                                            justifyContent='space-between'
                                            className="font-brand"
                                            pb={2}
                                            key={valProduct.idTransactionDetail}
                                        >
                                            <Box
                                                display='flex'
                                                alignItems='start'
                                                justifyContent='start'
                                                gap={5}
                                            >
                                                <Image
                                                    borderRadius='xl'
                                                    boxSize='70px'
                                                    src={BE_URL + valProduct.productPicture}
                                                    alt={`IMG-${valProduct.productName}`}
                                                    className="d-md-block d-none"
                                                />
                                                <Text>
                                                    <span>
                                                        {valProduct.productName}
                                                    </span>
                                                    <br />
                                                    <span>
                                                        {valProduct.purchaseQuantity} {valProduct.stockType} x Rp {valProduct.priceSale.toLocaleString()}
                                                    </span>
                                                </Text>
                                            </Box>
                                            <Text
                                                className="me-1"
                                            >
                                                Rp {valProduct.subTotal.toLocaleString()}
                                            </Text>
                                        </Box>
                                    )
                                })}
                            </>

                            <Box
                                display='flex'
                                alignItems='start'
                                justifyContent='space-between'
                                className="font-brand"
                                pb={3}
                            >
                                <Text
                                    ps={90}
                                >
                                    Ongkir
                                </Text>
                                <Text
                                    className="me-1"
                                >
                                    Rp {value.freightCost.toLocaleString()}
                                </Text>
                            </Box>

                            <Box
                                display='flex'
                                alignItems='start'
                                justifyContent='space-between'
                                className="font-brand"
                                pb={3}
                                textColor='var(--colorSix)'
                            >
                                <Text
                                    ps={90}
                                >
                                    Total
                                </Text>
                                <Text
                                    className="me-1"
                                >
                                    Rp {value.totalPayment.toLocaleString()}
                                </Text>
                            </Box>

                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='end'
                                mt={2}
                                mb={3}
                            >
                                <Button
                                    className="btn-def_second"
                                    width={230}
                                    onClick={() => btnTerimaPesanan(value.idTransaction, "Pesanan Dikonfirmasi")}
                                >
                                    Konfirmasi Terima Pesanan
                                </Button>
                            </Box>

                        </div>
                    </div>
                )
            })
        }
    }

    const btnTerimaPesanan = (idTransaction, status) => {
        setOpenModalTerimaPesanan(!openModalTerimaPesanan)
        setIdTerimaPesanan(idTransaction);
        setStatusBaru(status);
    }

    const btnYaTerima = () => {
        dispatch(confirmReceivePackageAction(idTerimaPesanan, statusBaru))
        getPaginatedTransaction();
        setTerimaPesanan(1);
        setOpenModalTerimaPesanan(!openModalTerimaPesanan);
    }

    const btnTidakTerima = () => {
        setTerimaPesanan(0)
        setOpenModalTerimaPesanan(!openModalTerimaPesanan)
    }

    return (
        <>
        <Modal
                isOpen={openModalTerimaPesanan}
                onOverlayClick={() => setOpenModalTerimaPesanan(!openModalTerimaPesanan)}
                onClose={() => setOpenModalTerimaPesanan(!openModalTerimaPesanan)}
                isCentered
                size="sm"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        className="h5b"
                    >
                        Konfirmasi Penerimaan
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        className="font-brand"
                    >
                        <div className="mb-3">
                            Anda yakin telah menerima pesanan Anda?
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <Button
                                className="btn-def"
                                width={55}
                                me={2}
                                onClick={btnYaTerima}
                            >
                                Ya
                            </Button>
                            <Button
                                className="btn-def_second"
                                width={55}
                                onClick={btnTidakTerima}
                            >
                                Tidak
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {
                props.query.length > 0
                    ?
                    <>
                        {printDikirim()}
                    </>
                    :
                    <>
                        {printDikirim()}
                        <ButtonGroup>
                            {printBtnPagination()}
                        </ButtonGroup>
                    </>
            }
        </>
    )

}

export default TransCardDikirimComponent;