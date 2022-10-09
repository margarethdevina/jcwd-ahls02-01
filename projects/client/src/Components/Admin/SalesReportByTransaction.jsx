import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Text, Box, Button, ButtonGroup, Flex, Spinner, TableContainer, Table, Thead, Tbody, Tr, Th, Td, 
  Input, Menu, MenuButton, MenuList, MenuItem, Spacer, MenuDivider} from '@chakra-ui/react';
import { useToastHook } from "../../Components/CustomToast";
import { getSalesInvoicePaginateAction, getSearchSalesInvoicePaginateAction, getFilterSalesInvoicePaginateAction, getInvoiceTanggalASCPaginateAction,
    getInvoiceTanggalDSCPaginateAction, getInvoiceTotalASCPaginateAction, getInvoiceTotalDSCPaginateAction } from "../../Redux/Actions/salesReportInvoiceActions"



const SalesReportByTransaction=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [salesByInvoice, setSalesByInvoice] = React.useState();
  const [laporanInvoiceTotalASC, setLaporanInvoiceTotalASC] = React.useState();
  const [laporanInvoiceTotalDSC, setLaporanInvoiceTotalDSC] = React.useState();
  const [laporanInvoiceTanggalASC, setLaporanInvoiceTanggalASC] = React.useState();
  const [laporanInvoiceTanggalDSC, setLaporanInvoiceTanggalDSC] = React.useState();
  const [sortirTotalASC, setSortirTotalASC] = React.useState(false);
  const [sortirTotalDSC, setSortirTotalDSC] = React.useState(false);
  const [sortirTanggalASC, setSortirTanggalASC] = React.useState(false);
  const [sortirTanggalDSC, setSortirTanggalDSC] = React.useState(false);
  const [searchInvoice, setSearchInvoice] = React.useState("");
  const [filterTanggalAwal, setFilterTanggalAwal] = React.useState("");
  const [filterTanggalAkhir, setFilterTanggalAkhir] = React.useState("");
  const [searchByInvoice, setSearchByInvoice] = React.useState();
  const [filterByInvoice, setFilterByInvoice] = React.useState();
  const [searchOn, setSearchOn]=React.useState(false);
  const [filterOn, setFilterOn]=React.useState(false);
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [limit, setLimit]=React.useState(10);
  const [currentToast, newToast]=useToastHook();

  const { salesInvoicePaginate, salesInvoicePaginateLength, salesSearchInvoicePaginate, salesSearchInvoicePaginateLength,
    salesInvoiceTanggalASCPaginate, salesInvoiceTanggalASCPaginateLength, salesInvoiceTanggalDSCPaginate, salesInvoiceTanggalDSCPaginateLength,
    salesFilterInvoicePaginate, salesFilterInvoicePaginateLength, salesInvoiceTotalASCPaginate, salesInvoiceTotalASCPaginateLength,
    salesInvoiceTotalDSCPaginate, salesInvoiceTotalDSCPaginateLength } = useSelector((state) => {
    return {
        salesInvoicePaginate: state.salesInvoiceReducers.salesInvoicePaginate,
        salesInvoicePaginateLength: state.salesInvoiceReducers.salesInvoicePaginateLength,
        salesSearchInvoicePaginate: state.salesInvoiceReducers.salesSearchInvoicePaginate,
        salesSearchInvoicePaginateLength: state.salesInvoiceReducers.salesSearchInvoicePaginateLength,
        salesFilterInvoicePaginate: state.salesInvoiceReducers.salesFilterInvoicePaginate,
        salesFilterInvoicePaginateLength: state.salesInvoiceReducers.salesFilterInvoicePaginateLength,
        salesInvoiceTanggalASCPaginate: state.salesInvoiceReducers.salesInvoiceTanggalASCPaginate,
        salesInvoiceTanggalASCPaginateLength: state.salesInvoiceReducers.salesInvoiceTanggalASCPaginateLength,
        salesInvoiceTanggalDSCPaginate: state.salesInvoiceReducers.salesInvoiceTanggalDSCPaginate,
        salesInvoiceTanggalDSCPaginateLength: state.salesInvoiceReducers.salesInvoiceTanggalDSCPaginateLength,
        salesInvoiceTotalASCPaginate: state.salesInvoiceReducers.salesInvoiceTotalASCPaginate,
        salesInvoiceTotalASCPaginateLength: state.salesInvoiceReducers.salesInvoiceTotalASCPaginateLength,
        salesInvoiceTotalDSCPaginate: state.salesInvoiceReducers.salesInvoiceTotalDSCPaginate,
        salesInvoiceTotalDSCPaginateLength: state.salesInvoiceReducers.salesInvoiceTotalDSCPaginateLength,
    }
})

  React.useEffect(()=>{
    getPaginatedSalesReportInvoice()
  }, [])

  const getPaginatedSalesReportInvoice = (page = 0) => {
    // console.log("getInvoice else jalannn")
        dispatch(getSalesInvoicePaginateAction(page + 1))
  }

  const getPaginatedSearchInvoice = (page = 0) => {
    dispatch(getSearchSalesInvoicePaginateAction(page + 1, searchInvoice))
}

