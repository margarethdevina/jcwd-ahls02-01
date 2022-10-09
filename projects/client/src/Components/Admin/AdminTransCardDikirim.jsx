import React, { useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { BE_URL } from "../../helper";
import { getAdminDikirimAction,getAdminFilterDikirimAction } from "../../Redux/Actions/transactionActions";
import {
    Box,
    Image,
    Text,
    ButtonGroup,
} from "@chakra-ui/react";

const AdminTransCardDikirimComponent = (props) => {

     //^ assign functions
     const dispatch = useDispatch();
     const navigate = useNavigate();
 
     //^ state management
     const { transactionList, transactionLength } = useSelector((state) => {
         return {
             transactionList: state.transactionReducers.admindikirim,
             transactionLength: state.transactionReducers.transactionAdminView.filter(val => val.transactionStatus == "Dikirim").length
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
    //  console.log(`props.query`, props.query)
    //  console.log(`transactionList`, transactionList);
    //  console.log(`transactionLength`, transactionLength);
 
     const getArrayFilteredSortedTransaction = () => {
         dispatch(getAdminFilterDikirimAction(props.query))
     }
 
     const getPaginatedTransaction = (page = 0) => {
         if (props.query.length == 0) {
             dispatch(getAdminDikirimAction(page + 1))
         }
     }
 
     const handlePaginate = (paginate) => {
         getPaginatedTransaction(paginate);
     }
 
     const printBtnPagination = () => {
         let btn = []
        //  console.log(`transactionLength di printBtnPagination`, transactionLength);
        //  console.log(`Math.ceil(transactionLength)/3 di printBtnPagination`, Math.ceil(transactionLength) / 3);
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
                                                    src={BE_URL+valProduct.productPicture}
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
                                    as={"b"}
                                    >
                                    Total
                                </Text>
                                <Text
                                    className="me-1"
                                    as={"b"}
                                >
                                    Rp {value.totalPayment.toLocaleString()}
                                </Text>
                            </Box>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <>
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

export default AdminTransCardDikirimComponent;