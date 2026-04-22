import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./app/App.jsx";
import AppProviders from "./app/providers/AppProviders.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
    <Toaster position="top-right" />
  </AppProviders>
);