const getPaginatedFilterInvoice = (page = 0) => {
  dispatch(getFilterSalesInvoicePaginateAction(page + 1, filterTanggalAkhir, filterTanggalAwal))
}

const getPaginatedInvoiceTanggalASC = (page = 0) => {
  dispatch(getInvoiceTanggalASCPaginateAction(page + 1))
}

const getPaginatedInvoiceTanggalDSC = (page = 0) => {
  dispatch(getInvoiceTanggalDSCPaginateAction(page + 1))
}

const getPaginatedInvoiceTotalASC = (page = 0) => {
  dispatch(getInvoiceTotalASCPaginateAction(page + 1))
}

const getPaginatedInvoiceTotalDSC = (page = 0) => {
  dispatch(getInvoiceTotalDSCPaginateAction(page + 1))
}

  const handlePaginate = (paginate) => {
    getPaginatedSalesReportInvoice(paginate);
  }

  const handlePaginateSearchInvoice = (paginate) => {
    getPaginatedSearchInvoice(paginate);
  }

  const handlePaginateFilterInvoice = (paginate) => {
    getPaginatedFilterInvoice(paginate);
  }

  const handlePaginateInvoiceTanggalASC = (paginate) => {
    getPaginatedInvoiceTanggalASC(paginate);
  }
  
  const handlePaginateInvoiceTanggalDSC = (paginate) => {
    getPaginatedInvoiceTanggalDSC(paginate);
  }

  const handlePaginateInvoiceTotalASC = (paginate) => {
    getPaginatedInvoiceTotalASC(paginate);
  }

  const handlePaginateInvoiceTotalDSC = (paginate) => {
    getPaginatedInvoiceTotalDSC(paginate);
  }

const handleSortTotalASC =async()=>{
  try {
    setSortirTotalDSC(false)
    setSortirTanggalASC(false)
    setSortirTanggalDSC(false)
    setSortirTotalASC(true)
    // console.log("SORTIR TOTAL ASC JALANNNNNN")
    {getPaginatedInvoiceTotalASC()}
    } catch (err) {
  }
}

const handleSortTotalDSC =async()=>{
  try {
    setSortirTotalASC(false)
    setSortirTanggalASC(false)
    setSortirTanggalDSC(false)
    setSortirTotalDSC(true)
    // console.log("SORTIR TOTAL DSC JALANNNNNN")
    {getPaginatedInvoiceTotalDSC()}
    } catch (err) {
  }
}
const handleSortTanggalASC =async()=>{
  try {
    setSortirTotalASC(false)
    setSortirTotalDSC(false)
    setSortirTanggalDSC(false)
    setSortirTanggalASC(true)
    // console.log("SORTIR TANGGAL ASC JALANNNNNN")
    {getPaginatedInvoiceTanggalASC()}
    } catch (err) {
  }
}

const handleSortTanggalDSC =async()=>{
  try {
    // console.log("sortir tanggal DSC JALAN")
    setSortirTotalASC(false)
    setSortirTotalDSC(false)
    setSortirTanggalASC(false)
    setSortirTanggalDSC(true)
    // console.log("SORTIR TANGGAL DSC JALANNNNNN")
    {getPaginatedInvoiceTanggalDSC()}
    } catch (err) {
  }
}

