import * as test from "react";
import axios from "axios";
import { API_URL } from "../../helper";
import {
  Button,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import "../../Styles/Admin/Product.css";

export const ModalCreate = (props) => {
  const [formState, setFormState] = test.useState({
    name: "",
    price: 0,
    category: "",
    gambar: "",
    description: "",
    defaultUnit: "",
    convertedQuantity: 0,
    warning: "",
    composition: "",
    dosage: "",
    stockQuantity: 0,
  });
  const onValueChange = (name, value, target) => {
    if (name === "gambar") value = target.files[0];
    setFormState({ ...formState, [name]: value });
  };
  const [categoryList, setCategoryList] = test.useState([]);
  test.useEffect(() => {
    categoryFetch();
  }, []);
  function categoryFetch() {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .get(`${API_URL}/admin/getcategory`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategoryList(res.data.data);
        // console.log(res.data);
      });
  }
  const Selectcategory = (props) => {
    const [selectedCategory, setSelectedCategory] = test.useState("");
    return (
      <Select
        value={props.formState.category}
        placeholder="Pilih kategori"
        onChange={(event) => {
          props.onValueChange("category", event.target.value);
        }}
      >
        {props.categoryList.map((value) => (
          <option value={value.idCategory}>{value.categoryName}</option>
        ))}
      </Select>
    );
  };
  return (
    <ModalContent>
      <ModalHeader>Tambah Produk</ModalHeader>
      <ModalBody>
        <FormControl>
          <FormLabel>Nama Produk</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("name", event.target.value);
            }}
          />
          <FormLabel>Harga</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("price", event.target.value);
            }}
            type="number"
          />
          <FormLabel>Netto</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("convertedQuantity", event.target.value);
            }}
            type="number"
          />
          <FormLabel>Kategori</FormLabel>
          <Selectcategory
            onValueChange={onValueChange}
            categoryList={categoryList}
            formState={formState}
          />
          <FormLabel>Gambar</FormLabel>
          <Input
            type={"file"}
            onChange={(event) => {
              onValueChange("gambar", event.target.value, event.target);
            }}
          />
          <FormLabel>Deskripsi</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("description", event.target.value);
            }}
          />
          <FormLabel>Unit</FormLabel>
          <Input
            placeholder="saset,botol,etc"
            onChange={(event) => {
              onValueChange("defaultUnit", event.target.value);
            }}
          />
          <FormLabel>Komposisi</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("composition", event.target.value);
            }}
          />
          <FormLabel>Warning</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("warning", event.target.value);
            }}
          />
          <FormLabel>Dosis</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("dosage", event.target.value);
            }}
          />
          <FormLabel>Stok</FormLabel>
          <Input
            onChange={(event) => {
              onValueChange("stock", event.target.value);
            }}
            type="number"
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={props.onClose}>
          Close
        </Button>
        <Button
          style={{ backgroundColor: "#DE1B51" }}
          colorScheme="red"
          variant="solid"
          onClick={() => {
            // props.onClose()
            props.add(formState);
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
///////////////EDIT/////////////////////
export const ModalEdit = (props) => {
  const [formState, setFormState] = test.useState({ ...props.selectedEdit });
  const onValueChange = (name, value, target) => {
    if (name === "gambar") value = target.files[0];
    setFormState({ ...formState, [name]: value });
  };
  const [categoryList, setCategoryList] = test.useState([]);
  test.useEffect(() => {
    productFetch();
    setFormState({ ...props.selectedEdit });
  }, []);
  function productFetch() {
    let token = localStorage.getItem("tokenIdUser");
    axios
      .get(`${API_URL}/admin/getcategory`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategoryList(res.data.data);
        // console.log(res.data);
      });
  }
  const Selectcategory = (props) => {
    const [selectedCategory, setSelectedCategory] = test.useState("");
    return (
      <Select
        value={props.formState.category}
        placeholder="Select option"
        onChange={(event) => {
          props.onValueChange("category", event.target.value);
        }}
      >
        {props.categoryList.map((value) => (
          <option value={value.idCategory}>{value.categoryName}</option>
        ))}
      </Select>
    );
  };
  return (
    <ModalContent>
      <ModalHeader>Product Page</ModalHeader>
      <ModalBody>
        <FormControl>
          <FormLabel>Nama Produk</FormLabel>
          <Input
            value={formState.name}
            onChange={(event) => {
              onValueChange("name", event.target.value);
            }}
          />
          <FormLabel>Harga</FormLabel>
          <Input
            value={formState.price}
            onChange={(event) => {
              onValueChange("price", event.target.value);
            }}
            type="number"
          />
          <FormLabel>Netto</FormLabel>
          <Input
            value={formState.convertedQuantity}
            onChange={(event) => {
              onValueChange("convertedQuantity", event.target.value);
            }}
            type="number"
          />
          <FormLabel>Kategori</FormLabel>
          <Selectcategory
            onValueChange={onValueChange}
            categoryList={categoryList}
            formState={formState}
          />
          <FormLabel>Gambar</FormLabel>
          <Input
            type={"file"}
            onChange={(event) => {
              onValueChange("gambar", event.target.value, event.target);
            }}
          />
          <FormLabel>Deskripsi</FormLabel>
          <Textarea
            value={formState.description}
            onChange={(event) => {
              onValueChange("description", event.target.value);
            }}
          />
          <FormLabel>Unit</FormLabel>
          <Input
            placeholder="saset,botol,etc"
            value={formState.defaultUnit}
            onChange={(event) => {
              onValueChange("defaultUnit", event.target.value);
            }}
          />
          <FormLabel>Komposisi</FormLabel>
          <Textarea
            value={formState.composition}
            onChange={(event) => {
              onValueChange("composition", event.target.value);
            }}
          />
          <FormLabel>Warning</FormLabel>
          <Textarea
            value={formState.warning}
            onChange={(event) => {
              onValueChange("warning", event.target.value);
            }}
          />
          <FormLabel>Dosis</FormLabel>
          <Textarea
            value={formState.dosage}
            onChange={(event) => {
              onValueChange("dosage", event.target.value);
            }}
          />
          <FormLabel>Stok</FormLabel>
          <Input
            value={formState.stock}
            onChange={(event) => {
              onValueChange("stock", event.target.value);
            }}
            type="number"
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={props.onClose}>
          Close
        </Button>
        <Button
          style={{ backgroundColor: "#DE1B51" }}
          colorScheme="red"
          onClick={() => {
            props.edit(formState);
            // props.onClose();
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
