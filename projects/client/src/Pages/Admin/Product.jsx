import * as test from "react";
import axios from "axios";
import { API_URL, BE_URL } from "../../helper";
import {
  Text,
  useMediaQuery,
  Table,
  TableContainer,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  Button,
  Modal,
} from "@chakra-ui/react";
import "../../Styles/Admin/Product.css";
import Sidebar from "../../Components/Admin/Sidebar";
import { ModalCreate,ModalEdit } from "../../Components/Admin/ModalProducts";

const Productpage = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [productData, setproductData] = test.useState([]);
  const [modalState, setModalState] = test.useState("none");
  const [selectedEdit, setSelectedEdit] = test.useState([]);
  test.useEffect(() => {
    productFetch();
  }, []);
  const ProductList = (props) => {
    return (
      <TableContainer overflowX={"scroll"} whiteSpace={"wrap"}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama Produk</Th>
              <Th>Harga</Th>
              <Th>Kategori</Th>
              {/* <Th>Description</Th> */}
              <Th>Gambar</Th>
              <Th>Unit</Th>
              <Th>Netto</Th>
              <Th>Stok</Th>
              <Th>Actions</Th>
              {/* <Th>Composition</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {props.Data.map((value, index) => {
              return (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{value.productName}</Td>
                  <Td>{value.priceSale}</Td>
                  <Td>{value.categoryName}</Td>
                  <Td>
                    <img src={BE_URL + value.productPicture}></img>
                  </Td>
                  <Td>{value.defaultUnit}</Td>
                  <Td>{value.convertedQuantity}</Td>
                  <Td>{value.stockQuantity}</Td>
                  <Td>
                    <Button
                      style={{ margin: "10px" }}
                      onClick={() => {
                        if (
                          window.confirm("Anda Yakin Ingin Hapus?")
                        ) {
                          props.deleteProducts(value.idProduct);
                        }
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      style={{ margin: "10px" }}
                      onClick={() => {
                        props.setSelectedEdit({
                          id: value.idProduct,
                          name: value.productName,
                          price: value.priceSale,
                          category: value.idCategory,
                          gambar: value.productPicture,
                          description: value.description,
                          defaultUnit: value.defaultUnit,
                          convertedQuantity: value.convertedQuantity,
                          composition: value.composition,
                          dosage: value.dosage,
                          warning: value.warning,
                          stock: value.stockQuantity
                        });
                        props.setModalState("edit");
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  function productFetch() {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .get(`${API_URL}/admin/dataproduct`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setproductData(res.data.data);
        // console.log(res.data);
      });
  }

  const addProduct = (productForm) => {
    let form = new FormData();
    form.append("file", productForm.gambar);
    form.append("data", JSON.stringify(productForm));
    let token = localStorage.getItem("tokenIdUser");
    axios
      .post(`${API_URL}/admin/addproduct`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => productFetch());
  };
  const editProducts = (productForm) => {
    let token = localStorage.getItem("tokenIdUser");
    let form = new FormData();
    form.append("file", productForm.gambar);
    form.append("data", JSON.stringify(productForm));
    axios
      .patch(`${API_URL}/admin/editproduct`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => productFetch());
  };
  const deleteProducts = (selected) => {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .delete(
        `${API_URL}/admin/deleteproduct/${selected}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => productFetch());
  };

  return (
    <>
      <Modal
        isOpen={modalState !== "none"}
        onClose={() => setModalState("none")}
      >
        {modalState === "Create" ? (
          <ModalCreate
            state={modalState}
            onClose={() => setModalState("none")}
            add={addProduct}
          />
        ) : (
          <ModalEdit
            state={modalState}
            onClose={() => setModalState("none")}
            edit={editProducts}
            selectedEdit={selectedEdit}
          />
        )}
      </Modal>
      <div class="container-fluid">
        <div class="row">
          {isLargerThan1280 ? (
            <>
              <div class="col-md-3 col-sm-5">
                <Sidebar />
              </div>
              <div class="col-md-9 col-sm-8">
                <div class="row">
                  <div class="mt-3">
                    <Text class="h1b">Inventori Medhika</Text>
                    <Button onClick={() => setModalState("Create")}>
                      Tambah Produk
                    </Button>
                    <ProductList
                      deleteProducts={deleteProducts}
                      Data={productData}
                      setSelectedEdit={setSelectedEdit}
                      setModalState={setModalState}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div class="col-4">
                <Sidebar />
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="mt-3">
                    <Text class="h1b">Inventori Medhika</Text>
                    <Button onClick={() => setModalState("Create")}>
                      Tambah Produk
                    </Button>
                    <ProductList
                      deleteProducts={deleteProducts}
                      Data={productData}
                      setSelectedEdit={setSelectedEdit}
                      setModalState={setModalState}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Productpage;
