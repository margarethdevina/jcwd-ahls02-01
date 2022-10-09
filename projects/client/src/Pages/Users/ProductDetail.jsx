import Axios from "axios";
import React from "react";
import { API_URL, BE_URL } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { getCartAction } from "../../Redux/Actions/cartActions";
import { useNavigate, useParams } from "react-router-dom";
import {
  Text,
  Box,
  Image,
  Button,
  Divider,
} from "@chakra-ui/react";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentToast, newToast] = useToastHook();
  const [loadingStat, setLoadingStat] = React.useState(false);
  const [productDetail, setProductDetail] = React.useState([]);
  const params = useParams();
  React.useEffect(() => {
    fetchProductDetail();
    dispatch(getCartAction());
  }, []);
  const fetchProductDetail = () => {
    Axios.get(`${API_URL}/users/getproductdetail/${params.id}`, {
    }).then((res) => {
      setProductDetail(res.data.data[0]);
      // console.log(res.data);
    });
  };

  const { isVerified, databaseCart } = useSelector((state) => {
    return {
      databaseCart: state.cartReducers.cart.filter(val => val.isActive == "true"),
      isVerified: state.userReducers.isVerified,
    }
  })

  //^ check isi databaseCart
  // console.log(`databaseCart di productlist`, databaseCart);

  const btnCart = async (idProduct, productName) => {
    try {
      setLoadingStat(true);

      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      // console.log(`btnCheckout tokenIdUser`, token);

      if (token) {

        if (isVerified == "verified") {

          if ((databaseCart.findIndex(val => val.productName == productName)) == -1) {

            let res = await Axios.post(`${API_URL}/cart/add`, {
              idProduct
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })

            if (res.data) {
              // console.log("isi res.data saat btnCart diklik", res.data);
              dispatch(getCartAction());
              setLoadingStat(false);
              navigate("/cart");
            }

          } else {

            let idxInDatabaseCart = databaseCart.findIndex(val => val.productName == productName);

            let idCart = databaseCart[idxInDatabaseCart].idCart;
            let previousCartQuantity = databaseCart[idxInDatabaseCart].cartQuantity;
            let newQuantity = previousCartQuantity + 1;

            let res = await Axios.patch(`${API_URL}/cart/idCart`, {
              idProduct,
              cartQuantity: newQuantity
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })

            if (res.data) {
              // console.log("isi res.data saat btnCart diklik", res.data);
              dispatch(getCartAction());
              setLoadingStat(false);
              navigate("/cart");
            }

          }
        } else {
          newToast({
            title: "Error",
            description: "Verifikasi dahulu akun Anda",
            status: "error",
          });
          setLoadingStat(false);
        }
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

  return (
    <>
      <Box
        w="100%"
        h="100%"
      >
        <Box boxShadow="md">
          <NavbarComponent />
        </Box>
        <div class="container">
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-4">
              <div class="row d-flex justify-content-center">
                <Image
                  src={BE_URL + productDetail.productPicture}
                  width="90%"
                  style={{
                    marginLeft: "25px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div class="col-md-6">
              <Box mt={"50px"}>
                <Text class="h3b" style={{ marginLeft: "20px" }}>
                  {productDetail.productName}
                </Text>
                <Text
                  class="h4"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Rp {productDetail.priceSale.toLocaleString()} / {productDetail.defaultUnit}
                </Text>
              </Box>
              <div class="d-grid gap-2" style={{ marginLeft: "20px" }}>
                <Button
                  class="btn mt-5 mb-5"
                  style={{ backgroundColor: "#DE1B51" }}
                  type="button"
                  onClick={() => btnCart(productDetail.idProduct, productDetail.productName)}
                  isLoading={loadingStat}
                >
                  <Box>
                    <Text style={{ color: "#FFFFFF" }} class="h6b">
                      Add To Cart
                    </Text>
                  </Box>
                </Button>
              </div>
              <Box class="mt-5">
                <Text
                  class="h5"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Deskripsi
                </Text>
                <Text
                  class="h6"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  {productDetail.description}
                </Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow="lg" />
                <Text
                  class="h5"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Komposisi
                </Text>
                <Text
                  class="h6"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  {productDetail.composition}
                </Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow="lg" />
                <Text
                  class="h5"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Dosis
                </Text>
                <Text
                  class="h6"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  {productDetail.dosage}
                </Text>
                <Divider mt={"40px"} mb={"40px"} boxShadow="lg" />
                <Text
                  class="h5"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  Perhatian
                </Text>
                <Text
                  class="h6"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  {productDetail.warning}
                </Text>
              </Box>
              {/* </Box> */}
            </div>
            <div class="col-md-1"></div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProductDetail;
