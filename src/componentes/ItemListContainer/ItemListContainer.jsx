import { useState, useEffect } from "react";
import Item from "../Item/Item";
import styles from "./ItemListContainer.module.css";
import { arrayProductos } from "../../../public/data/productos.js";

function ItemListContainer({ mensaje }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className={styles.contenedor}>
      <h2>{mensaje}</h2>
      <div className={styles.grid}>
        {arrayProductos.map((producto) => (
          <Item
            key={producto.id}
            id={producto.id}
            nombre={producto.categoria}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagen={producto.img}
            stock={producto.stock}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
