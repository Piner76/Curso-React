import styles from "./Item.module.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // 1. Importamos el icono del corazón


function Item({ id, ProNom, Descripcion, Precio, Imagen, Stock }) {
  const [cantidad, setCantidad] = useState(0);
  const { addToCart } = useCart();

  const incrementar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cantidad < Stock) setCantidad(cantidad + 1);
  };

  const decrementar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cantidad > 0) setCantidad(cantidad - 1);
  };

  const agregarAlCarrito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cantidad === 0) return;
    addToCart({ id, ProNom, Descripcion, Precio, Imagen }, cantidad);
    setCantidad(0); // Reseteamos la cantidad después de agregar
  };

  // Simulamos un precio de lista (20% más caro) para el efecto visual de la oferta
  const precioLista = Number(Precio) * 1.25;
  const porcentajeDescuento = 15;

 return (
    <Link to={`/producto/${id}`} className={styles.link}>
      <article className={styles.card}>
        
        <div className={styles.etiquetaDescuento}>
          <span>{porcentajeDescuento}%</span>
          <span>OFF</span>
        </div>

        <div className={styles.imagenContenedor}>
          <img src={Imagen} alt={ProNom} className={styles.imagen} />
        </div>

        <div className={styles.info}>
          {/* Acá limitamos la descripción a 2 líneas para que no rompa el diseño */}
          <h3 className={styles.nombre}>{ProNom}</h3>
          <p className={styles.descripcion}>{Descripcion}</p>
          
          <div className={styles.precios}>
            <span className={styles.precioTachado}>
              ${precioLista.toFixed(2)}
            </span>
            <span className={styles.precio}>${Number(Precio).toFixed(2)}</span>
          </div>


          <div className={styles.accionesCard}>
      <div className={styles.controles}>
        <button onClick={decrementar} className={styles.botonCantidad}>-</button>
        <span className={styles.cantidad}>{cantidad}</span>
        <button onClick={incrementar} className={styles.botonCantidad}>+</button>
      </div>
      <div className={styles.footerCard}>
        <button className={styles.botonFavorito} onClick={(e) => e.preventDefault()}>
          <FaHeart />
        </button>
        <button
          onClick={agregarAlCarrito}
          className={styles.botonAgregar}
          disabled={cantidad === 0}
        >
          AGREGAR
        </button>
      </div>
    </div>
  </div>
</article>
    </Link>
  );
}

export default Item;