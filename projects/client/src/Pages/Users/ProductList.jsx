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
  Flex,
  Divider,
  Spacer,
  MenuButton,
  MenuList,
  Menu,
  MenuDivider,
  MenuItem,
  MenuGroup,
  Input,
} from "@chakra-ui/react";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";

const ProductList = (props) => {
  const [productData, setProductData] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentToast, newToast] = useToastHook();
  const [loadingStat, setLoadingStat] = React.useState(false);
  const [filterData, setFilterData] = React.useState({
    category: "",
    name: "",
  });
  const [categoryList, setCategoryList] = React.useState([]);
  const params = useParams();

  React.useEffect(() => {
    if(params.id){
      setFilterData({category:params.id,name:""})
    }
    fetchProductList();
    fetchCategoryList();
    dispatch(getCartAction());
  }, []);

  React.useEffect(() => {
    fetchProductList();
  }, [filterData]);
  const fetchProductList = () => {
    let token = localStorage.getItem("tokenIdUser");
    Axios.post(`${API_URL}/users/getproducts`, {
      category: filterData.category,
      name: filterData.name,
    }).then((res) => {
      setProductData(res.data.data);
      // console.log(res.data);
    });
  };
  function hdnFilter(filterStruct) {
    setFilterData(filterStruct);
  }
  const fetchCategoryList = () => {
    Axios.get(`${API_URL}/users/getCategoryList`, {}).then((res) => {
      setCategoryList([
        { idCategory: "", categoryName: "ALL" },
        ...res.data.data,
      ]);
      // console.log(res.data);
    });
  };

  const { isVerified, databaseCart } = useSelector((state) => {
    return {
      databaseCart: state.cartReducers.cart.filter(
        (val) => val.isActive == "true"
      ),
      isVerified: state.userReducers.isVerified,
    };
  });

  //^ check isi databaseCart
  // console.log(`databaseCart di productlist`, databaseCart);

  const [indexSelectedProduct, setIndexSelectedProduct] = React.useState(null);

  const btnCart = async (idProduct, productName, idx) => {
    try {
      setIndexSelectedProduct(idx);
      setLoadingStat(true);

      let token = localStorage.getItem("tokenIdUser");

      //^ cek ada token atau tidak
      // console.log(`btnCheckout tokenIdUser`, token);

      if (token) {
        if (isVerified == "verified") {
          if (
            databaseCart.findIndex((val) => val.productName == productName) ==
            -1
          ) {
            let res = await Axios.post(
              `${API_URL}/cart/add`,
              {
                idProduct,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (res.data) {
              // console.log("isi res.data saat btnCart diklik", res.data);
              dispatch(getCartAction());
              setLoadingStat(false);
              navigate("/cart");
            }
          } else {
            let idxInDatabaseCart = databaseCart.findIndex(
              (val) => val.productName == productName
            );

            let idCart = databaseCart[idxInDatabaseCart].idCart;
            let previousCartQuantity =
              databaseCart[idxInDatabaseCart].cartQuantity;
            let newQuantity = previousCartQuantity + 1;

            let res = await Axios.patch(
              `${API_URL}/cart/idCart`,
              {
                idProduct,
                cartQuantity: newQuantity,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

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

  const printProduct = (value, index) => {
    return (
      <>
        <div class="d-inline-flex">
          <Box
            borderRadius={"10px"}
            width="165px"
            height="300px"
            boxShadow="lg"
            bg="#FFFFFF"
            mt={"25px"}
            ml={"20px"}
          >
            <div class="row">
              <div class="row d-flex justify-content-center">
                <Image
                  src={BE_URL + value.productPicture}
                  width="150px"
                  style={{
                    marginLeft: "25px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/productDetail/${value.idProduct}`)}
                />
                <Box noOfLines={1}>
                  <Text class="h6b" style={{ marginLeft: "20px" }}>
                    {value.productName}
                  </Text>
                </Box>
              </div>
              <div class="row">
                <Text
                  class="h6"
                  style={{ marginTop: "40px", marginLeft: "20px" }}
                >
                  Rp {value.priceSale.toLocaleString()} / {value.defaultUnit}
                </Text>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <Button
                isLoading=
                {
                  index == indexSelectedProduct
                  &&
                  loadingStat
                }
                class="btn-rekom"
                onClick={() => btnCart(value.idProduct, value.productName, index)}
              >
                Add To Cart
              </Button>
            </div>
          </Box>
        </div>
      </>
    );
  };

  const printCategory = (value, index) => {
    return (
      <>
        <Box
          mt={"15px"}
          ms={"30px"}
          onClick={() => {
            hdnFilter({ category: value.idCategory, name: "" });
          }}
        >
          <Text style={{ cursor: "pointer" }} class="h6">
            {value.categoryName}
          </Text>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box w="100%" h="100%" bgGradient="linear(#f6f8fc, #FFFFFF)">
        <Box boxShadow="md">
          <NavbarComponent />
        </Box>
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <Box
                borderRadius={"10px"}
                width="100%"
                height="500px"
                boxShadow="lg"
                bg="#FFFFFF"
                mt={"23px"}
              >
                <Box pt={"17px"} ms={"30px"}>
                  <Text class="h6b text-uppercase">KATEGORI</Text>
                </Box>
                <Divider mt={"10px"} />
                {categoryList.map(printCategory)}
                <Divider mt={"30px"} />
                <Box pt={"10px"} ms={"30px"}>
                  <Text class="h6b text-uppercase">FILTER</Text>
                </Box>
                <Box pt={"10px"} ms={"30px"} me={"30px"}>
                  <Input
                    bgColor={"#FFFFFF"}
                    boxShadow="md"
                    placeholder="Search by name"
                  />
                  <Box mt={"15px"}>
                    <Button class="btn-def_second2">Search</Button>
                  </Box>
                </Box>
              </Box>
            </div>
            <div class="col-md-9">
              <Flex mt={"40px"} ms={"20px"}>
                <Text class="h6b text-uppercase mt-2">Nama Kategori</Text>
                <Spacer />
                <Box>
                  <Menu>
                    <MenuButton
                      as={Button}
                      boxShadow="lg"
                      bg="#FFFFFF"
                      me={"30px"}
                    >
                      Sortir Product
                    </MenuButton>
                    <MenuList boxShadow="lg">
                      <MenuGroup title="Sort By Name">
                        <MenuItem>Product Name : A - Z</MenuItem>
                        <MenuItem>Product Name : Z - A</MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title="Sort By Price">
                        <MenuItem>Price Asc</MenuItem>
                        <MenuItem>Price Desc</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
              {productData.length > 0 ? (
                <>{productData.map(printProduct)}</>
              ) : null}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProductList;
