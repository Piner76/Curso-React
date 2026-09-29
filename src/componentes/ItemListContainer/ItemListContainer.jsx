import { useState, useEffect } from "react";
import Item from "../Item/Item";
import styles from "./ItemListContainer.module.css";

function ItemListContainer({ mensaje }) {
  // Los 3 estados clásicos de la Clase 5
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el catálogo de productos");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []); // array vacío: se ejecuta una sola vez, al montar el componente

  if (cargando) {
    return <p className={styles.mensaje}>Cargando productos...</p>;
  }

  if (error) {
    return <p className={styles.mensaje}>Error: {error}</p>;
  }

  return (
    <div className={styles.contenedor}>
      <h2>{mensaje}</h2>
      <div className={styles.grid}>
        {productos.map((producto) => (
          <Item
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagen={producto.imagen}
            stock={producto.stock} // 👈 nuevo
          />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
