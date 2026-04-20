import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Offers from "./pages/Offers";
import Wishlist from "./pages/Wishlist";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="category/:name"
            element={
              <PageWrapper>
                <Category />
              </PageWrapper>
            }
          />

          <Route
            path="product/:id"
            element={
              <PageWrapper>
                <ProductDetails />
              </PageWrapper>
            }
          />

          <Route
            path="cart"
            element={
              <PageWrapper>
                <Cart />
              </PageWrapper>
            }
          />

          <Route
            path="wishlist"
            element={
              <PageWrapper>
                <Wishlist />
              </PageWrapper>
            }
          />

          <Route
            path="search"
            element={
              <PageWrapper>
                <Search />
              </PageWrapper>
            }
          />

          <Route
            path="offers"
            element={
              <PageWrapper>
              <Offers />
            </PageWrapper>
          }
        />

          <Route element={<ProtectedRoute />}>
            <Route
              path="checkout"
              element={
                <PageWrapper>
                  <Checkout />
                </PageWrapper>
              }
            />

            <Route
              path="profile"
              element={
                <PageWrapper>
                  <Profile />
                </PageWrapper>
              }
            />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const shouldSmoothScroll = location.state?.scrollToTop;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: shouldSmoothScroll ? "smooth" : "auto",
    });
  }, [location.pathname, location.state]);

  return null;
};

const MotionPage = motion.div;

const PageWrapper = ({ children }) => {
  return (
    <MotionPage
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </MotionPage>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
