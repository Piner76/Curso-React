import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
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
            <Link
              to="/productos"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Productos
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.carrito}>
        <span>Carrito 0 🛒</span>
      </div>
    </header>
  );
}

export default Header;
