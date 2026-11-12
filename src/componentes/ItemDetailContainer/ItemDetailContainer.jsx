import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ItemDetailContainer.module.css";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useCategorias } from "../../context/CategoriasContext";
import { useCart } from "../../context/CartContext"; // 1. Importamos el carrito

function ItemDetailContainer() {
  const { id } = useParams();
  const { categorias } = useCategorias();
  const { addToCart } = useCart(); // 2. Traemos la función para agregar

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  // 3. Nuevo estado para manejar la cantidad a comprar
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const docRef = doc(db, "Productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProducto(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) {
    return <p className={styles.mensaje}>Cargando producto...</p>;
  }

  if (error) {
    return <p className={styles.mensaje}>Error: {error.message}</p>;
  }

  if (!producto) {
    return <p className={styles.mensaje}>Producto no encontrado.</p>;
  }

  const categoria = categorias.find((cat) => cat.id === producto.CategoriaId);
  const nombreCategoria = categoria ? categoria.CatNom : producto.CategoriaId;

  // 4. Funciones para los botones de cantidad
  const incrementar = () => {
    if (cantidad < producto.Stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) { // En el detalle arranca en 1, no permitimos 0 directo
      setCantidad(cantidad - 1);
    }
  };

  // 5. Función para agregar al carrito
  const manejarAgregarAlCarrito = () => {
    // Le pasamos el objeto producto y la cantidad elegida
    addToCart(producto, cantidad);
  };

  return (
    <div className={styles.detalle}>
      <Link to="/productos" className={styles.volver}>
        ← Volver al catálogo
      </Link>
      <div className={styles.contenido}>
        <img
          src={producto.Imagen}
          alt={producto.ProNom}
          className={styles.imagen}
        />
        <div className={styles.info}>
          <h2>{producto.ProNom}</h2>
          <p className={styles.categoria}>{nombreCategoria}</p>
          <p className={styles.descripcion}>{producto.Descripcion}</p>
          <p className={styles.precio}>${producto.Precio}</p>
          <p className={styles.stock}>Stock disponible: {producto.Stock}</p>
          
          {/* 6. Renderizamos los controles si hay stock */}
          {producto.Stock > 0 ? (
            <>
              <div className={styles.controlesDetalle}>
                <button onClick={decrementar} className={styles.botonCantidad}>
                  -
                </button>
                <span className={styles.cantidad}>{cantidad}</span>
                <button onClick={incrementar} className={styles.botonCantidad}>
                  +
                </button>
              </div>
              
              <button 
                className={styles.botonAgregar} 
                onClick={manejarAgregarAlCarrito}
              >
                Agregar {cantidad} al carrito
              </button>
            </>
          ) : (
            <p className={styles.sinStock}>Sin stock por el momento</p>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;