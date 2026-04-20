import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductCatalogProvider } from "./context/ProductCatalogContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminProvider>
      <ProductCatalogProvider>
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <App />
              <Toaster position="top-right" />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductCatalogProvider>
    </AdminProvider>
  </AuthProvider>
);
