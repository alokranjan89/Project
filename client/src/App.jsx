import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";

/* 🔥 Animation Wrapper */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<Layout />}>

          {/* Wrap EACH PAGE with motion */}
          
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

/* 🔥 Reusable Animation */
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;