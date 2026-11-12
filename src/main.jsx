import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CategoriasProvider } from "./context/CategoriasContext.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";
import { AuthContext, AuthProvider } from './context/AuthContext.jsx'; 

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <CategoriasProvider>
          <ProductosProvider>
            <App />
          </ProductosProvider>
        </CategoriasProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
);

    