import styles from "./Item.module.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom"; // <-- Importar Link

function Item({ id, ProNom, Descripcion, Precio, Imagen, Stock }) {
  const [cantidad, setCantidad] = useState(0);
  const { addToCart } = useCart();

  const incrementar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cantidad < Stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cantidad === 0) return;

    addToCart({ id, ProNom, Descripcion, Precio, Imagen }, cantidad);
  };

  return (
    // ENVOLVEMOS TODO CON EL LINK
    <Link to={`/producto/${id}`} className={styles.link}>
      <article className={styles.card}>
        <img src={Imagen} alt={ProNom} className={styles.imagen} />
        <div className={styles.info}>
          <p className={styles.precio}>$ {Precio}</p>
          <p className={styles.descripcion}>{Descripcion}</p>

          <div className={styles.controles}>
            <button onClick={decrementar} className={styles.botonCantidad}>
              -
            </button>
            <p className={styles.cantidad}>{cantidad}</p>
            <button onClick={incrementar} className={styles.botonCantidad}>
              +
            </button>
          </div>

          <button
            onClick={agregarAlCarrito}
            className={styles.botonAgregar}
            disabled={cantidad === 0}
          >
            Agregar al Carrito {cantidad}
          </button>
        </div>
      </article>
    </Link>
  );
}

export default Item;