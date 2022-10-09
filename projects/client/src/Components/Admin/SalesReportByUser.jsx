import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Text, Box, Button, ButtonGroup, Spinner, Flex, TableContainer, Table, Thead, Tbody, 
        Tr, Th, Td, Input, Menu, MenuButton, MenuList, MenuItem, Spacer, MenuDivider} from '@chakra-ui/react';
import { getUserSalesReportPaginateAction, getSearchUserPaginateAction, getUserTotalASCPaginateAction, getUserTotalDSCPaginateAction } from '../../Redux/Actions/salesReportUserActions'



const SalesReportByUser=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [laporanUser, setLaporanUser] = React.useState();
  const [laporanUserTotalASC, setLaporanUserTotalASC] = React.useState();
  const [laporanUserTotalDSC, setLaporanUserTotalDSC] = React.useState();
  const [sortirTotalASC, setSortirTotalASC] = React.useState(false);
  const [sortirTotalDSC, setSortirTotalDSC] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState("");
  const [searchByUser, setSearchByUser] = React.useState();
  const [searchOn, setSearchOn]=React.useState(false);
  const [loadingStat, setLoadingStat]=React.useState(false);

  const { userSalesReportPaginate, userSalesReportPaginateLength, userSalesSearchPaginate, userSalesSearchPaginateLength,
    userSalesTotalASCPaginate, userSalesTotalASCPaginateLength, userSalesTotalDSCPaginate, userSalesTotalDSCPaginateLength } = useSelector((state) => {
    return {
        userSalesReportPaginate: state.userSalesReportReducers.userSalesReportPaginate,
        userSalesReportPaginateLength: state.userSalesReportReducers.userSalesReportPaginateLength,
        userSalesSearchPaginate: state.userSalesReportReducers.userSalesSearchPaginate,
        userSalesSearchPaginateLength: state.userSalesReportReducers.userSalesSearchPaginateLength,
        userSalesTotalASCPaginate: state.userSalesReportReducers.userSalesTotalASCPaginate,
        userSalesTotalASCPaginateLength: state.userSalesReportReducers.userSalesTotalASCPaginateLength,
        userSalesTotalDSCPaginate: state.userSalesReportReducers.userSalesTotalDSCPaginate,
        userSalesTotalDSCPaginateLength: state.userSalesReportReducers.userSalesTotalDSCPaginateLength,
    }
})

  React.useEffect(()=>{
    getPaginatedUserSalesReport()
  }, [])

  const getPaginatedUserSalesReport = (page = 0) => {
    // console.log("getUserss else jalannnnnnn")
        dispatch(getUserSalesReportPaginateAction(page + 1))
  }

  const getPaginatedSearchUser = (page = 0) => {
    dispatch(getSearchUserPaginateAction(page + 1, searchUser))
}

  const getPaginatedUserTotalASC = (page = 0) => {
    dispatch(getUserTotalASCPaginateAction(page + 1))
}

  const getPaginatedUserTotalDSC = (page = 0) => {
    dispatch(getUserTotalDSCPaginateAction(page + 1))
}

  const handlePaginate = (paginate) => {
    getPaginatedUserSalesReport(paginate);
  }

  const handlePaginateSearchUser = (paginate) => {
    getPaginatedUserSalesReport(paginate);
  }

  const handlePaginateUserTotalASC = (paginate) => {
    getPaginatedUserTotalASC(paginate);
  }

  const handlePaginateUserTotalDSC = (paginate) => {
    getPaginatedUserTotalDSC(paginate);
  }


  const handleSortTotalASC =async()=>{
    try {
      setSortirTotalDSC(false)
      setSortirTotalASC(true)
      // console.log("SORTIR TOTAL ASC JALANNNNNN")
      {getPaginatedUserTotalASC()}
      } catch (err) {
    }
  }
  
  const handleSortTotalDSC =async()=>{
    try {
      setSortirTotalASC(false)
      setSortirTotalDSC(true)
      // console.log("SORTIR TOTAL DSC JALANNNNNN")
      {getPaginatedUserTotalDSC()}
      } catch (err) {
    }
  }

