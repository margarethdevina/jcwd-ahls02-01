import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from "react-router-dom";
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { IoIosWarning } from "react-icons/io";
import { Button, Text, Box, useMediaQuery, Spinner } from "@chakra-ui/react";
import { loginAction } from "../../Redux/Actions/userActions";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";


const Verification=(props)=>{
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast()
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState("");
  const [blacklist, setBlacklist] = React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const [loadingStat, setLoadingStat]=React.useState(false);
  const {isVerified, users, name, profilePicture, token}=useSelector((state) => {
    return {
        isVerified:state.userReducers.isVerified,
        users:state.userReducers.users,
        name:state.userReducers.name,
        profilePicture:state.userReducers.profilePicture,
        token:state.userReducers.token
        }
    })

    React.useEffect(() => {
      getTokens();
  }, []);

  // console.log("params",params.token);
  // console.log("isVerified", isVerified);

  const handleVerified =async()=>{
    try {
      setLoadingStat(true)
      if (params.token) {
        let res = await Axios.patch(`${API_URL}/users/verified`, {}, {
          headers: {
            'Authorization': `Bearer ${params.token}`
          }
        })
        // console.log("RES.DATA.TOKEN verified", res.data.token)
        if (res.data.token) {
          localStorage.setItem("tokenIdUser", res.data.token)
          dispatch(loginAction(res.data))
          newToast({
            title: 'Verifikasi Berhasil.',
            description: 'Akun anda sudah terverifikasi, selamat belanja',
            status: 'success',
          })
          setLoadingStat(false)
          navigate("/")
        }
      }
    } catch (err) {
      newToast({
        title: 'Verifikasi Tidak Berhasil.',
        description: err.response.data.message,
        status: 'error',
      })
      setLoadingStat(false)
    }
  }

  // console.log("blacklist",blacklist);
  const getTokens= async ()=>{
    try {
      // console.log("getTokens jalan");
      // console.log("params",params.token);
      if (params.token) {
        let res = await Axios.post(`${API_URL}/users/getTokens`, {
          token: params.token
        }, {
          headers: {
            'Authorization': `Bearer ${params.token}`
          }
        })
        // memeriksa adanya data user atau tidak
        // console.log("RES.DATA.TOKEN verified", res.data)
        if (res.data.message == "token valid") {
          setBlacklist(true)
        } else {
          setBlacklist(false)
  
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return( 
    <>
    <Box
      w='100%'
      h='100%'
      bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
      {
        blacklist == true ?
        <>
          <div class="">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="text-center pt-5 pb-5">
            <div class="d-flex justify-content-center">
              {
                isLargerThan1280 ?
                <BsFillPersonCheckFill size={100} style={{color:"#DE1B51"}}/>
              :
                <BsFillPersonCheckFill size={60} style={{color:"#DE1B51"}}/>
              }
            </div>
              <Text class="h6" style={{marginLeft:"15px", marginRight:"15px"}}>Setelah verifikasi, Anda dapat melakukan transaksi di Medhika.</Text>
            </div>
            <div class="d-flex justify-content-center">
              {
                loadingStat == true ?
                <>
                  <Button class="btn-def_second">
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
                <>
                  <Button class="btn-def_second"
                    onClick={handleVerified}>Verifikasi Akun Anda
                  </Button>
                </>
              }
              
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          </>
        :
        <div class="container text-center">
          <div class="row mt-5">
            <div class="col-md-4">

            </div>
            <div class="col-md-4">
              <div class="d-flex justify-content-center">
              {
                isLargerThan1280 ?
                <IoIosWarning class="mt-5" size={"150px"} style={{color:"#DE1B51"}} />
              :
                <IoIosWarning class="mt-5" size={"100px"} style={{color:"#DE1B51"}} />
              }
              </div>
              <Text class="h5">Invalid Token</Text>
              <Button class="btn-def_second mt-3 h5b" onClick={() => navigate("/")}>Close this page</Button>
            </div>
            <div class="col-md-4">

            </div>
          </div>
        </div>
      }
      </Box>
    </>
  )
}

export default Verification;