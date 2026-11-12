import { Routes, Route } from "react-router-dom";
import { Layout } from "./componentes/layout/Layout";
import Inicio from "./componentes/Inicio/Inicio";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer";
import Carrito from "./componentes/Carrito/Carrito";
import { ContainerProducto } from "./componentes/Productos/ContainerProducto";
import Login from "./componentes/Login/Login";
import Registro from "./componentes/Registro/Registro";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ContainerProducto />} />
        <Route
          path="/comprar"
          element={<ItemListContainer mensaje="Nuestro Catálogo" />}
        />
         <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/alta"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <h1>Bienvenido al Panel de Administración</h1>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
