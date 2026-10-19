import { Routes, Route } from "react-router-dom";
import { Layout } from "./componentes/layout/Layout";
import Inicio from "./componentes/Inicio/Inicio";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer";
import Carrito from "./componentes/Carrito/Carrito";
import { ContainerProducto } from "./componentes/Productos/ContainerProducto";

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
        <Route path="/comprar/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>
    </Routes>
  );
}

export default App;
