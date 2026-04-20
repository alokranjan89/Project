import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <WishlistProvider>
      <SearchProvider>
        <App />
        <Toaster position="top-right" />
      </SearchProvider>
    </WishlistProvider>
  </CartProvider>
);