// console.log("math.ceil",salesInvoiceTanggalASCPaginateLength)
const printBtnPagination = () => {
  let btn = []
  if (searchOn == true){
    for (let i = 0; i < Math.ceil(salesSearchInvoicePaginateLength / 10); i++) {
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
              onClick={() => handlePaginateSearchInvoice(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  } else if (filterOn == true){
    for (let i = 0; i < Math.ceil(salesFilterInvoicePaginateLength / 10); i++) {
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
              onClick={() => handlePaginateFilterInvoice(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  } else if(sortirTanggalASC == true){
    for (let i = 0; i < Math.ceil(salesInvoiceTanggalASCPaginateLength / 10); i++) {
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
              onClick={() => handlePaginateInvoiceTanggalASC(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  } else if(sortirTanggalDSC == true){
    for (let i = 0; i < Math.ceil(salesInvoiceTanggalDSCPaginateLength / 10); i++) {
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
              onClick={() => handlePaginateInvoiceTanggalDSC(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  } else if(sortirTotalASC == true){
    for (let i = 0; i < Math.ceil(salesInvoiceTotalASCPaginateLength / 10); i++) {
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
              onClick={() => handlePaginateInvoiceTotalASC(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  } else if(sortirTotalDSC == true){
    for (let i = 0; i < Math.ceil(salesInvoiceTotalDSCPaginateLength / 10); i++) {
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
              onClick={() => handlePaginateInvoiceTotalDSC(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  }else {
    for (let i = 0; i < Math.ceil(salesInvoicePaginateLength / 10); i++) {
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
  // console.log(`transactionLength di printBtnPagination`, transactionLength);
}

  const printSalesByInvoice = () => {
    if(searchOn == true){
      if (salesSearchInvoicePaginate == undefined){
        return <div>
          <Text class="h5b mt-5 mb-5">Loading</Text>
          <Spinner
            thickness='5px'
            speed='0.50s'
            emptyColor='#FFFFFF'
            color='#DE1B51'
            size='xl'
            marginTop={"10px"}
          />
        </div>
      } else {
        return salesSearchInvoicePaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (filterOn == true){
      if (salesFilterInvoicePaginate == undefined){
        return <div>
          <Text class="h5b mt-5 mb-5">Loading</Text>
          <Spinner
            thickness='5px'
            speed='0.50s'
            emptyColor='#FFFFFF'
            color='#DE1B51'
            size='xl'
            marginTop={"10px"}
          />
        </div>
      } else {
        return salesFilterInvoicePaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (sortirTotalASC == true){
      if(salesInvoiceTotalASCPaginate == undefined){
        return (
          <div>
            <Text class="h5b mt-5 mb-5">Loading</Text>
            <Spinner
              thickness='5px'
              speed='0.50s'
              emptyColor='#FFFFFF'
              color='#DE1B51'
              size='xl'
              marginTop={"10px"}
            />
          </div>
        )
      } else {
        return salesInvoiceTotalASCPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (sortirTotalDSC == true){
      if(salesInvoiceTotalDSCPaginate == undefined){
        return (
          <div>
            <Text class="h5b mt-5 mb-5">Loading</Text>
            <Spinner
              thickness='5px'
              speed='0.50s'
              emptyColor='#FFFFFF'
              color='#DE1B51'
              size='xl'
              marginTop={"10px"}
            />
          </div>
        )
      } else{
        return salesInvoiceTotalDSCPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (sortirTanggalASC == true){
      if(salesInvoiceTanggalASCPaginate == undefined){
        return (
          <div>
            <Text class="h5b mt-5 mb-5">Loading</Text>
            <Spinner
              thickness='5px'
              speed='0.50s'
              emptyColor='#FFFFFF'
              color='#DE1B51'
              size='xl'
              marginTop={"10px"}
            />
          </div>
        )
      } else {
        return salesInvoiceTanggalASCPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (sortirTanggalDSC == true){
      if(salesInvoiceTanggalDSCPaginate == undefined){
        return (
          <div>
            <Text class="h5b mt-5 mb-5">Loading</Text>
            <Spinner
              thickness='5px'
              speed='0.50s'
              emptyColor='#FFFFFF'
              color='#DE1B51'
              size='xl'
              marginTop={"10px"}
            />
          </div>
        )
      } else{
        return salesInvoiceTanggalDSCPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.dateFE}</Td>
                <Td>{value.invoiceNumber}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else {
      return salesInvoicePaginate.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
              <Td>{value.dateFE}</Td>
              <Td>{value.invoiceNumber}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
              <Td>{value.dateFE}</Td>
              <Td>{value.invoiceNumber}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        }
      })
    }
  }
    
  const handleSearch =async()=>{
    try {
      if(searchInvoice){
        setSearchOn(true)
        // console.log("searchOn JALANNNNNN")
        getPaginatedSearchInvoice()
        }
      } catch (err) {
    }
  }

  const handleFilter =async()=>{
    try {
      if(filterTanggalAwal && filterTanggalAkhir){
        setFilterOn(true)
        // console.log("filterOn JALANNNNNN")
        getPaginatedFilterInvoice()
        }
      } catch (err) {
    }
  }

  const handleCancel = () => {
    setSortirTotalASC(false)
    setSortirTotalDSC(false)
    setSortirTanggalASC(false)
    setSortirTanggalDSC(false)
  };

  // console.log("Tanggal Awal", filterTanggalAwal, "Akhir", filterTanggalAkhir)
  return( <>
    <div class="row mb-4" style={{marginLeft:"10px", marginRight:"10px"}}>
      <Text class="h6">Filter Tanggal</Text>
      <div class="col-md-3">
        <Input type={"date"} bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} 
          onChange={(e)=>setFilterTanggalAwal(e.target.value)}/>
      </div>
      <div class="col-md-3">
        <Input type={"date"} bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} 
          onChange={(e)=>setFilterTanggalAkhir(e.target.value)}/>
      </div>
      <div class="col-md-6">
        <Flex>
        {
          loadingStat == true ?
            <>
              <Button class="btn-def_second2">
              <Spinner
                thickness='2px'
                speed='0.50s'
                emptyColor='#DE1B51'
                color='#FFFFFF'
                size='md'
                marginTop={"5px"}
              />
              </Button>
            </>
        :
          <Button class="btn-def_second2" onClick={handleFilter}>Filter</Button>
        }
          
            {
              filterOn == true &&
              <Box mt={"3px"} ms={"10px"}>
                <Button class="btn-def" onClick={()=> setFilterOn(false)}>Batal Filter</Button>
              </Box>
            }
        </Flex>
      </div>
      <div class="col-md-4 mt-4">
        <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="Cari Nomer Invoice"
          onChange={(e)=>setSearchInvoice(e.target.value)}/>
      </div>
      <div class="col-md-8 mt-4">
      <Flex>
            <Box mt={"3px"}>
              {
                loadingStat == true ?
                  <>
                    <Button class="btn-def_second2">
                    <Spinner
                      thickness='2px'
                      speed='0.50s'
                      emptyColor='#DE1B51'
                      color='#FFFFFF'
                      size='md'
                      marginTop={"5px"}
                    />
                    </Button>
                  </>
            :
              <Button class="btn-def_second2" onClick={handleSearch}>Cari</Button>
            }
            </Box>
            {
              searchOn == true &&
            <Box mt={"3px"} ms={"10px"}>
              
              <Button class="btn-def" onClick={()=> setSearchOn(false)}>Batal Cari</Button>
            </Box>
            }
            <Spacer/>
            <Menu>
                {({ isOpen }) => (
            <>
                <MenuButton isActive={isOpen} as={Button} size={"sm"} mt={"3px"} me={"25px"} width={"100px"} boxShadow={"md"}>
                    {isOpen ? 'Close' : 'Sortir'}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleSortTotalASC}>Total Terkecil</MenuItem>
                    <MenuItem onClick={handleSortTotalDSC}>Total Terbesar</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleSortTanggalDSC}>Tanggal Terjauh</MenuItem>
                    <MenuItem onClick={handleSortTanggalASC}>Tanggal Terdekat</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleCancel}>Batalkan Sortir</MenuItem>
                </MenuList>
            </>
                )}
            </Menu>
        </Flex>
      </div>
    </div>
    <Box ms={"20px"} me={"20px"}>
      <TableContainer borderRadius={"10px"}>
        <Table variant='simple'>
          <Thead>
            <Tr style={{backgroundColor:"#DE1B51", color:"#FFFFFF", height:"55px"}}>
              <Th style={{color:"#FFFFFF"}}>No</Th>
              <Th style={{color:"#FFFFFF"}}>Tanggal</Th>
              <Th style={{color:"#FFFFFF"}}>Nomer Invoice</Th>
              <Th isNumeric style={{color:"#FFFFFF"}}>Total</Th>
            </Tr>
          </Thead>
          {
            salesInvoicePaginate == undefined ?
              <Tbody>
                <div>
                </div>
              </Tbody>
            :
              <>
                <Tbody>
                  {printSalesByInvoice()}
                </Tbody>
                <ButtonGroup ms={"20px"} mt={"20px"} mb={"20px"}>
                  {printBtnPagination()}
                </ButtonGroup>
              </>
          }
        </Table>
      </TableContainer>
    </Box>
  </>
  )
}

export default SalesReportByTransaction;