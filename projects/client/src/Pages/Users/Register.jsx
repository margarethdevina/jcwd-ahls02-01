import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper"
import VectorRegister from "../../Assets/DevImage/Register.png";
import NavbarComponent from "../../Components/Users/Navbar";
import {  Box,  Spinner, Input, Image, Text, Button, InputGroup, 
  InputRightElement, Progress, 
  InputLeftAddon } from '@chakra-ui/react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from "../../Redux/Actions/userActions";
import { useToastHook } from "../../Components/CustomToast";

const Register=()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName]=React.useState("");
  const [phone, setPhone]=React.useState();
  const [email, setEmail]=React.useState("");
  const [password, setPassword]=React.useState("");
  const [progressPassword, setProgressPassword]=React.useState(0);
  const [colorProgress, setColorProgress]=React.useState("");
  const [passwordLength, setPasswordLength]=React.useState(false);
  const [containsNumbers, setContainsNumbers]=React.useState(false);
  const [isUpperCase, setIsUpperCase]=React.useState(false);
  const [confirmPassword, setConfirmPassword]=React.useState("");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const toast = useToast();
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();

  // console.log("name", name)
  // console.log("Nomor Handphone", phone)
  // console.log("email", email)
  // console.log("password", password)
  // console.log("konfirmasi password", confirmPassword)

  const [inForm, setInForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegister =async()=>{
    try {
      setLoadingStat(true)
      checkStrongPassword();
      if (name=="" || phone=="" || email=="" || password=="" || confirmPassword==""){
        newToast({
          title: 'Registrasi Tidak Berhasil.',
          description: 'Mohon isi semua data registrasi',
          status: 'error',
        })
        setLoadingStat(false)
      } else{
        if (password!=confirmPassword){
          newToast({
            title: 'Registrasi Tidak Berhasil.',
            description: 'Konfirmasi password tidak sesuai dengan password',
            status: 'error',
          })
          setLoadingStat(false)
        } else if (phone.length < 10){
          newToast({
            title: 'Registrasi Tidak Berhasil.',
            description: 'Isi dengan nomor telfon aktif',
            status: 'error',
          })
          setLoadingStat(false)
        } else if(email.includes("@")){
          let res = await Axios.post(`${API_URL}/users/register`, {
            name: name,
            email: email,
            password: password,
            role: "user",
            phone: `+62${phone}`,
            profilePicture: "/Profile/PROFILE-PICTURE-USERBARU.jpg",
            isVerified:"unverified"
          })
          // console.log("res.data registerUser", res.data)
          if (res.data.token) {
            newToast({
              title: 'Registrasi Berhasil.',
              description: 'Verifikasi akun melalui link yang dikirim ke email anda',
              status: 'success',
            })
            // console.log("res.data FE", res.data)
            // console.log("res.data.token FE", res.data.token)
            localStorage.setItem("tokenIdUser", res.data.token)
            dispatch(loginAction(res.data))
            setLoadingStat(false)
            navigate("/")
          }
        } else {
          newToast({
            title: 'Registrasi Tidak Berhasil.',
            description: 'Format email salah, mohon memasukan sesuai format email',
            status: 'error',
          })
          setLoadingStat(false)
        }
      }    
    } catch (err) {
      newToast({
        title: 'Registrasi Tidak Berhasil.',
        description: err.response.data.message,
        status: 'error',
      })
      setLoadingStat(false)
  }
  }
  
  // console.log("check negesi", !inForm.password.match(/^(?=.*[A-Z])/) == true)
  // console.log("check normal", inForm.password.match(/^(?=.*[A-Z])/) == true)
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
  if (inForm.password.match(/^(?=.*[A-Z])/)){
    setIsUpperCase(true)
  } else {
    setIsUpperCase(false)
  }
}

const checkNumbers=()=>{
  if (inForm.password.match(/\d+/g)){
    setContainsNumbers(true)
  } else {
    setContainsNumbers(false)
  }
}

  return(
    <>
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
    <div class="container">
      <div class="text-center mt-4">
        <Text class="h4">Mari daftarkan akun Anda !</Text>
        <Text class="h4">agar memudahkan saat transaksi obat</Text>
      </div>
      <div class="row mt-5">
        <div class="col-md-6">      
          <Image src={VectorRegister} width='75%' style={{marginLeft:"40px"}}/>
        </div>
        <div class="col-md-5"> 
          <div class="rounded-4" style={{backgroundColor:"#F6F8FC"}}>
            <Box padding={"20px"}>
              <Box>
                <Text class="h6b">Nama</Text>
                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='Nama Lengkap' onChange={(e)=>setName(e.target.value)} />
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Nomor Handphone</Text>
                <InputGroup>
                  <InputLeftAddon children='+62'/>
                  <Input bgColor={"#FFFFFF"} boxShadow='md' type='tel' placeholder='phone number' onChange={(e)=>setPhone(e.target.value)} />
                </InputGroup>
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Email</Text>
                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='contoh@mail.com' onChange={(e)=>setEmail(e.target.value)} />
              </Box>
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
                      onClick={handleRegister}> Register
                    </Button>
                  </>
                }
            </Box>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
    
    </>
  )
}

export default Register;