import { Link, NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";
import { useCart } from "../../context/CartContext.jsx";
import { useCategorias } from "../../context/CategoriasContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";


function Header() {
  const { getCartQuantity } = useCart();
  const { categorias } = useCategorias(); // Traemos las categorías
  const { user, logout } = useAuth(); // Usuario y logout desde el contexto de autenticación
  const [mostrarMenu, setMostrarMenu] = useState(false); // Estado para el dropdown
  const navigate = useNavigate();

  
  const totalItems = getCartQuantity();

  // Función al hacer clic en una categoría
  const handleCategoriaClick = (categoriaId) => {
    setMostrarMenu(false); // Cerramos el menú
    navigate(`/comprar?categoria=${categoriaId}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>🍷 El Rincón del Brindis</h1>
      </div>
      <nav>
        <ul className={styles.nav}>
          {user && user.rol === "admin" && (
            <li>
              <Link to="/alta">Gestion</Link>
              <span className={styles.adminBadge}>!Hola, {user.email}</span>
              <button onClick={logout} className={styles.logoutButton}>
                Cerrar Sesión
              </button>
            </li>
          )}
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/productos">Productos</Link>
          </li>
          
          {/* MENÚ DESPLEGABLE DE COMPRAR */}
          <li 
            className={styles.dropdown_container}
            onMouseEnter={() => setMostrarMenu(true)}
            onMouseLeave={() => setMostrarMenu(false)}
          >
            <NavLink
              to="/comprar"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Comprar ▾
            </NavLink>
            
            {mostrarMenu && (
              <ul className={styles.dropdown_menu}>
                {categorias.length === 0 ? (
                  <li>Cargando...</li>

                ) : (
                  categorias.map((cat) => (
                    <li key={cat.id}>
                      <button onClick={() => handleCategoriaClick(cat.id)}>
                        {cat.CatNom}
                      </button>
                    </li>
                  ))
                  
                )}
              </ul>
            )}
          </li>

        </ul>
      </nav>
      <div className={styles.carrito}>
        <NavLink to="/carrito" />
        🛒 {totalItems > 0 && <span>{totalItems}</span>}
      </div>
    </header>
  );
}

export default Header;