import * as test from "react";
import axios from "axios";
import { API_URL } from "../../helper";
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
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Input,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Admin/Sidebar";

const ModalCreate = (props) => {
  const [newCategory, setNewCategory] = test.useState("");
  return (
    <ModalContent>
      <ModalHeader>Create Category</ModalHeader>
      <ModalBody>
        <Input
          placeholder="Input nama kategori"
          onChange={(event) => {
            // console.log(event.target.value);
            setNewCategory(event.target.value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={props.onClose}>
          Close
        </Button>
        <Button
        style={{ backgroundColor: "#DE1B51" }}
          
          onClick={() => {
            props.add(newCategory);
            props.onClose()
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
const ModalEdit = (props) => {
  const [editCategory, seteditCategory] = test.useState(props.selectedEdit[1]);
  return (
    <ModalContent>
      <ModalHeader>Edit Category</ModalHeader>
      <ModalBody>
        <Input
          value={editCategory}
          onChange={(event) => {
            // console.log(event.target.value);
            seteditCategory(event.target.value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={props.onClose}>
          Close
        </Button>
        <Button
          style={{ backgroundColor: "#DE1B51" }}
          onClick={() => {
            props.edit([props.selectedEdit[0], editCategory]);
            props.onClose()
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

const Categorypage = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [categoryData, setCategoryData] = test.useState([]);
  const [modalState, setModalState] = test.useState("none");
  const [selectedEdit, setSelectedEdit] = test.useState([]);
  // const [show,setShow] = test.useState(false);
  test.useEffect(() =>{categoryFetch()}, []);
  const CategoryList = (props) => {
    return (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Category Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.Data.map((value, index) => {
              return (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{value.categoryName}</Td>
                  <Td>
                    <Button
                    mr={3}
                      onClick={() => {
                        if (window.confirm("are you sure?")) {
                          props.deleteCategory([
                            value.idCategory,
                            value.categoryName,
                          ]);
                        }
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                    mr={3}
                      onClick={() => {
                        props.setSelectedEdit([
                          value.idCategory,
                          value.categoryName,
                        ]);
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
  function categoryFetch() {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .get(`${API_URL}/admin/getcategory`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategoryData(res.data.data);
        // console.log(res.data);
      });
  }

  const addCategory = (categoryName) => {
    let token = localStorage.getItem("tokenIdUser");
    axios.post(
      `${API_URL}/admin/createcategory`,
      { catName: categoryName },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then(res=>categoryFetch());
  };
  const editCategory = (selected) => {
    let token = localStorage.getItem("tokenIdUser");
    axios.patch(
      `${API_URL}/admin/updatecategory`,
      { categoryId: selected[0], categoryNama: selected[1] },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then(res=>categoryFetch());
  };
  const deleteCategory = (selected) => {
    let token = localStorage.getItem("tokenIdUser");
    axios.post(
      `${API_URL}/admin/deletecategory`,
      { categoryId: selected[0], categoryNama: selected[1] },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then(res=>categoryFetch());
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
            add={addCategory}
          />
        ) : (
          <ModalEdit
            state={modalState}
            onClose={() => setModalState("none")}
            edit={editCategory}
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
                    <Text class="h1b">Kategori Medhika</Text>
                    <Button onClick={() => setModalState("Create")}>
                      Tambah Kategori
                    </Button>
                    <CategoryList
                      deleteCategory={deleteCategory}
                      Data={categoryData}
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
                    <Text class="h1b">Kategori Medhika</Text>
                    <Button onClick={() => setModalState("Create")}>
                      Tambah Kategori
                    </Button>
                    <CategoryList
                      deleteCategory={deleteCategory}
                      Data={categoryData}
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

export default Categorypage;
