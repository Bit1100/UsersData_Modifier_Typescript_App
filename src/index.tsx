import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UsersContextProvider as Provider } from "./context";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
