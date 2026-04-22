import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import AdminLayout from "../features/admin/components/AdminLayout";
import AdminProtectedRoute from "../features/admin/components/AdminProtectedRoute";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminLogin from "../features/admin/pages/AdminLogin";
import AdminProductForm from "../features/admin/pages/AdminProductForm";
import AdminProducts from "../features/admin/pages/AdminProducts";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import Login from "../features/auth/pages/Login";
import Profile from "../features/auth/pages/Profile";
import Register from "../features/auth/pages/Register";
import Cart from "../features/cart/pages/Cart";
import Category from "../features/catalog/pages/Category";
import Home from "../features/catalog/pages/Home";
import Offers from "../features/catalog/pages/Offers";
import ProductDetails from "../features/catalog/pages/ProductDetails";
import Checkout from "../features/checkout/pages/Checkout";
import Search from "../features/search/pages/Search";
import Wishlist from "../features/wishlist/pages/Wishlist";
import Layout from "../shared/components/layout/Layout";
import NotFound from "../shared/pages/NotFound";

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
