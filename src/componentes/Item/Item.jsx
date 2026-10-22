import styles from "./Item.module.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

function Item({ id, nombre, descripcion, precio, imagen, stock }) {
  const [cantidad, setCantidad] = useState(0);
  const { addToCart } = useCart();

  const incrementar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cantidad < stock) {
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

    addToCart({ id, nombre, descripcion, precio, imagen }, cantidad);
  };

  return (
    // <Link to={`/producto/${id}`} className={styles.link}>
    <article className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.imagen} />
      <div className={styles.info}>
        <p className={styles.precio}>$ {precio}</p>
        {/* <h3>{nombre}</h3> */}
        <p className={styles.descripcion}>{descripcion}</p>

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
    // </Link>
  );
}

export default Item;
