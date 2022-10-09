import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { Button, Text, Box, Input, Progress, InputGroup, InputRightElement, Image, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { useToast } from '@chakra-ui/react';
import { logoutAction } from "../../Redux/Actions/userActions";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import VectorChangePassword from "../../Assets/DevImage/Reset.png"

const ResetPassword=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [password, setPassword]=React.useState("");
  const [progressPassword, setProgressPassword]=React.useState(0);
  const [colorProgress, setColorProgress]=React.useState("");
  const [passwordLength, setPasswordLength]=React.useState(false);
  const [containsNumbers, setContainsNumbers]=React.useState(false);
  const [isUpperCase, setIsUpperCase]=React.useState(false);
  const [confirmPassword, setConfirmPassword]=React.useState("");
  const toast = useToast()
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const [blacklist, setBlacklist] = React.useState(false);
  const { token }=useSelector((state) => {
    return {
        token:state.userReducers.token
      }
    })

    React.useEffect(() => {
      getTokens();
  }, []);

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
          //
          setBlacklist(true)
        } else {
          setBlacklist(false)
  
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("password", password)
  // console.log("konfirmasi password", confirmPassword)
  // console.log("token reset", token)
  // console.log("params",params.token);
  // console.log("BOOLEAN TOKEN params",token == params.token);


  const [inForm, setInForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleReset =async()=>{
    try {
      setLoadingStat(true);
      checkStrongPassword();
      if (password=="" || confirmPassword==""){
        newToast({
          title: 'Reset Password Tidak Berhasil.',
          description: 'Mohon isi password dan konfirmasi password.',
          status: 'error',
        })
        setLoadingStat(false)
      } else{
        if (password!=confirmPassword){
          newToast({
            title: 'Reset Password Tidak Berhasil.',
            description: 'Konfirmasi password tidak sesuai dengan password.',
            status: 'error',
          })
          setLoadingStat(false)
        } else {
          // console.log("reset password jalannnn")
          let res = await Axios.patch(`${API_URL}/users/reset`, { newPassword: password },
          {
            headers: {
              'Authorization': `Bearer ${params.token}`
            }
          })
          if (res.data) {
            dispatch(logoutAction())
            newToast({
              title: 'Reset Password Berhasil.',
              description: 'Silahkan login dengan password baru anda.',
              status: 'success',
            })
            setLoadingStat(false)
            navigate("/")
          }
        } 
      }    
    } catch (err) {
      newToast({
        title: 'Reset Password Tidak Berhasil.',
        description: 'Coba lakukan kembali dengan data yang benar',
        status: 'error',
      })
      setLoadingStat(false)
  }
  }

  const handleInput = (value, property) => {
    setInForm({ ...inForm, [property]: value})
    checkUpperCase();
    checkNumbers();
    checkPasswordLength();
    if(!inForm.password.match(/^(?=.*[A-Z])/) == false && inForm.password.length > 6 && !inForm.password.match(/\d+/g) == false){
      setProgressPassword(100);
      setColorProgress("telegram")
    } else if (!inForm.password.match(/^(?=.*[A-Z])/) == false && inForm.password.length < 7 && !inForm.password.match(/\d+/g) == false){
      setProgressPassword(70);
      setColorProgress("orange")
    } else if (!inForm.password.match(/^(?=.*[A-Z])/) == false && inForm.password.length > 6 && !inForm.password.match(/\d+/g) == true){
      setProgressPassword(70);
      setColorProgress("orange")
    } else if (!inForm.password.match(/^(?=.*[A-Z])/) == true && inForm.password.length > 6 && !inForm.password.match(/\d+/g) == false){
      setProgressPassword(70);
      setColorProgress("orange")
    } else if (!inForm.password.match(/^(?=.*[A-Z])/) == false && inForm.password.length < 7 && !inForm.password.match(/\d+/g) == true){
      setProgressPassword(35);
      setColorProgress("red")
    } else if (!inForm.password.match(/^(?=.*[A-Z])/) == true && inForm.password.length < 7 && !inForm.password.match(/\d+/g) == false){
      setProgressPassword(35);
      setColorProgress("red")
    } else if (!inForm.password.match(/^(?=.*[A-Z])/) == true && inForm.password.length > 6 && !inForm.password.match(/\d+/g) == true){
      setProgressPassword(35);
      setColorProgress("red")
    }
  }

  const checkStrongPassword =()=>{
    // console.log(isUpperCase, containsNumbers, passwordLength)
    if(passwordLength== false || isUpperCase==false ||
      containsNumbers==false ){
        newToast({
          title: 'Password Lemah.',
          description: 'Disarankan untuk merubah password yang kuat. setidaknya memiliki 8 huruf yang terdiri dari huruf kapital dan angka',
          status: 'warning',
        })
  }
}

const checkPasswordLength=()=>{
  if(inForm.password.length > 6){
    setPasswordLength(true);
  } else {
    setPasswordLength(false)
  }
}

const checkUpperCase=()=>{
  // console.log("cek uppercase", isUpperCase)
  if (inForm.password.match(/^(?=.*[A-Z])/)){
    setIsUpperCase(true)
  } else {
    setIsUpperCase(false)
  }
}

const checkNumbers=()=>{
  // console.log("cek number", containsNumbers)
  if (inForm.password.match(/\d+/g)){
    setContainsNumbers(true)
  } else {
    setContainsNumbers(false)
  }
}

  return( <>
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
      <div className="container text-center pt-5 pb-5">
        <h4 className="h4-register">Create New Password</h4>
        <br />
        <hr />
        <br />
        <div className="row">
          <div className="col-md-4 col-sm-0">
          </div>
          <div className="col-md-4 col-sm-12">
          <Box marginTop={"20px"}>
                <Text class="h6b">Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Masukan Password' onChange={(e) =>  { handleInput(e.target.value, "password"); setPassword(e.target.value)}}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                <div>
                  <div class="h6 mt-3">Password yang kuat setidaknya harus :</div>
                  <span class={passwordLength ? 'h6r' : 'h6'}> 8 huruf</span>
                  <span class="h6"> terdiri dari </span>
                  <span class={isUpperCase ? 'h6r' : 'h6'}>Huruf Kapital</span>
                  <span class="h6"> dan </span>
                  <span class={containsNumbers ? 'h6r' : 'h6'}>Angka</span>
                </div>
                <Box>
                    <Progress mt={"10px"} borderRadius={"3px"} size='sm' value={progressPassword} colorScheme={colorProgress} bgColor={"#d5dbe2"}/>
                  </Box>
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Konfirmasi Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Masukan Konfirmasi Password' onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
              </Box>
              {
                loadingStat == true ?
                <>
                  <Button style={{marginTop:"25px"}} class="btn-def_second">
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
                  <Button style={{marginTop:"25px"}} class="btn-def_second"
                    onClick={handleReset}> Reset Password
                  </Button>
                </>
              }
                <Image src={VectorChangePassword} width='100%' style={{ marginTop:"40px"}}/>
          </div>
          <div className="col-md-4 col-sm-0">
          </div>
        </div>
        </div>
    </>
    : 
    <div class="container text-center">
    <div class="row mt-5">
      <div class="col-4">

      </div>
      <div class="col-4">
        <div class="d-flex justify-content-center">
          <IoIosWarning class="mt-5" size={"150px"} style={{color:"#DE1B51"}} />
        </div>
        <Text class="h5">Invalid Token</Text>
        <Button class="btn-def_second mt-3 h5b" onClick={() => navigate("/")}>Close this page</Button>
      </div>
      <div class="col-4">

      </div>
    </div>
  </div>
  }
  </Box>
  </>
  )
}

export default ResetPassword;