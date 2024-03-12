import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import Basket from "./pages/Basket/Basket";
import ProductPage from "./pages/ProductPage/ProductPage";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CheckoutSuccess from "./pages/CheckoutSuccess/CheckoutSuccess";
import CheckoutCancelled from "./pages/CheckoutCancelled/CheckoutCancelled";
import ErrorRedirect from "./components/ErrorRedirect/ErrorRedirect";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/server-error"
          element={
            <ErrorRedirect status={500} message="Oops, something went wrong" />
          }
        />
        <Route
          path="/not-found"
          element={<ErrorRedirect status={404} message="Resource not found" />}
        />
        <Route
          path="/forbidden"
          element={<ErrorRedirect status={403} message="Unauthorised" />}
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="store/:category" element={<Store />} />
          <Route path="store/:category/:id" element={<ProductPage />} />

          <Route path="basket" element={<Basket />} />

          <Route path="checkout-success" element={<CheckoutSuccess />} />
          <Route path="checkout-cancelled" element={<CheckoutCancelled />} />
        </Route>
        <Route
          path="*"
          element={
            <ErrorRedirect status={404} message={"Resource not found"} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
