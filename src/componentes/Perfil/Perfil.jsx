import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Perfil.module.css";

function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const manejarLogout = async () => {
    await logout();
    // Bonus: al cerrar sesión redirigimos al inicio
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2>Mi Perfil</h2>
      <p className={styles.bienvenida}>
        ¡Hola de nuevo, <strong>{user?.email}</strong>!
      </p>
      <p className={styles.rol}>
        Rol:{" "}
        <strong>{user?.rol === "admin" ? "Administrador" : "Usuario"}</strong>
      </p>
      <button onClick={manejarLogout} className={styles.botonLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Perfil;
