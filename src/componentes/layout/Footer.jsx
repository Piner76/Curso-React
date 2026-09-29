import { Link } from "react-router-dom";
import TarjetaPersona from "../TarjetaPersona/TarjetaPersona";
import styles from "./Footer.module.css";

const equipo = [
  {
    id: 1,
    nombre: "Lucía Fernández",
    cargo: "Fundadora y Sommelier",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    nombre: "Martín Gómez",
    cargo: "Encargado de Compras",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    nombre: "Sofía Ríos",
    cargo: "Atención al Cliente",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columnas}>
        <div className={styles.columna}>
          <h3 className={styles.marca}>El Rincón del Brindis</h3>
          <p>
            Bebidas seleccionadas con dedicación desde hace más de una década.
            Cervezas, vinos y tragos para cada ocasión.
          </p>
        </div>

        <div className={styles.columna}>
          <h4>Contacto</h4>
          <ul>
            <li>Av. Siempre Viva 742, CABA</li>
            <li>Tel: (011) 4444-5555</li>
            <li>info@rincondelbrindis.com</li>
          </ul>
        </div>

        <div className={styles.columna}>
          <h4>Legales</h4>
          <ul>
            <li>
              <Link to="/politicas">Políticas de privacidad</Link>
            </li>
            <li>
              <Link to="/terminos">Términos y condiciones</Link>
            </li>
            <li>&copy; 2026 Todos los derechos reservados</li>
          </ul>
        </div>

        <div className={styles.columna}>
          <h4>Newsletter</h4>
          <p>Enterate de nuestras novedades y ofertas.</p>
          <form
            className={styles.newsletter}
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Tu email" required />
            <button type="submit">Suscribirme</button>
          </form>
        </div>
      </div>

      <div className={styles.equipoSeccion}>
        <h4 className={styles.equipoTitulo}>Nuestro Equipo</h4>
        <div className={styles.equipoGrid}>
          {equipo.map((persona) => (
            <TarjetaPersona
              key={persona.id}
              nombre={persona.nombre}
              cargo={persona.cargo}
              foto={persona.foto}
            />
          ))}
        </div>
      </div>

      <div className={styles.barraInferior}>
        <p>&copy; 2026 El Rincón del Brindis. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
