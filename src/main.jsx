import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./RouterProvider.jsx";
import ContextApi from "./Components/context api/ContextApi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextApi>
    <RouterProvider router={router} />
  </ContextApi>
);