const handleSearch =async()=>{
  try {
    if(searchUser){
        setSearchOn(true)
        // console.log("searchOn JALANNNNNN")
        getPaginatedSearchUser()
      }
    } catch (err) {
  }
}

const printBtnPagination = () => {
  let btn = []
  if (searchOn == true){
    for (let i = 0; i < Math.ceil(userSalesSearchPaginateLength / 10); i++) {
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
              onClick={() => handlePaginateSearchUser(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  } else if(sortirTotalASC == true){
    for (let i = 0; i < Math.ceil(userSalesTotalASCPaginateLength / 10); i++) {
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
              onClick={() => handlePaginateUserTotalASC(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  } else if(sortirTotalDSC == true){
    for (let i = 0; i < Math.ceil(userSalesTotalDSCPaginateLength / 10); i++) {
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
              onClick={() => handlePaginateUserTotalDSC(i)}
          >
              {i + 1}
          </Box>
      )
  }
  return btn;
  } else {
    for (let i = 0; i < Math.ceil(userSalesReportPaginateLength / 10); i++) {
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

  const printLaporanUser = () => {
    if(searchOn == true){
      if(userSalesSearchPaginate == undefined){
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
        return userSalesSearchPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.name}</Td>
                <Td>{value.email}</Td>
                <Td>{value.phone}</Td>
                <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.name}</Td>
                <Td>{value.email}</Td>
                <Td>{value.phone}</Td>
                <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (sortirTotalASC == true){
      if(userSalesTotalASCPaginate == undefined){
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
        return userSalesTotalASCPaginate.map((value, index)=>{
          // console.log("VALUEEEE", value)
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.name}</Td>
                <Td>{value.email}</Td>
                <Td>{value.phone}</Td>
                <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.name}</Td>
                <Td>{value.email}</Td>
                <Td>{value.phone}</Td>
                <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else if (sortirTotalDSC == true){
      if(userSalesTotalDSCPaginate == undefined){
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
        return userSalesTotalDSCPaginate.map((value, index)=>{
          if (index % 2 == 0){
            return (
              <Tr>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.name}</Td>
                <Td>{value.email}</Td>
                <Td>{value.phone}</Td>
                <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
              </Tr>
            )
          } else {
            return (
              <Tr style={{backgroundColor:"#ebeef3"}}>
                <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
                <Td>{value.name}</Td>
                <Td>{value.email}</Td>
                <Td>{value.phone}</Td>
                <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
              </Tr>
            )
          }
        })
      }
    } else {
      return userSalesReportPaginate.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
              <Td>{value.name}</Td>
              <Td>{value.email}</Td>
              <Td>{value.phone}</Td>
              <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.pageNumber > 0 ? value.pageNumber + index + 1 : index + 1}</Td>
              <Td>{value.name}</Td>
              <Td>{value.email}</Td>
              <Td>{value.phone}</Td>
              <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
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

  return( <>
    <div class="row mb-4 mt-4" style={{marginLeft:"10px", marginRight:"10px"}}>
      <div class="col-md-4">
        <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="Cari Email Pembeli"
          onChange={(e)=>setSearchUser(e.target.value)}/>
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
            </Box>
            {
              searchOn == true &&
            <Box mt={"3px"} ms={"10px"}>
              <Button class="btn-def" onClick={()=> {(setSearchOn(false));(setSearchUser(""))}}>Batal Cari</Button>
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
              <Th style={{color:"#FFFFFF"}}>Nama</Th>
              <Th style={{color:"#FFFFFF"}}>Email</Th>
              <Th style={{color:"#FFFFFF"}}>Telfon</Th>
              <Th isNumeric style={{color:"#FFFFFF"}}>Total</Th>
            </Tr>
          </Thead>
          {
              userSalesReportPaginate == undefined ?
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
                {printLaporanUser()}
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

export default SalesReportByUser;