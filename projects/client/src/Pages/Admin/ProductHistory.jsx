import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Text, useMediaQuery, Box, Button, ButtonGroup, Spinner, Flex, Divider, TableContainer, Table, Thead, Tbody, 
        Tr, Th, Td, Input, Spacer, Menu, MenuButton, MenuList, MenuItem, MenuDivider} from '@chakra-ui/react';
import Sidebar from "../../Components/Admin/Sidebar";
import { getProductHistoryPaginateAction, getSearchProductHistoryPaginateAction, getSortTanggalASCPaginateAction,
        getSortTanggalDSCPaginateAction, getFilterProductHistoryPaginateAction} from "../../Redux/Actions/productHistoryActions";


const ProductHistory=(props)=>{
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortirTanggalASC, setSortirTanggalASC] = React.useState(false);
  const [sortirTanggalDSC, setSortirTanggalDSC] = React.useState(false);
  const [searchProduk, setSearchProduk] = React.useState("");
  const [filterTanggalAwal, setFilterTanggalAwal] = React.useState("");
  const [filterTanggalAkhir, setFilterTanggalAkhir] = React.useState("");
  const [searchOn, setSearchOn]=React.useState(false);
  const [filterOn, setFilterOn]=React.useState(false);
  const [loadingStat, setLoadingStat]=React.useState(false);

  const { produkHistoryPaginate, produkHistoryPaginateLength, produkSearchPaginate, produkSearchPaginateLength,
    produkTanggalASCPaginate, produkTanggalASCPaginateLength, produkTanggalDSCPaginate, produkTanggalDSCPaginateLength,
    produkFilterPaginate, produkFilterPaginateLength } = useSelector((state) => {
    return {
        produkHistoryPaginate: state.productHistoryReducers.productHistoryPaginate,
        produkHistoryPaginateLength: state.productHistoryReducers.productHistoryPaginateLength,
        produkSearchPaginate: state.productHistoryReducers.productSearchPaginate,
        produkSearchPaginateLength: state.productHistoryReducers.productSearchPaginateLength,
        produkFilterPaginate: state.productHistoryReducers.productFilterPaginate,
        produkFilterPaginateLength: state.productHistoryReducers.productFilterPaginateLength,
        produkTanggalASCPaginate: state.productHistoryReducers.productTanggalASCPaginate,
        produkTanggalASCPaginateLength: state.productHistoryReducers.productTanggalASCPaginateLength,
        produkTanggalDSCPaginate: state.productHistoryReducers.productTanggalDSCPaginate,
        produkTanggalDSCPaginateLength: state.productHistoryReducers.productTanggalDSCPaginateLength,
    }
})

  React.useEffect(()=>{
    getPaginatedProdukHistory()
  }, [])
  
  const getPaginatedProdukHistory = (page = 0) => {
    // console.log("getProduct else jalannn")
        dispatch(getProductHistoryPaginateAction(page + 1))
  }

  const getPaginatedSearch = (page = 0) => {
        dispatch(getSearchProductHistoryPaginateAction(page + 1, searchProduk))
  }

  const getPaginatedFilter = (page = 0) => {
        dispatch(getFilterProductHistoryPaginateAction(page + 1, filterTanggalAwal, filterTanggalAkhir))
  }

  const getPaginatedSortTanggalASC = (page = 0) => {
        dispatch(getSortTanggalASCPaginateAction(page + 1))
  }

  const getPaginatedSortTanggalDSC = (page = 0) => {
        dispatch(getSortTanggalDSCPaginateAction(page + 1))
  }

const handlePaginate = (paginate) => {
    getPaginatedProdukHistory(paginate);
  }

const handlePaginateSearch = (paginate) => {
    getPaginatedSearch(paginate);
}

const handlePaginateFilter = (paginate) => {
    getPaginatedFilter(paginate);
}

const handlePaginateTanggalASC = (paginate) => {
    getPaginatedSortTanggalASC(paginate);
}

const handlePaginateTanggalDSC = (paginate) => {
    getPaginatedSortTanggalDSC(paginate);
}

