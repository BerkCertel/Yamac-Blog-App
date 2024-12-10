import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import { createRoot } from "react-dom/client";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <MainLayout>
        <App />
      </MainLayout>
    </BrowserRouter>
  </Provider>
);
