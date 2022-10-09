import Axios from "axios";
import React from "react";
import {Bar, Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Text, useMediaQuery, Image, IconButton, Flex, Box, Divider, Spacer, Select, Menu, MenuButton,
  MenuList, MenuItem, Button } from '@chakra-ui/react';
import logo2 from "../../Assets/DevImage/LogoMedhikaPutih.png";
import Sidebar from "../../Components/Admin/Sidebar";



const Dashboard=(props)=>{
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const [profitHariIni, setProfitHariIni] = React.useState();
  const [penjualanHariIni, setPenjualanHariIni] = React.useState();
  const [menungguPembayaran, setMenungguPembayaran] = React.useState();
  const [konfirmasiPembayaran, setKonfirmasiPembayaran] = React.useState();
  const [sedangProses, setSedangProses] = React.useState();
  const [sedangDikirim, setSedangDikirim] = React.useState();
  const [pesananTerkonfirmasi, setPesananTerkonfirmasi] = React.useState();
  const [pesananDibatalkan, setPesananDibatalkan] = React.useState();
  const [stockAkanHabis, setStockAkanHabis] = React.useState();
  const [profitMingguan, setProfitMingguan] = React.useState();
  const [penjualanObatMingguan, setPenjualanObatMingguan] = React.useState();
  const [penjualanObatRacikMingguan, setPenjualanObatRacikMingguan] = React.useState();
  const [profitBulanan, setProfitBulanan] = React.useState();
  const [penjualanObatBulanan, setPenjualanObatBulanan] = React.useState();
  const [penjualanObatRacikBulanan, setPenjualanObatRacikBulanan] = React.useState();
  const [filterProfit, setFilterProfit] = React.useState(false);
  const [filterPenjualanObat, setFilterPenjualanObat] = React.useState(false);
  

  React.useEffect(()=>{
    getProfitHariIni()
    getPenjualanHariIni()
    getMenungguPembayaran()
    getKonfirmasiPembayaran()
    getSedangProses()
    getSedangDikirim()
    getPesananTerkonfirmasi()
    getPesananDibatalkan()
    getStockAkanHabis()
    getProfitMingguan()
    getPenjualanObatMingguan()
    getProfitBulanan()
    getPenjualanObatBulanan()
  }, [])

  const current = new Date();
  const labelHarian = [
    `${current.getDate()-6}/${current.getMonth()+1}`,
    `${current.getDate()-5}/${current.getMonth()+1}`,
    `${current.getDate()-4}/${current.getMonth()+1}`,
    `${current.getDate()-3}/${current.getMonth()+1}`,
    `${current.getDate()-2}/${current.getMonth()+1}`,
    `${current.getDate()-1}/${current.getMonth()+1}`,
    `${current.getDate()}/${current.getMonth()+1}`]
    
  const dataProfitHarian = {
    labels: labelHarian,
    datasets: [{
      label: 'Profit Harian',
      // data: [10, 20, 30, 40, 0, 50, 60],
      data: profitMingguan,
      fill: true,
      backgroundColor: 'rgba(222,27,81,0.2)',
      borderColor: "#de1b51",
      tension: 0.3
    }],
  };

  const dataPenjualanObatHarian = {
    labels: labelHarian,
    datasets: [{
      label: "Obat Bebas",
      data: penjualanObatMingguan,
      backgroundColor: "#586BB1",
    },
    {
      label: "Obat Racikan",
      data: penjualanObatRacikMingguan,
      backgroundColor: "#de1b51",
    }]
  };
  
  const labelMingguan = [
    `Minggu-1`,
    `Minggu-2`,
    `Minggu-3`,
    `Minggu-4`,
    `Minggu-5`]

  const dataProfitMingguan = {
    labels: labelMingguan,
    datasets: [{
      label: 'Profit Mingguan',
      // data: [10, 20, 30, 40, 0, 50, 60],
      data: profitBulanan,
      fill: true,
      backgroundColor: 'rgba(222,27,81,0.2)',
      borderColor: "#de1b51",
      tension: 0.3
    }],
  };

  const dataPenjualanObatMingguan = {
    labels: labelMingguan,
    datasets: [{
      label: "Obat Bebas",
      data: penjualanObatBulanan,
      backgroundColor: "#586BB1",
    },
    {
      label: "Obat Racikan",
      data: penjualanObatRacikBulanan,
      backgroundColor: "#de1b51",
    }]
  };

  // console.log("PROFIT HARI INIII", profitHariIni)
  const getProfitHariIni = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getProfitHariIni`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET PROFIT HARI INI", res.data)
        setProfitHariIni(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("PENJUALAN HARI INIII", penjualanHariIni)
  const getPenjualanHariIni = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getPenjualanHariIni`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET PENJUALAN HARI INI", res.data)
        setPenjualanHariIni(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("MENUNGGU PEMBAYARANNNN", menungguPembayaran)
  const getMenungguPembayaran = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getMenungguPembayaran`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET MENUNGGU PEMBAYARAN", res.data)
        setMenungguPembayaran(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("Konfirmasi PEMBAYARANNNN", konfirmasiPembayaran)
  const getKonfirmasiPembayaran = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getKonfirmasiPembayaran`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET Konfirmasi PEMBAYARAN", res.data)
        setKonfirmasiPembayaran(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("SedangProses", sedangProses)
  const getSedangProses = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getSedangProses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET SedangProses", res.data)
        setSedangProses(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("SedangDikirim", sedangDikirim)
  const getSedangDikirim = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getSedangDikirim`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET SedangDikirim", res.data)
        setSedangDikirim(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("PesananTerkonfirmasi", pesananTerkonfirmasi)
  const getPesananTerkonfirmasi = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getPesananTerkonfirmasi`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET PesananTerkonfirmasi", res.data)
        setPesananTerkonfirmasi(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("PesananDibatalkan", pesananDibatalkan)
  const getPesananDibatalkan = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getPesananDibatalkan`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET PesananDibatalkan", res.data)
        setPesananDibatalkan(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("Stock Obat Habis", stockAkanHabis)
  const getStockAkanHabis = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getStockAkanHabis`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET StockAkanHabis", res.data)
        setStockAkanHabis(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("PROFIT MINGGUAN", profitMingguan)
  const getProfitMingguan = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getProfitMingguan`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET PROFIT MINGGUANNN", res.data)
        setProfitMingguan(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("PenjualanObat MINGGUAN", penjualanObatMingguan)
  // console.log("PenjualanObatRacik MINGGUAN", penjualanObatRacikMingguan)
  const getPenjualanObatMingguan = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getPenjualanObatMingguan`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET PenjualanObat MINGGUANNN", res.data)
        setPenjualanObatMingguan(res.data.penjualanObatHarian)
        setPenjualanObatRacikMingguan(res.data.penjualanObatRacikHarian)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("PROFIT BULANAN", profitBulanan)
  const getProfitBulanan = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getProfitBulanan`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET PROFIT BULANANN", res.data)
        setProfitBulanan(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("PenjualanObat BULANAN", penjualanObatBulanan)
  // console.log("PenjualanObatRacik BULANAN", penjualanObatRacikBulanan)
  const getPenjualanObatBulanan = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getPenjualanObatBulanan`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        // console.log("RES DATA GET PenjualanObat BULANANN", res.data)
        setPenjualanObatBulanan(res.data.penjualanObatMingguan)
        setPenjualanObatRacikBulanan(res.data.penjualanObatRacikMingguan)
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  const dateFunction = () => {
    const current = new Date();
    const month = current.getMonth() + 1
    if (month == 1) {
      const date = `${current.getDate()} Januari ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 2) {
      const date = `${current.getDate()} Februari ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 3) {
      const date = `${current.getDate()} Maret ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 4) {
      const date = `${current.getDate()} April ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 5) {
      const date = `${current.getDate()} Mei ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 6) {
      const date = `${current.getDate()} Juni ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 7) {
      const date = `${current.getDate()} Juli ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 8) {
      const date = `${current.getDate()} Agustus ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 9) {
      const date = `${current.getDate()} September ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 10) {
      const date = `${current.getDate()} Oktober ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 11) {
      const date = `${current.getDate()} November ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 12) {
      const date = `${current.getDate()} Desember ${current.getFullYear()}`;
      return (
        date
      )
    }
  }
  const dateFunctionProfit = () => {
    const current = new Date();
    const month = current.getMonth() + 1
    if (month == 1) {
      const date = `Januari ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 2) {
      const date = `Februari ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 3) {
      const date = `Maret ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 4) {
      const date = `April ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 5) {
      const date = `Mei ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 6) {
      const date = `Juni ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 7) {
      const date = `Juli ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 8) {
      const date = `Agustus ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 9) {
      const date = `September ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 10) {
      const date = `Oktober ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 11) {
      const date = `November ${current.getFullYear()}`;
      return (
        date
      )
    } else if (month == 12) {
      const date = `Desember ${current.getFullYear()}`;
      return (
        date
      )
    }
  }
  
  const printProfit = () => {
      if (profitHariIni[0].totalTransaksi != null){
        return (
          <Box mt={"15px"}>
            <Text class="h4b">Rp {profitHariIni[0].totalTransaksi.toLocaleString()}</Text> 
          </Box>
        )
      } else {
        return (
          <Box mt={"15px"}>
            <Text class="h4b">Rp 0</Text> 
          </Box>
        )
      }
  }

  const printStockAkanHabis = () => {
    return stockAkanHabis.map((value,index)=>{
      if (value.productName != null){
        return (
          <Box mt={"15px"}>
            <Text class="h6">{index+1}. {value.productName}</Text> 
          </Box>
        )
      } else {
        return (
          <Box mt={"15px"}>
            <Text class="h4b"> </Text> 
          </Box>
        )
      }
    })
  }

  return( <>
    <Box
        w='100%'
        h='100%'
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
            <Box mt={"35px"} mb={"10px"}>
              <Text class="h5b">Analisis Produk & Toko</Text>
              <Text class="h6">{dateFunction()}</Text>
            </Box>
              <div class="row">
              <div class="mt-2 col-md-3">
                <div class="rounded-4 shadow ps-4 p-3 mb-3" style={{backgroundColor:"#f6f8fc", height:"120px"}}>
                  <Text class="h6">Profit Hari Ini</Text>
                  {
                    profitHariIni == undefined ?
                      <div>
                        <Box mt={"15px"}>
                          <Text class="h4b">Rp 0</Text> 
                        </Box>
                      </div>
                  :
                    printProfit()
                  }
                </div>
              </div>
              <div class="mt-2 col-md-3">
                <div class="rounded-4 shadow ps-4 p-3 mb-3" style={{backgroundColor:"#f6f8fc", height:"120px"}}>
                  <Text class="h6">Penjualan Hari Ini</Text>
                  {
                    penjualanHariIni == undefined ?
                      <div>
                        <Box mt={"15px"}>
                          <Text class="h4b">0 Transaksi</Text> 
                        </Box>
                      </div>
                  :
                  <Box mt={"15px"}>
                    <Text class="h4b">{penjualanHariIni.length} Transaksi</Text> 
                  </Box>
                  }
                </div>
              </div>
              <div class="col-md-6"></div>
              </div>
              <div class="row">
                <Box mt={"15px"}>
                  <Text class="h5b">Penting Hari Ini</Text>
                  <Text class="h6">Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan pelanggan</Text>
                </Box>
                <div class="mt-2 col-md-8">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="rounded-4 shadow p-3 mb-3 text-center" style={{backgroundColor:"#f6f8fc", height:"120px"}}>
                        <Text class="h6">Menunggu Pembayaran</Text>
                        {
                          menungguPembayaran == undefined ?
                            <div>
                              <Box mt={"15px"}>
                                <Text class="h4b">0</Text> 
                              </Box>
                            </div>
                        :
                        <Box mt={"15px"}>
                          <Text class="h4b">{menungguPembayaran.length}</Text> 
                        </Box>
                        }
                      </div>
                      <div class="rounded-4 shadow p-3 mb-3 text-center" style={{backgroundColor:"#f6f8fc", height:"120px"}}>
                        <Text class="h6">Sedang Dikirim</Text>
                        {
                          sedangProses == undefined ?
                            <div>
                              <Box mt={"15px"}>
                                <Text class="h4b">0</Text> 
                              </Box>
                            </div>
                        :
                          <Box mt={"15px"}>
                            <Text class="h4b">{sedangProses.length}</Text> 
                          </Box>
                        }
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="rounded-4 shadow p-3 mb-3 text-center" style={{backgroundColor:"#f6f8fc", height:"120px"}}>
                        <Text class="h6">Konfirmasi Pembayaran</Text>
                        {
                          konfirmasiPembayaran == undefined ?
                            <div>
                              <Box mt={"15px"}>
                                <Text class="h4b">0</Text> 
                              </Box>
                            </div>
                        :
                        <Box mt={"15px"}>
                          <Text class="h4b">{konfirmasiPembayaran.length}</Text> 
                        </Box>
                        }
                      </div>
                      <div class="rounded-4 shadow p-3 mb-3 text-center" style={{backgroundColor:"#f6f8fc", height:"120px"}}>
                        <Text class="h6">Pesanan Terkonfirmasi</Text>
                        {
                          pesananTerkonfirmasi == undefined ?
                            <div>
                              <Box mt={"15px"}>
                                <Text class="h4b">0</Text> 
                              </Box>
                            </div>
                        :
                          <Box mt={"15px"}>
                            <Text class="h4b">{pesananTerkonfirmasi.length}</Text> 
                          </Box>
                        }
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="rounded-4 shadow p-3 mb-3 text-center" style={{backgroundColor:"#f6f8fc", height:"120px"}}>
                        <Text class="h6">Sedang Proses</Text>
                        {
                          sedangProses == undefined ?
                            <div>
                              <Box mt={"15px"}>
                                <Text class="h4b">0</Text> 
                              </Box>
                            </div>
                        :
                          <Box mt={"15px"}>
                            <Text class="h4b">{sedangProses.length}</Text> 
                          </Box>
                        }
                      </div>
                      <div class="rounded-4 shadow p-3 mb-3 text-center" style={{backgroundColor:"#f6f8fc", height:"120px"}}>
                        <Text class="h6">Dibatalkan</Text>
                        {
                          pesananDibatalkan == undefined ?
                            <div>
                              <Box mt={"15px"}>
                                <Text class="h4b">0</Text> 
                              </Box>
                            </div>
                        :
                          <Box mt={"15px"}>
                            <Text class="h4b">{pesananDibatalkan.length}</Text> 
                          </Box>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-2 col-md-2">
                  <div class="rounded-4 shadow p-3 mb-5" style={{backgroundColor:"rgba(222,27,81,0.2)", height:"255px"}}>
                    <Text style={{color:"#9B1339"}} class="h6b">Stock Obat Akan Habis</Text>
                    <Divider style={{borderColor:"#9B1339"}}/>
                    {
                    stockAkanHabis == undefined ?
                      <div>
                        <Box mt={"15px"}>
                          <Text class="h4b"> </Text> 
                        </Box>
                      </div>
                  :
                    printStockAkanHabis()
                  }
                  </div>
                </div>
                <div class="col-md-2"></div>
              </div>
              <div class="row">
                <div class="mt-2 col-md-5">
                  <div class="rounded-4 shadow p-3 mb-5" style={{backgroundColor:"#f6f8fc"}}>
                    <div class="row">
                      <div class="col-md-4">
                        <Text class="h5b">Profit</Text>
                      </div>
                      <div class="col-md-4"></div>
                      <div class="col-md-4">
                        <Menu>
                          {({ isOpen }) => (
                            <>
                              <MenuButton isActive={isOpen} as={Button} size={"sm"} width={"100px"} boxShadow={"md"}>
                                {isOpen ? 'Close' : 'Filter'}
                              </MenuButton>
                              <MenuList>
                                <MenuItem onClick={() => setFilterProfit(false)}>Profit Mingguan</MenuItem>
                                <MenuItem onClick={() => setFilterProfit(true)}>Profit Bulanan</MenuItem>
                              </MenuList>
                            </>
                          )}
                        </Menu>
                      </div>
                    </div>
                    {
                      filterProfit == true ?
                      <div>
                        <Text class="text-muted">Data Bulan {dateFunctionProfit()}</Text>
                          <Line
                            data={dataProfitMingguan}
                          />
                      </div>
                    :
                      <div>
                        <Text class="text-muted">Data 7 hari terakhir</Text>
                          <Line
                            data={dataProfitHarian}
                          />
                      </div>
                    }
                  </div>
                </div>
                <div class="mt-2 col-md-5">
                  <div class="rounded-4 shadow p-3 mb-5" style={{backgroundColor:"#f6f8fc"}}>
                    <div class="row">
                      <div class="col-md-6">
                        <Text class="h5b">Penjualan Obat</Text>
                      </div>
                      <div class="col-md-2"></div>
                      <div class="col-md-4">
                        <Menu>
                          {({ isOpen }) => (
                            <>
                              <MenuButton isActive={isOpen} as={Button} size={"sm"} width={"100px"} boxShadow={"md"}>
                                {isOpen ? 'Close' : 'Filter'}
                              </MenuButton>
                              <MenuList>
                                <MenuItem onClick={() => setFilterPenjualanObat(false)}>Penjualan Obat Mingguan</MenuItem>
                                <MenuItem onClick={() => setFilterPenjualanObat(true)}>Penjualan Obat Bulanan</MenuItem>
                              </MenuList>
                            </>
                          )}
                        </Menu>
                      </div>
                    </div>
                    {
                      filterPenjualanObat == true ?
                      <div>
                        <Text class="text-muted">Data Bulan {dateFunctionProfit()}</Text>
                          <Bar
                            data={dataPenjualanObatMingguan}
                          />
                      </div>
                    :
                      <div>
                        <Text class="text-muted">Data 7 hari terakhir</Text>
                          <Bar
                            data={dataPenjualanObatHarian}
                          />
                      </div>
                    }
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

export default Dashboard;