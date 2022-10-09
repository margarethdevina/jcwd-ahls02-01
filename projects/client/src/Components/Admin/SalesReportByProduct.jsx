import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Text, Box, Button, Spinner, ButtonGroup, Flex, Menu, MenuButton, MenuList, MenuItem, Tr, Td, Th,
        Spacer, Input, MenuDivider, TableContainer, Table, Thead, Tbody} from '@chakra-ui/react';
import { getSalesReportPaginateAction, getSearchSalesReportPaginateAction, getSortTotalASCPaginateAction,
        getSortTotalDSCPaginateAction, } from "../../Redux/Actions/salesReportProductActions";

const SalesReportByProduct=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortirTotalASC, setSortirTotalASC] = React.useState(false);
  const [sortirTotalDSC, setSortirTotalDSC] = React.useState(false);
  const [searchProduct, setSearchProduct] = React.useState("");
  const [searchOn, setSearchOn]=React.useState(false);
  const [loadingStat, setLoadingStat]=React.useState(false);

  const { salesReportPaginate, salesReportPaginateLength, salesSearchPaginate, salesSearchPaginateLength,
    salesSortTotalASCPaginate, salesSortTotalASCPaginateLength, salesSortTotalDSCPaginate, salesSortTotalDSCPaginateLength } = useSelector((state) => {
    return {
        salesReportPaginate: state.salesReportProductReducers.salesReportPaginate,
        salesReportPaginateLength: state.salesReportProductReducers.salesReportPaginateLength,
        salesSearchPaginate: state.salesReportProductReducers.salesSearchPaginate,
        salesSearchPaginateLength: state.salesReportProductReducers.salesSearchPaginateLength,
        salesSortTotalASCPaginate: state.salesReportProductReducers.salesSortTotalASCPaginate,
        salesSortTotalASCPaginateLength: state.salesReportProductReducers.salesSortTotalASCPaginateLength,
        salesSortTotalDSCPaginate: state.salesReportProductReducers.salesSortTotalDSCPaginate,
        salesSortTotalDSCPaginateLength: state.salesReportProductReducers.salesSortTotalDSCPaginateLength,
    }
})

  React.useEffect(()=>{
    getPaginatedSalesReport()
  }, [])

  const getPaginatedSalesReport = (page = 0) => {
    // console.log("getProduct else jalannnnnnn")
        dispatch(getSalesReportPaginateAction(page + 1))
  }

  const getPaginatedSearch = (page = 0) => {
    dispatch(getSearchSalesReportPaginateAction(page + 1, searchProduct))
}

  const getPaginatedSortTotalASC = (page = 0) => {
    dispatch(getSortTotalASCPaginateAction(page + 1))
}

  const getPaginatedSortTotalDSC = (page = 0) => {
    dispatch(getSortTotalDSCPaginateAction(page + 1))
}

  const handlePaginate = (paginate) => {
    getPaginatedSalesReport(paginate);
  }

  const handlePaginateSearch = (paginate) => {
    getPaginatedSearch(paginate);
  }

  const handlePaginateTotalASC = (paginate) => {
    getPaginatedSortTotalASC(paginate);
  }

  const handlePaginateTotalDSC = (paginate) => {
    getPaginatedSortTotalDSC(paginate);
  }

  const printBtnPagination = () => {
    let btn = []
    if (searchOn == true){
      for (let i = 0; i < Math.ceil(salesSearchPaginateLength / 10); i++) {
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
                onClick={() => handlePaginateSearch(i)}
            >
                {i + 1}
            </Box>
        )
    }
    return btn;
    } else if(sortirTotalASC == true){
      for (let i = 0; i < Math.ceil(salesSortTotalASCPaginateLength / 10); i++) {
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
                onClick={() => handlePaginateTotalASC(i)}
            >
                {i + 1}
            </Box>
        )
    }
    return btn;
    } else if(sortirTotalDSC == true){
      for (let i = 0; i < Math.ceil(salesSortTotalDSCPaginateLength / 10); i++) {
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
                onClick={() => handlePaginateTotalDSC(i)}
            >
                {i + 1}
            </Box>
        )
    }
    return btn;
    } else {
      for (let i = 0; i < Math.ceil(salesReportPaginateLength / 10); i++) {
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
}

const handleSortTotalASC =async()=>{
  try {
    setSortirTotalDSC(false)
    setSortirTotalASC(true)
    // console.log("SORTIR TOTAL ASC JALANNNNNN")
    {getPaginatedSortTotalASC()}
    } catch (err) {
  }
}

const handleSortTotalDSC =async()=>{
  try {
    setSortirTotalASC(false)
    setSortirTotalDSC(true)
    // console.log("SORTIR TOTAL DSC JALANNNNNN")
    {getPaginatedSortTotalDSC()}
    } catch (err) {
  }
}

const handleSearch =async()=>{
  try {
    if(searchProduct){
      setSearchOn(true)
      // console.log("searchOn JALANNNNNN")
      getPaginatedSearch()
    }
    } catch (err) {
  }
}

  const printLaporanProduk = () => {
    if(searchOn == true){
      if(salesSearchPaginate == undefined) {
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
        return salesSearchPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.productName.slice(0,40)}</Td>
                <Td>{value.qty}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.productName.slice(0,40)}</Td>
                <Td>{value.qty}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (sortirTotalASC == true){
      if(salesSortTotalASCPaginate == undefined) {
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
        return salesSortTotalASCPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.productName.slice(0,40)}</Td>
                <Td>{value.qty}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.productName.slice(0,40)}</Td>
                <Td>{value.qty}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (sortirTotalDSC == true){
      if(salesSortTotalDSCPaginate == undefined) {
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
        return salesSortTotalDSCPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.productName.slice(0,40)}</Td>
                <Td>{value.qty}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.productName.slice(0,40)}</Td>
                <Td>{value.qty}</Td>
                <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else {
      return salesReportPaginate.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.qty}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.qty}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        }
      })
    }
  }

  const handleCancel = () => {
    setSortirTotalASC(false)
    setSortirTotalDSC(false)
  };

  // console.log("salesSortTotalDSCPaginate", salesReportPaginate)
  return( <>
    <div class="row mb-4 mt-4" style={{marginLeft:"10px", marginRight:"10px"}}>
      <div class="col-md-4">
        <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="Cari Nama Produk"
          onChange={(e)=>setSearchProduct(e.target.value)}/>
      </div>
      <div class="col-md-8">
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
            {
              searchOn == true &&
            <Box mt={"3px"} ms={"10px"}>
              <Button class="btn-def" onClick={()=> {(setSearchOn(false));(setSearchProduct(""))}}>Batal Cari</Button>
            </Box>
            }
          </Box>
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
                    <MenuItem onClick={handleCancel}>Batalkan Sortir</MenuItem>
                </MenuList>
              </>
              )}
            </Menu>
        </Flex>
      </div>
    </div>
    <Box ms={"20px"} me={"20px"}>
      <TableContainer borderRadius={"10px"} boxShadow={"md"}>
        <Table variant='simple'>
          <Thead>
            <Tr style={{backgroundColor:"#DE1B51", color:"#FFFFFF", height:"55px"}}>
              <Th style={{color:"#FFFFFF"}}>No</Th>
              <Th style={{color:"#FFFFFF"}}>Nama Produk</Th>
              <Th style={{color:"#FFFFFF"}}>Jumlah</Th>
              <Th isNumeric style={{color:"#FFFFFF"}}>Total</Th>
            </Tr>
          </Thead>
            {
              salesReportPaginate == undefined ?
              <Tbody>
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
              </Tbody>
            :
            <>
              <Tbody>
                {printLaporanProduk()}
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

export default SalesReportByProduct;