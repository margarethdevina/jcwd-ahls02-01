import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../../helper";
import { getAdminValidasiResepAction, getAdminFilterValidasiResepAction,updateTransactionStatusOnlyAction } from "../../Redux/Actions/transactionActions";
import {
    Box,
    Divider,
    Image,
    Text,
    Button,
    ButtonGroup,
} from "@chakra-ui/react";

const AdminTransCardValidasiResepComponent = (props) => {

    //^ assign functions
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //^ state management
    const { transactionList, transactionLength } = useSelector((state) => {
        return {
            transactionList: state.transactionReducers.adminvalidasiresep,
            transactionLength: state.transactionReducers.transactionAdminView.filter(val => val.transactionStatus == "Menunggu Diproses Penjual").length
        }
    })
    const [tagihDiklik,setTagihDiklik] = useState(0)

    //& component did mount
    useEffect(() => {
        if (props.query.length > 0) {
            getArrayFilteredSortedTransaction();
            setTagihDiklik(0)
        } else {
            getPaginatedTransaction();
            setTagihDiklik(0)
        }
    }, [props.query,tagihDiklik])

    //^ cek props, state
    // console.log(`props.query`, props.query)
    // console.log(`transactionList`, transactionList);
    // console.log(`transactionLength`, transactionLength);

    const getArrayFilteredSortedTransaction = () => {
        dispatch(getAdminFilterValidasiResepAction(props.query))
    }

    const getPaginatedTransaction = (page = 0) => {
        if (props.query.length == 0) {
            dispatch(getAdminValidasiResepAction(page + 1))
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

    const printSemuaTransaksi = () => {
        if (transactionList.length > 0) {
            return transactionList.map((value, index) => {
                if (value.prescription != null && value.transactionStatus == "Menunggu Diproses Penjual") {
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
                                        {value.transactionStatus}
                                    </Text>
                                </Box>
                                <Button
                                    className="btn-def_second"
                                    mb={3}
                                    onClick={() => navigate(`/admin/racikResep?id=${value.idTransaction}`)}
                                >
                                    Validasi Resep
                                </Button>

                                <>
                                    <Box
                                        alignItems='start'
                                        justifyContent='space-between'
                                        className="font-brand"
                                        pb={2}

                                    >
                                        {value.purchasedProducts.length > 0
                                            ?
                                            value.purchasedProducts.map((valProduct, idxProduct) => {
                                                return (
                                                    <>
                                                        <Box
                                                            display='flex'
                                                            alignItems='start'
                                                            justifyContent='space-between'
                                                            className="font-brand"
                                                            pb={2}

                                                        >
                                                            <Box
                                                                display='flex'
                                                                alignItems='start'
                                                                justifyContent='start'
                                                                gap={5}
                                                                key={valProduct.idTransactionDetail}
                                                            >
                                                                <Image
                                                                    borderRadius='xl'
                                                                    boxSize='70px'
                                                                    src={BE_URL + valProduct.productPicture}
                                                                    alt='Gambar resep dokter'
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
                                                    </>
                                                )
                                            })
                                            :
                                            <>
                                                <Box
                                                    display='flex'
                                                    alignItems='start'
                                                    justifyContent='start'
                                                    gap={5}
                                                >
                                                    <Image
                                                        borderRadius='xl'
                                                        boxSize='70px'
                                                        src={value.prescription.includes("http")
                                                            ?
                                                            value.prescription
                                                            :
                                                            `${BE_URL}${value.prescription}`}
                                                        alt='Gambar resep dokter'
                                                        className="d-md-block d-none imgResep"
                                                    />
                                                </Box>
                                            </>
                                        }
                                    </Box>

                                </>

                                <Divider mt={4} />
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-10">
                                        <Box
                                            display='flex'
                                            flexDirection={{ base: 'column', md: 'row' }}
                                            alignItems={{ base: 'start', md: 'center' }}
                                            justifyContent='space-between'
                                            className="font-brand"
                                            pb={3}
                                        >
                                            <Box mt={5}>
                                                <Text className="h6">
                                                    Ongkir
                                                </Text>
                                            </Box>
                                            <Text
                                                as='b'
                                                textColor='var(--colorSix)'
                                            >
                                                Rp {value.freightCost.toLocaleString()}
                                            </Text>
                                        </Box>
                                        <Box
                                            display='flex'
                                            flexDirection={{ base: 'column', md: 'row' }}
                                            alignItems={{ base: 'start', md: 'center' }}
                                            justifyContent='space-between'
                                            className="font-brand"
                                            pb={3}
                                        >
                                            <Box>
                                                <Text className="h6">
                                                    Total
                                                </Text>
                                            </Box>
                                            <Text
                                                as='b'
                                                textColor='var(--colorSix)'
                                            >
                                                Rp {value.totalPayment != null
                                                    ?
                                                    value.totalPayment.toLocaleString()
                                                    :
                                                    value.freightCost.toLocaleString()
                                                }
                                            </Text>
                                        </Box>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <Button
                                        className="btn-def_second"
                                        onClick={() => btnTagihPembayaran(value.idTransaction,"Menunggu Pembayaran")}
                                    >
                                        Tagih Pembayaran
                                    </Button>
                                </div>
                            </div>
                        </div >
                    )
                }
            }
            )
        }
    }

    const btnTagihPembayaran = (idTransaction,status)=>{
        dispatch(updateTransactionStatusOnlyAction(idTransaction, status))
        getPaginatedTransaction();
        setTagihDiklik(1);
    }

    return (
        <>
            {
                props.query.length > 0
                    ?
                    <>
                        {printSemuaTransaksi()}
                    </>
                    :
                    <>
                        {printSemuaTransaksi()}
                        <ButtonGroup>
                            {printBtnPagination()}
                        </ButtonGroup>
                    </>
            }
        </>
    )

}

export default AdminTransCardValidasiResepComponent;