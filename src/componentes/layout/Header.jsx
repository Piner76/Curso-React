import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useCart } from "../../context/CartContext.jsx";

function Header() {
  //usamos el hook para acceder a la function
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>🍷 El Rincón del Brindis</h1>
      </div>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/productos">Productos</Link>
          </li>
          <li>
            <NavLink
              to="/comprar"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Comprar
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.carrito}>
        <Link to="/carrito">
          Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
