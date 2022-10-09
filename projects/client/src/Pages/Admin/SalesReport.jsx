import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Text, useMediaQuery, Box, 
        Tr, Td, Tabs, TabList, Tab, TabPanels, TabPanel} from '@chakra-ui/react';
import Sidebar from "../../Components/Admin/Sidebar";
import SalesReportByTransaction from "../../Components/Admin/SalesReportByTransaction";
import SalesReportByProduct from "../../Components/Admin/SalesReportByProduct";
import SalesReportByUser from "../../Components/Admin/SalesReportByUser";


const SalesReport=(props)=>{
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [salesByInvoice, setSalesByInvoice] = React.useState();
  const [tabIndex, setTabIndex] = React.useState(0);

  React.useEffect(()=>{
    getSalesByInvoice()
  }, [])

  // console.log("PROFIT HARI INIIII", salesByInvoice)

  const getSalesByInvoice = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoice`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET SALES BY INVOICE", res.data)
        setSalesByInvoice(res.data)
      }
    } catch (error) {
      console.log(error)
    }
}

  const printSalesByInvoice = () => {
    return salesByInvoice.map((value, index)=>{
      if (index % 2 == 0){
        return (
          <Tr>
            <Td>{index+1}</Td>
            <Td>{value.dateFE}</Td>
            <Td>Nomer Invoice: {value.invoiceNumber}</Td>
            <Td>{value.name}</Td>
            <Td isNumeric>{value.totalTransaksi}</Td>
          </Tr>
        )
      } else {
        return (
          <Tr style={{backgroundColor:"#ebeef3"}}>
            <Td>{index+1}</Td>
            <Td>{value.dateFE}</Td>
            <Td>Nomer Invoice: {value.invoiceNumber}</Td>
            <Td>{value.name}</Td>
            <Td isNumeric>{value.totalTransaksi}</Td>
          </Tr>
        )
      }
    })
  }

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
              <Text class="h5b">Laporan Penjualan</Text>
            </Box>
              <div class="row">
                <div class="mt-2 col-md-10">
                  <div class="rounded-4 shadow p-3" style={{backgroundColor:"#f6f8fc", height:"100%"}}>
                        <Box
                          borderRadius={5}
                        >
                          <Tabs
                            variant='soft-rounded'
                            isFitted='true'
                            className="font-brand"
                            orientation={{ base: 'vertical', md: 'horizontal' }}
                            defaultIndex={tabIndex}
                            onChange={(e) => setTabIndex(e)}
                          >
                            <TabList>
                              <Tab
                                _selected={{
                                color: 'var(--colorOne)',
                                bg: 'var(--colorSix)',
                                }}
                              >
                              Laporan Transaksi Penjualan
                              </Tab>
                              <Tab
                                _selected={{
                                color: 'var(--colorOne)',
                                bg: 'var(--colorSix)',
                                }}
                              >
                                Laporan Penjualan Produk
                              </Tab>
                              <Tab
                                _selected={{
                                color: 'var(--colorOne)',
                                bg: 'var(--colorSix)',
                                }}
                              >
                                Laporan Total Transaksi User
                              </Tab>
                            </TabList>
                            <TabPanels>
                              <TabPanel>
                                <SalesReportByTransaction />
                              </TabPanel>
                              <TabPanel>
                                <SalesReportByProduct />
                              </TabPanel>
                              <TabPanel>
                                <SalesReportByUser />
                              </TabPanel>
                            </TabPanels>
                          </Tabs>
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

export default SalesReport;