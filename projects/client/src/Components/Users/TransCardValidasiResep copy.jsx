import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BE_URL } from "../../helper";
import { getUserValidasiResepAction, getUserFilterValidasiResepAction } from "../../Redux/Actions/transactionActions";
import {
    Box,
    Image,
    Text,
    ButtonGroup,
} from "@chakra-ui/react";

const TransCardValidasiResepComponent = (props) => {

    //^ assign functions
    const dispatch = useDispatch();

    //^ state management
    const { transactionList, transactionLength } = useSelector((state) => {
        return {
            transactionList: state.transactionReducers.uservalidasiresep,
            transactionLength: state.transactionReducers.transaction.filter(val => val.transactionStatus == "Menunggu Diproses Penjual").length
        }
    })

    //& component did mount
    useEffect(() => {
        if (props.query.length > 0) {
            getArrayFilteredSortedTransaction();
        } else {
            getPaginatedTransaction();
        }
    }, [props.query])

    //^ cek props, state
    // console.log(`props.query`, props.query)
    // console.log(`transactionList`, transactionList);
    // console.log(`transactionLength`, transactionLength);

    const getArrayFilteredSortedTransaction = () => {
        dispatch(getUserFilterValidasiResepAction(props.query))
    }

    const getPaginatedTransaction = (page = 0) => {
        if (props.query.length == 0) {
            dispatch(getUserValidasiResepAction(page + 1))
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

    //^ cek kiriman dbValidasiResep dari page parent / TransactionList
    // console.log(`props.dbValidasiResep`, props.dbValidasiResep)

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
                                <Box
                                    display='flex'
                                    alignItems='start'
                                    justifyContent='start'
                                    className="font-brand"
                                    gap={10}
                                    pb={3}
                                >
                                    <Text>
                                        Resep
                                    </Text>
                                    <Image
                                        id={value.idTransaction}
                                        src={value.prescription.includes("http")
                                            ?
                                            value.prescription
                                            :
                                            `${BE_URL}${value.prescription}`}
                                        alt='Gambar resep dokter'
                                        borderRadius='sm'
                                        boxSize='80px'
                                        className="imgResep"
                                    />
                                </Box>
                                <Text
                                    fontSize={15}
                                    className='font-brand'
                                >
                                    <span
                                        className="me-1"
                                    >
                                        *) Penjual akan memvalidasi dan menyiapkan racikan berdasarkan resep yang Anda unggah. Selesai validasi, pesanan Anda akan berstatus
                                    </span>
                                    <span
                                        style={{ color: 'var(--colorSix)' }}
                                    >
                                        Menunggu Pembayaran
                                    </span>
                                </Text>
                            </div>
                        </div>
                    )
                }
            }
            )
        }
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

export default TransCardValidasiResepComponent;