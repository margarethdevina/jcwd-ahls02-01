import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { Box, Input, Image, Text, Spinner, Button } from '@chakra-ui/react';
import VectorForgot from "../../Assets/DevImage/Forgot.png"
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";


const ForgotPassword=(props)=>{
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailForgot, setEmailForgot]=React.useState("")
  const toast = useToast()
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();


  const handleSubmit =async()=>{
    try {
      setLoadingStat(true)
      if (emailForgot==""){
        newToast({
          title: 'Lupa Password Tidak Berhasil.',
          description: 'Masukan email anda.',
          status: 'error',
        })
        setLoadingStat(false)
      }else{
        // console.log("emailfor", emailForgot)
      let res = await Axios.post(`${API_URL}/users/forgot`, {
        email: emailForgot
      })
      // console.log("res", res)
      if (res.data) {
        // console.log("res.data forgotPassword", res.data)
        localStorage.setItem("tokenIdUser", res.data.token)
        newToast({
          title: 'Lupa Password Berhasil.',
          description: 'Masukkan password baru melalui link yang dikirim ke email anda',
          status: 'success',
        })
        setLoadingStat(false)
        }
      }
    } catch (err) {
      newToast({
        title: 'Lupa Password Tidak Berhasil.',
        description: 'Masukkan email yang sudah terdaftar di medhika',
        status: 'error',
      })
      setLoadingStat(false)
    }
  }
// console.log(emailForgot)

  return( <>
  <Box
      w='100%'
      h='100%'
      bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
    <div class="container text-center pt-4 pb-5">
    <Text class="h4">Forgot Password</Text>
    <br />
    <hr />
    <br />
    <div class="row">
      <div class="col-md-4 col-sm-0">
      </div>
      <div class="col-md-4 col-sm-12">
        <Box>
          <Text class="h5">Email</Text>
          <Input shadow={"md"} type="email" placeholder="Input Your Email" onChange={(e)=>setEmailForgot(e.target.value)}/>
        </Box>
        <div class="d-grid gap-2 mx-auto mt-3">
          {
            loadingStat == true ?
            <>
              <Button class="btn btn-danger">
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
              <Button class="btn btn-danger" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          }
            <Image src={VectorForgot} width='100%' style={{marginLeft:"10px", marginTop:"30px"}}/>
        </div>
        <br />
      <div class="col-md-4 col-sm-0">
      </div>
    </div>
      </div>
  </div>
  </Box>
  </>
  )
}

export default ForgotPassword;