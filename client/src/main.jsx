import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
 <CartProvider>
  <SearchProvider>
    <App />
    <Toaster position="top-right" />
  </SearchProvider>
</CartProvider>
);