const printBtnPagination = () => {
    let btn = []
    if (searchOn == true){
      for (let i = 0; i < Math.ceil(produkSearchPaginateLength / 10); i++) {
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
    } else if (filterOn == true){
      for (let i = 0; i < Math.ceil(produkFilterPaginateLength / 10); i++) {
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
                onClick={() => handlePaginateFilter(i)}
            >
                {i + 1}
            </Box>
        )
    }
    return btn;
    } else if(sortirTanggalASC == true){
      for (let i = 0; i < Math.ceil(produkTanggalASCPaginateLength / 10); i++) {
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
                onClick={() => handlePaginateTanggalASC(i)}
            >
                {i + 1}
            </Box>
        )
    }
    return btn;
    } else if(sortirTanggalDSC == true){
      for (let i = 0; i < Math.ceil(produkTanggalDSCPaginateLength / 10); i++) {
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
                onClick={() => handlePaginateTanggalDSC(i)}
            >
                {i + 1}
            </Box>
        )
    }
    return btn;
    } else {
      for (let i = 0; i < Math.ceil(produkHistoryPaginateLength / 10); i++) {
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

  const handleSortTanggalASC =async()=>{
    try {
      setSortirTanggalDSC(false)
      setSortirTanggalASC(true)
      // console.log("SORTIR TANGGAL ASC JALANNNNNN")
      {getPaginatedSortTanggalASC()}
      } catch (err) {
    }
  }
  
  const handleSortTanggalDSC =async()=>{
    try {
      setSortirTanggalASC(false)
      setSortirTanggalDSC(true)
      // console.log("SORTIR TANGGAL DSC JALANNNNNN")
      {getPaginatedSortTanggalDSC()}
      } catch (err) {
    }
  }

const printProdukHistory = () => {
  if(searchOn == true){
    if(produkSearchPaginate == undefined) {
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
      return produkSearchPaginate.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        }
      })
    }
  } else if (filterOn == true){
    if(produkFilterPaginate == undefined) {
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
      return produkFilterPaginate.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        }
      })
    }
  } else if (sortirTanggalASC == true){
    if(produkTanggalASCPaginate == undefined) {
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
      return produkTanggalASCPaginate.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        }
      })
    }
  } else if (sortirTanggalDSC == true){
    if(produkTanggalDSCPaginate == undefined) {
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
      return produkTanggalDSCPaginate.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        }
      })
    }
  } else {
      return produkHistoryPaginate.map((value, index)=>{
        if (index % 2 == 0){
        return (
          <Tr>
            <Td>{value.dateFE}</Td>
            <Td>{value.productName.slice(0,22)}</Td>
            <Td>{value.stockType}</Td>
            <Td>{value.stockQuantity}</Td>
            <Td>{value.mutationSource}</Td>
            <Td>{value.mutationType}</Td>
          </Tr>
        )
      } else {
        return (
          <Tr style={{backgroundColor:"#ebeef3"}}>
            <Td>{value.dateFE}</Td>
            <Td>{value.productName.slice(0,22)}</Td>
            <Td>{value.stockType}</Td>
            <Td>{value.stockQuantity}</Td>
            <Td>{value.mutationSource}</Td>
            <Td>{value.mutationType}</Td>
          </Tr>
        )
      }
    })
}
}

const handleSearch =async()=>{
  try {
    if(searchProduk){
        setSearchOn(true)
        // console.log("searchOn JALANNNNNN")
        getPaginatedSearch()
      }
    } catch (err) {
  }
}

const handleFilter =async()=>{
  try {
    if(filterTanggalAwal && filterTanggalAkhir){
        setFilterOn(true)
        // console.log("filterOn JALANNNNNN")
        getPaginatedFilter()
      }
    } catch (err) {
  }
}

const handleCancel = () => {
  setSortirTanggalASC(false)
  setSortirTanggalDSC(false)
};

  return( <>
    <Box
        w='100%'
        h='100vh'
        bgGradient='linear(to-br, #dadeec,  #FFFFFF)'
      >
      <div class="container-fluid" >
        <div class="row">
        {
          isLargerThan1280 ?
            <>
              <div class="col-md-3 col-sm-5">
              <Sidebar />
            </div>
            <div class="col-md-9 col-sm-8">
            <Box mt={"35px"} mb={"20px"}>
              <Text class="h5b">Laporan Produk</Text>
            </Box>
              <div class="row mb-5">
                <div class="mt-2 col-md-10">
                  <div class="rounded-4 shadow p-3" style={{backgroundColor:"#f6f8fc", height:"100%"}}>
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
                        <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="Cari Nama Produk"
                          onChange={(e)=>setSearchProduk(e.target.value)}/>
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
                    <Box ms={"20px"} me={"20px"} >
                      <TableContainer borderRadius={"10px"}>
                        <Table variant='simple'>
                          <Thead>
                            <Tr style={{backgroundColor:"#DE1B51", color:"#FFFFFF", height:"55px"}}>
                              <Th style={{color:"#FFFFFF"}}>Tanggal</Th>
                              <Th style={{color:"#FFFFFF"}}>Produk</Th>
                              <Th style={{color:"#FFFFFF"}}>Unit</Th>
                              <Th style={{color:"#FFFFFF"}}>Stok</Th>
                              <Th style={{color:"#FFFFFF"}}>Tipe</Th>
                              <Th style={{color:"#FFFFFF"}}>Keterangan</Th>
                            </Tr>
                          </Thead>
                            {
                              produkHistoryPaginate == undefined ?
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
                                {printProdukHistory()}
                              </Tbody>
                              <ButtonGroup ms={"20px"} mt={"20px"} mb={"20px"}>
                                  {printBtnPagination()}
                              </ButtonGroup>
                            </>
                            }
                        </Table>
                      </TableContainer>
                    </Box>
                  </div>
                </div>
                <div class="col-md-2"></div>
              </div>
            </div>
            </>
        :
          <>
            <div class="col-4">
            <Sidebar />
          </div>
          <div class="col-8">
            <div class="row">
              <div class="mt-3">
                <Text class="h1b">Dashboard Admin Medhika</Text>
              </div>
            </div>
          </div>
          </>
        }
        </div>
      </div>
    </Box>
  </>
  )
}

export default ProductHistory;