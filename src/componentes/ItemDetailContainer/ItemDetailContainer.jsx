import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ItemDetailContainer.module.css";

function ItemDetailContainer() {
  const { id } = useParams(); // toma el :id de la URL

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el producto");
        }
        return respuesta.json();
      })
      .then((datos) => {
        // Buscamos, dentro de todos los productos, el que coincide con el id de la URL.
        // OJO: el id de la URL siempre es texto (string), por eso comparamos
        // convirtiéndolo a número con Number(id).
        const encontrado = datos.find((p) => p.id === Number(id));
        setProducto(encontrado);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]); // se vuelve a ejecutar si cambia el id (ej: vas de un producto a otro)

  if (cargando) {
    return <p className={styles.mensaje}>Cargando producto...</p>;
  }

  if (error) {
    return <p className={styles.mensaje}>Error: {error}</p>;
  }

  if (!producto) {
    return <p className={styles.mensaje}>Producto no encontrado.</p>;
  }

  return (
    <div className={styles.detalle}>
      <Link to="/productos" className={styles.volver}>
        ← Volver al catálogo
      </Link>
      <div className={styles.contenido}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={styles.imagen}
        />
        <div className={styles.info}>
          <h2>{producto.nombre}</h2>
          <p className={styles.categoria}>{producto.categoria}</p>
          <p className={styles.descripcion}>{producto.descripcion}</p>
          <p className={styles.precio}>${producto.precio}</p>
          <p className={styles.stock}>Stock disponible: {producto.stock}</p>
          <button className={styles.botonAgregar}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
