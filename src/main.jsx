import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DarkModeContextProvider } from "./context/darkModeContext.jsx";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
import "./style/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>,
);
