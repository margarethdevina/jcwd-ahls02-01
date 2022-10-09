import React from "react";
import Axios from "axios";
import { API_URL, BE_URL } from "../../helper";
import "../../Styles/Users/LandingPage.css";
import VectorHeader from "../../Assets/DevImage/HeaderLandingPage.png";
import logo from "../../Assets/DevImage/LogoMedhika.png";
import kategori1 from "../../Assets/DevImage/Kategori1.png";
import kategori2 from "../../Assets/DevImage/Kategori2.png";
import kategori3 from "../../Assets/DevImage/Kategori3.png";
import jaminan1 from "../../Assets/DevImage/Jaminan1.png";
import jaminan2 from "../../Assets/DevImage/Jaminan2.png";
import jaminan3 from "../../Assets/DevImage/Jaminan3.png";
import bank1 from "../../Assets/DevImage/LogoBCA.png";
import bank2 from "../../Assets/DevImage/LogoMandiri.png";
import NavbarComponent from "../../Components/Users/Navbar";
import Modal from "../../Components/Users/ModalLogin";
import FooterComponent from "../../Components/Users/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToastHook } from "../../Components/CustomToast";
import {
  useMediaQuery,
  Flex,
  Box,
  Image,
  Text,
  Divider,
  Spacer,
  Button,
  Link,
} from "@chakra-ui/react";

