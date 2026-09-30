import { Link } from "react-router-dom";
import styles from "./Item.module.css";
import { useState } from "react";

// function Item({ id, nombre, descripcion, precio, imagen }) {
//   return (
//     <Link to={`/producto/${id}`} className={styles.link}>
//       <article className={styles.card}>
//         <img src={imagen} alt={nombre} className={styles.imagen} />
//         <div className={styles.info}>
//           <h3>{nombre}</h3>
//           <p className={styles.descripcion}>{descripcion}</p>
//           <p className={styles.precio}>${precio}</p>
//         </div>
//       </article>
//     </Link>
//   );
// }

// export default Item;
function Item({ id, nombre, descripcion, precio, imagen, stock }) {
  const [cantidad, setCantidad] = useState(0);

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
    if (cantidad > 0) {
      alert(`Agregaste ${cantidad} ${nombre} al carrito`);
    }
  };

  return (
    // <Link to={`/producto/${id}`} className={styles.link}>
    <article className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.imagen} />
      <div className={styles.info}>
        <h3>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
        <p className={styles.precio}>${precio}</p>

        <div className={styles.controles}>
          <button onClick={decrementar} className={styles.botonCantidad}>
            -
          </button>
          <p className={styles.cantidad}>{cantidad}</p>
          <button onClick={incrementar} className={styles.botonCantidad}>
            +
          </button>
        </div>

        <button onClick={agregarAlCarrito} className={styles.botonAgregar}>
          Agregar al Carrito
        </button>
      </div>
    </article>
    // </Link>
  );
}

export default Item;
