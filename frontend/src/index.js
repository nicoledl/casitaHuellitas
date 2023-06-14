import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import { ProSidebarProvider } from "react-pro-sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProSidebarProvider>
  </React.StrictMode>
);