const LandingPage = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [loadingStat, setLoadingStat] = React.useState(false);
  const [currentToast, newToast] = useToastHook();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [productData, setProductData] = React.useState([]);

  React.useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = () => {
    Axios.post(`${API_URL}/users/getproducts`, {
    }).then((res) => {
      setProductData(res.data.data);
      // console.log(res.data);
    });
  };

  const { isVerified, users, name, profilePicture, token } = useSelector(
    (state) => {
      return {
        isVerified: state.userReducers.isVerified,
        users: state.userReducers.users,
        name: state.userReducers.name,
        profilePicture: state.userReducers.profilePicture,
        token: state.userReducers.token,
      };
    }
  );

  // console.log("S T A T U S LandingPage", isVerified);
  // console.log("productData LandingPage", productData)
  const btnCart = async () => {
    try {
      setLoadingStat(true);
      if (isVerified == "verified") {
        setLoadingStat(false);
        navigate("/cart");
      } else if (isVerified == "unverified") {
        newToast({
          title: "Akun Tidak Terverifikasi.",
          description:
            "Mohon untuk verifikasi akun di email anda. agar memudahkan saat transaksi di Medhika",
          status: "warning",
        });
        setLoadingStat(false);
      } else {
        setShow(!show)
        setLoadingStat(false);
      }
    } catch (err) {
      newToast({
        title: "Error.",
        description: "Coba refresh browser anda",
        status: "error",
      });
      setLoadingStat(false);
    }
  };

  const btnUnggahResep = () => {
    setLoadingStat(true);
    if (isVerified == "verified") {
      setLoadingStat(false);
      navigate(`/uploadresep`)
    } else {
      setLoadingStat(false);
      newToast({
        title: "Error",
        description: "Verifikasi dahulu akun Anda",
        status: "error",
      });
    }
  }

  return (
    <>
      <div>
        <NavbarComponent />


      </div>
      <div class="HeaderBG" style={{ height: "100%" }}>
        <div class="Vector">
          <div class="container">
            <Box height={"650px"}>
              <div class="row">
                <div div class="col-md-7 col-sm-12">
                  <Box style={{ marginTop: "65px" }}>
                    <Flex>
                      <Text class="h4" style={{ marginTop: "3px" }}>
                        Selamat Datang Di
                      </Text>
                      <Image
                        src={logo}
                        width="20%"
                        style={{ marginLeft: "10px", marginBottom: "5px" }}
                      />
                    </Flex>
                  </Box>
                  <Text class="h2b">APOTEK ONLINE TERPERCAYA</Text>
                  <Text class="h6" style={{ marginTop: "3px" }}>
                    100% Asli, Produk BPOM dan Cepat Sampai
                  </Text>
                  <Box
                    borderRadius={"10px"}
                    boxShadow="md"
                    bg="#FFFFFF"
                    marginTop={"50px"}
                    paddingBottom={"30px"}
                  >
                    <div class="row">
                      <div class="col-md-8 col-sm-12">
                        <Text
                          class="h5b"
                          style={{ paddingTop: "30px", paddingLeft: "40px" }}
                        >
                          Punya Resep Doktor?
                        </Text>
                        <Text
                          class="h6"
                          style={{ marginTop: "15px", paddingLeft: "40px" }}
                        >
                          Tak perlu antre & obat akan langsung dikirimkan ke
                          lokasi anda! Ukuran foto tidak lebih dari 1MB
                        </Text>
                      </div>
                      <div class="col-md-4 col-sm-12">
                        {isLargerThan1280 ? (
                          <Button
                            style={{ marginRight: "0px", marginTop: "75px" }}
                            class="btn-def_second"
                            isLoading={loadingStat}
                            onClick={btnUnggahResep}
                          >
                            Unggah Resep
                          </Button>
                        ) : (
                          <Button
                            style={{ marginLeft: "8%", marginTop: "15px" }}
                            class="btn-def_second"
                            isLoading={loadingStat}
                            onClick={btnUnggahResep}
                          >
                            Unggah Resep
                          </Button>
                        )}
                      </div>
                    </div>
                  </Box>
                </div>
                <div class="col-md-5 col-sm-0">
                  <div>
                    {isLargerThan1280 ? (
                      <Image
                        src={VectorHeader}
                        height={"100%"}
                        style={{ marginTop: "30px" }}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <Box style={{ marginTop: "45px" }}>
                  <Flex>
                    <Text class="h6b">Kategori</Text>
                    <Spacer />
                    <Link href="/productlist" class="h6br">Semua Produk</Link>
                  </Flex>
                  <div class="row">
                    <div class="col-md-4 col-sm-12">
                      <Box borderRadius={"10px"} width="100%" boxShadow='md' bg='#FFFFFF' marginTop={"10px"} paddingBottom={"10px"}>
                        <div class="row">
                          <div class="col-5">
                            <Image src={kategori1} width='70%' style={{ marginLeft: "25px", marginTop: "5px" }} />
                          </div>
                          <div class="col-7 my-auto">
                            <Link href="/productlist/1" class="h6-link">Obat-Obatan</Link>

                          </div>
                        </div>
                      </Box>
                    </div>
                    <div class="col-md-4 col-sm-12">
                      <Box borderRadius={"10px"} width="100%" boxShadow='md' bg='#FFFFFF' marginTop={"10px"} paddingBottom={"10px"}>
                        <div class="row">
                          <div class="col-5">
                            <Image src={kategori2} width='70%' style={{ marginLeft: "25px", marginTop: "5px" }} />
                          </div>
                          <div class="col-7 my-auto">
                            <Link href="/productlist/2" class="h6" style={{ marginTop: "50px" }}>Vitamin & Suplemen</Link>
                          </div>
                        </div>
                      </Box>
                    </div>
                    <div class="col-md-4 col-sm-12 ">
                      <Box borderRadius={"10px"} width="100%" boxShadow='md' bg='#FFFFFF' marginTop={"10px"} paddingBottom={"10px"}>
                        <div class="row">
                          <div class="col-5">
                            <Image src={kategori3} width='70%' style={{ marginLeft: "25px", marginTop: "5px" }} />
                          </div>
                          <div class="col-7 my-auto">
                            <a href="/productlist/3" style={{ align: "center" }}>Perawatan Tubuh</a>

                          </div>
                        </div>
                      </Box>
                    </div>
                  </div>
                </Box>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <div class="container">
        {isLargerThan1280 ? (
          <>
            <div>
              <Box marginTop={"40px"}>
                <Text class="h6b">Rekomendasi</Text>
              </Box>
              {
                productData.length > 0 ?
                  <>
                    <div class="VectorRekomendasi" style={{ height: "400px" }}>
                      <div class="row">
                        <div class="col-2"></div>
                        <div class="col-2">
                          <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                            <div class="row">
                              <div class="row d-flex justify-content-center">
                                <Image src={BE_URL + productData[1].productPicture} width='85%' style={{ marginLeft: "25px", marginTop: "5px" }} />
                                <Box noOfLines={1} >
                                  <Text class="h6b" style={{ marginLeft: "35px" }}>{productData[1].productName}</Text>
                                </Box>
                              </div>
                              <div class="row">
                                <Text class="h6b" style={{ marginTop: "65px", marginLeft: "20px" }}>Rp {productData[1].priceSale.toLocaleString()} / {productData[1].defaultUnit}</Text>
                              </div>
                            </div>
                            <div class="d-flex justify-content-center mt-2">
                              <Button isLoading={loadingStat}
                                class="btn-rekom" onClick={() => navigate(`/productDetail/${productData[1].idProduct}`)}>Detail Product</Button>
                              <Modal style={{ color: "#000000" }} onClose={() => setShow(!show)} show={show} />
                            </div>
                          </Box>
                        </div>
                        <div class="col-2">
                          <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                            <div class="row">
                              <div class="row d-flex justify-content-center">
                                <Image src={BE_URL + productData[2].productPicture} width='85%' style={{ marginLeft: "25px", marginTop: "5px" }} />
                                <Box noOfLines={1} >
                                  <Text class="h6b" style={{ marginLeft: "35px" }}>{productData[2].productName}</Text>
                                </Box>
                              </div>
                              <div class="row">
                                <Text class="h6b" style={{ marginTop: "65px", marginLeft: "20px" }}>Rp {productData[2].priceSale.toLocaleString()} / {productData[2].defaultUnit}</Text>
                              </div>
                            </div>
                            <div class="d-flex justify-content-center mt-2">
                              <Button isLoading={loadingStat}
                                class="btn-rekom" onClick={() => navigate(`/productDetail/${productData[2].idProduct}`)}>Detail Product</Button>
                              <Modal style={{ color: "#000000" }} onClose={() => setShow(!show)} show={show} />
                            </div>
                          </Box>
                        </div>
                        <div class="col-2">
                          <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                            <div class="row">
                              <div class="row d-flex justify-content-center">
                                <Image src={BE_URL + productData[5].productPicture} width='85%' style={{ marginLeft: "25px", marginTop: "5px" }} />
                                <Box noOfLines={1} >
                                  <Text class="h6b" style={{ marginLeft: "35px" }}>{productData[5].productName}</Text>
                                </Box>
                              </div>
                              <div class="row">
                                <Text class="h6b" style={{ marginTop: "65px", marginLeft: "20px" }}>Rp {productData[5].priceSale.toLocaleString()} / {productData[5].defaultUnit}</Text>
                              </div>
                            </div>
                            <div class="d-flex justify-content-center mt-2">
                              <Button isLoading={loadingStat}
                                class="btn-rekom" onClick={() => navigate(`/productDetail/${productData[5].idProduct}`)}>Detail Product</Button>
                              <Modal style={{ color: "#000000" }} onClose={() => setShow(!show)} show={show} />
                            </div>
                          </Box>
                        </div>
                        <div class="col-2">
                          <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                            <div class="row">
                              <div class="row d-flex justify-content-center">
                                <Image src={BE_URL + productData[0].productPicture} width='85%' style={{ marginLeft: "25px", marginTop: "5px" }} />
                                <Box noOfLines={1} >
                                  <Text class="h6b" style={{ marginLeft: "35px" }}>{productData[0].productName}</Text>
                                </Box>
                              </div>
                              <div class="row">
                                <Text class="h6b" style={{ marginTop: "65px", marginLeft: "20px" }}>Rp {productData[0].priceSale.toLocaleString()} / {productData[0].defaultUnit}</Text>
                              </div>
                            </div>
                            <div class="d-flex justify-content-center mt-2">
                              <Button isLoading={loadingStat}
                                class="btn-rekom" onClick={() => navigate(`/productDetail/${productData[0].idProduct}`)}>Detail Product</Button>
                              <Modal style={{ color: "#000000" }} onClose={() => setShow(!show)} show={show} />
                            </div>
                          </Box>
                        </div>
                        <div class="col-2">
                          <Box borderRadius={"10px"} width="100%" height="88%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                            <div class="row">
                              <div class="row d-flex justify-content-center">
                                <Image src={BE_URL + productData[7].productPicture} width='85%' style={{ marginLeft: "25px", marginTop: "5px" }} />
                                <Box noOfLines={1} >
                                  <Text class="h6b" style={{ marginLeft: "35px" }}>{productData[7].productName}</Text>
                                </Box>
                              </div>
                              <div class="row">
                                <Text class="h6b" style={{ marginTop: "65px", marginLeft: "20px" }}>Rp {productData[7].priceSale.toLocaleString()} / {productData[7].defaultUnit}</Text>
                              </div>
                            </div>
                            <div class="d-flex justify-content-center mt-2">
                              <Button isLoading={loadingStat}
                                class="btn-rekom" onClick={() => navigate(`/productDetail/${productData[7].idProduct}`)}>Detail Product</Button>
                              <Modal style={{ color: "#000000" }} onClose={() => setShow(!show)} show={show} />
                            </div>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div class="VectorRekomendasi" style={{ height: "400px" }}>
                    </div>
                  </>
              }
            </div>
            <Divider borderWidth={"1px"} borderColor={"#333333"} style={{ marginTop: "100px" }} />
            <Box marginTop={"40px"}>
              <Text class="h6b">Jaminan Untuk Anda</Text>
            </Box>
            <div class="row mt-5">
              <div class="col-4">
                <Box
                  borderRadius={"10px"}
                  height="100%"
                  width="100%"
                  boxShadow="md"
                  bg="#F6F8FC"
                  marginTop={"10px"}
                  paddingBottom={"10px"}
                >
                  <div class="row">
                    <div class="col-5">
                      <Image
                        src={jaminan1}
                        width="80%"
                        style={{ marginLeft: "25px", marginTop: "15px" }}
                      />
                    </div>
                    <div class="col-7">
                      <Text class="h6b" style={{ marginTop: "30px" }}>
                        100% Obat Asli
                      </Text>
                      <Text class="h6" style={{ marginTop: "10px" }}>
                        Semua produk yang kami jual dijamin asli & kualitas
                        terbaik untuk Anda.
                      </Text>
                    </div>
                  </div>
                </Box>
              </div>
              <div class="col-4">
                <Box
                  borderRadius={"10px"}
                  height="100%"
                  width="100%"
                  boxShadow="md"
                  bg="#F6F8FC"
                  marginTop={"10px"}
                  paddingBottom={"10px"}
                >
                  <div class="row">
                    <div class="col-5">
                      <Image
                        src={jaminan2}
                        width="80%"
                        style={{ marginLeft: "25px", marginTop: "5px" }}
                      />
                    </div>
                    <div class="col-7">
                      <Text class="h6b" style={{ marginTop: "30px" }}>
                        Dijamin Hemat
                      </Text>
                      <Text class="h6" style={{ marginTop: "10px" }}>
                        Harga yang kami tawarkan lebih murah dari apotek online
                        lainnya.
                      </Text>
                    </div>
                  </div>
                </Box>
              </div>
              <div class="col-4">
                <Box
                  borderRadius={"10px"}
                  height="100%"
                  width="100%"
                  boxShadow="md"
                  bg="#F6F8FC"
                  marginTop={"10px"}
                  paddingBottom={"10px"}
                >
                  <div class="row">
                    <div class="col-5">
                      <Image
                        src={jaminan3}
                        width="95%"
                        style={{ marginLeft: "20px", marginTop: "15px" }}
                      />
                    </div>
                    <div class="col-7">
                      <Text class="h6b" style={{ marginTop: "30px" }}>
                        Pengiriman Cepat
                      </Text>
                      <Text class="h6" style={{ marginTop: "10px" }}>
                        Tak perlu antre, kami akan kirim ke alamat Anda dengan
                        waktu yang cepat!
                      </Text>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </>
        ) :
          (
            productData.length > 0
            &&
            <>
              <div>
                <Box marginTop={"400px"}>
                  <Text class="h6b">Rekomendasi</Text>
                </Box>
                <div style={{ height: "400px" }}>
                  <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                      <Box borderRadius={"10px"} width="80%" height="85%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                        <div class="row">
                          <div class="row d-flex justify-content-center text-center">
                            <Image src={BE_URL + productData[1].productPicture} width='35%' style={{ marginLeft: "25px" }} />
                            <Text class="h6b" style={{ marginLeft: "35px", marginBottom: "20px" }}>{productData[1].productName}</Text>
                          </div>
                          <div class="row text-center">
                            <Text class="h6b" style={{ marginLeft: "20px" }}>Rp {productData[1].priceSale.toLocaleString()} / {productData[1].defaultUnit}</Text>
                          </div>
                        </div>
                        <div class="d-flex justify-content-center mt-2">
                          <Button isLoading={loadingStat}
                            class="btn-rekom" onClick={() => navigate(`/productDetail/${productData[1].idProduct}`)}>Detail Product</Button>
                          <Modal style={{ color: "#000000" }} onClose={() => setShow(!show)} show={show} />
                        </div>
                      </Box>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                      <Box borderRadius={"10px"} width="80%" height="85%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                        <div class="row">
                          <div class="row d-flex justify-content-center text-center">
                            <Image src={BE_URL + productData[2].productPicture} width='35%' style={{ marginLeft: "25px" }} />
                            <Text class="h6b" style={{ marginLeft: "35px", marginBottom: "20px" }}>{productData[2].productName}</Text>
                          </div>
                          <div class="row text-center">
                            <Text class="h6b" style={{ marginLeft: "20px" }}>Rp {productData[2].priceSale.toLocaleString()} / {productData[2].defaultUnit}</Text>
                          </div>
                        </div>
                        <div class="d-flex justify-content-center mt-2">
                          <Button isLoading={loadingStat}
                            class="btn-rekom" onClick={() => navigate(`/productDetail/${productData[2].idProduct}`)}>Detail Product</Button>
                          <Modal style={{ color: "#000000" }} onClose={() => setShow(!show)} show={show} />
                        </div>
                      </Box>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                      <Box borderRadius={"10px"} width="80%" height="85%" boxShadow='lg' bg='#FFFFFF' marginTop={"50px"} paddingBottom={"10px"}>
                        <div class="row">
                          <div class="row d-flex justify-content-center text-center">
                            <Image src={BE_URL + productData[5].productPicture} width='35%' style={{ marginLeft: "25px" }} />
                            <Text class="h6b" style={{ marginLeft: "35px", marginBottom: "20px" }}>{productData[5].productName}</Text>
                          </div>
                          <div class="row text-center">
                            <Text class="h6b" style={{ marginLeft: "20px" }}>Rp {productData[5].priceSale.toLocaleString()} / {productData[5].defaultUnit}</Text>
                          </div>
                        </div>
                        <div class="d-flex justify-content-center mt-2">
                          <Button isLoading={loadingStat}
                            class="btn-rekom" onClick={() => navigate(`/productDetail/${productData[5].idProduct}`)}>Detail Product</Button>
                          <Modal style={{ color: "#000000" }} onClose={() => setShow(!show)} show={show} />
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
              <Divider borderWidth={"1px"} borderColor={"#333333"} style={{ marginTop: "470px" }} />
              <Box marginTop={"40px"}>
                <Text class="h6b">Jaminan Untuk Anda</Text>
              </Box>
              <div class="row mt-5">
                <div class="col-12">
                  <Box
                    borderRadius={"10px"}
                    height="100%"
                    width="100%"
                    boxShadow="md"
                    bg="#F6F8FC"
                    paddingBottom={"10px"}
                  >
                    <div class="row">
                      <div class="col-5">
                        <Image
                          src={jaminan1}
                          width="80%"
                          style={{ marginLeft: "25px", marginTop: "15px" }}
                        />
                      </div>
                      <div class="col-7">
                        <Text class="h6b" style={{ marginTop: "30px" }}>
                          100% Obat Asli
                        </Text>
                        <Text class="h6" style={{ marginTop: "10px" }}>
                          Semua produk yang kami jual dijamin asli & kualitas
                          terbaik untuk Anda.
                        </Text>
                      </div>
                    </div>
                  </Box>
                </div>
                <div class="col-12">
                  <Box
                    borderRadius={"10px"}
                    height="100%"
                    width="100%"
                    boxShadow="md"
                    bg="#F6F8FC"
                    mt={"20px"}
                    paddingBottom={"10px"}
                  >
                    <div class="row">
                      <div class="col-5">
                        <Image
                          src={jaminan2}
                          width="80%"
                          style={{ marginLeft: "25px", marginTop: "5px" }}
                        />
                      </div>
                      <div class="col-7">
                        <Text class="h6b" style={{ marginTop: "30px" }}>
                          Dijamin Hemat
                        </Text>
                        <Text class="h6" style={{ marginTop: "10px" }}>
                          Harga yang kami tawarkan lebih murah dari apotek online
                          lainnya.
                        </Text>
                      </div>
                    </div>
                  </Box>
                </div>
                <div class="col-12">
                  <Box
                    borderRadius={"10px"}
                    height="100%"
                    width="100%"
                    boxShadow="md"
                    bg="#F6F8FC"
                    mt={"40px"}
                    paddingBottom={"10px"}
                  >
                    <div class="row">
                      <div class="col-5">
                        <Image
                          src={jaminan3}
                          width="95%"
                          style={{ marginLeft: "20px", marginTop: "15px" }}
                        />
                      </div>
                      <div class="col-7">
                        <Text class="h6b" style={{ marginTop: "30px" }}>
                          Pengiriman Cepat
                        </Text>
                        <Text class="h6" style={{ marginTop: "10px" }}>
                          Tak perlu antre, kami akan kirim ke alamat Anda dengan
                          waktu yang cepat!
                        </Text>
                      </div>
                    </div>
                  </Box>
                </div>
              </div>
            </>
          )
        }
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div style={{ backgroundColor: "#F6F8FC" }}>
        <div class="container text-center">
          <Text class="h6b" style={{ paddingTop: "30px" }}>
            Metode Pembayaran
          </Text>
          <div class="d-flex justify-content-center">
            <Image
              src={bank1}
              height="15%"
              width="12%"
              style={{ marginLeft: "20px", marginTop: "25px" }}
            />
            <Image
              src={bank2}
              width="15%"
              style={{ marginLeft: "20px", marginTop: "15px" }}
            />
          </div>
        </div>
        <br />
        <br />
      </div>
      <FooterComponent />
    </>
  );
};

export default LandingPage;
