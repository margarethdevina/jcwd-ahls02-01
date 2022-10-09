import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { keepLogin } from "./Redux/Actions/userActions";
import LandingPage from "./Pages/Users/LandingPage";
import Register from "./Pages/Users/Register";
import NotFoundPage from "./Pages/Users/404";
import ChangePassword from "./Pages/Users/ChangePassword";
import ForgotPassword from "./Pages/Users/ForgotPassword";
import ResetPassword from "./Pages/Users/ResetPassword";
import CartPage from "./Pages/Users/Cart";
import CheckoutPage from "./Pages/Users/Checkout";
import Dashboard from "./Pages/Admin/Dashboard";
import Category from "./Pages/Admin/Category";
import EditProfile from "./Pages/Users/EditProfile";
import Verification from "./Pages/Users/Verification";
import Productpage from "./Pages/Admin/Product";
import ProductList from "./Pages/Users/ProductList";
import ProductDetail from "./Pages/Users/ProductDetail";
import TransactionListPage from "./Pages/Users/TransactionList";
import UploadResepPage from "./Pages/Users/UploadResep";
import AdminTransactionListPage from "./Pages/Admin/AdminTransactionList";
import RacikResepPage from "./Pages/Admin/RacikResep";
import SalesReport from "./Pages/Admin/SalesReport";
import ProductHistory from "./Pages/Admin/ProductHistory";

function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => {
    return {
      token: state.userReducers.token,
      role: state.userReducers.role,
    };
  });
  // console.log("ROLE APP.JSX", role);

  // console.log("token app.jsx", token);
  useEffect(() => {
    dispatch(keepLogin());
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div>
      <Routes>
        {token ? (
          <>
            {role === "admin" ? (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/category" element={<Category />} />
                <Route path="/admin/productpage" element={<Productpage />} />
                <Route path="/admin/transactionList" element={<AdminTransactionListPage />} />
                <Route path="/admin/racikResep" element={<RacikResepPage />} />
                <Route path="/admin/salesReport" element={<SalesReport />} />
                <Route path="/admin/productHistory" element={<ProductHistory />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/productdetail/:id" element={<ProductDetail />} />
                <Route path="/productList" element={<ProductList />} />
                <Route path="/productList/:id" element={<ProductList />} />
                <Route path="/verification/:token" element={<Verification />} />
                <Route path="/changePassword" element={<ChangePassword />} />
                <Route
                  path="/resetPassword/:token"
                  element={<ResetPassword />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path='/transactionlist' element={<TransactionListPage />} />
                <Route path='/uploadresep' element={<UploadResepPage />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/productList/:id" element={<ProductList />} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
