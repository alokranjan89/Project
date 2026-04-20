import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Offers from "./pages/Offers";
import Wishlist from "./pages/Wishlist";
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
            path="checkout"
            element={
              <PageWrapper>
                <Checkout />
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

          <Route
            path="*"
            element={
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

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
