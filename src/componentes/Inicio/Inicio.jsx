import styles from "./Inicio.module.css";
import CardCategoria from "../CardCategoria/CardCategoria";
import { useNavigate, Link } from "react-router-dom";

// Array de categorías. Más adelante esto podría venir de un JSON,
// pero para el banner de inicio tiene sentido dejarlo fijo acá.
const categorias = [
  {
    id: 1,
    titulo: "Cervezas",
    descripcion: "Las mejores cervezas nacionales e importadas.",
    imagen: "/images/cervezas.jpg",
  },
  {
    id: 2,
    titulo: "Vinos",
    descripcion: "Variedades tintos, blancos y espumantes.",
    imagen: "/images/vinos.jpg",
  },
  {
    id: 3,
    titulo: "Tragos",
    descripcion: "Aperitivos clásicos y nuevas tendencias.",
    imagen: "/images/tragos.jpg",
  },
];

function Inicio() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Banner principal */}
      <section
        className={styles.banner}
        style={{ backgroundImage: `url(/images/banner.jpg)` }}
      >
        <div className={styles.bannerContenido}>
          <h1>Tu Tienda de Bebidas</h1>
          <p>Una experiencia refrescante en cada trago.</p>
        </div>
        <button
          className={styles.botonComprar}
          onClick={() => navigate("/productos")}
        >
          Comprar Ahora
        </button>
      </section>

      {/* Texto de presentación */}
      <section className={styles.presentacion}>
        <p>
          Desde hace más de una década, nos dedicamos a ofrecer un universo de
          sabores a través de nuestra extensa gama de bebidas. En{" "}
          <strong>El Rincón del Brindis</strong>, entendemos que cada cliente es
          único, por eso nos esforzamos por curar la mejor selección de bebidas,
          desde las más clásicas hasta las más innovadoras.
        </p>
      </section>

      {/* Categorías */}
      <section className={styles.categorias}>
        {categorias.map((categoria) => (
          <CardCategoria
            key={categoria.id}
            imagen={categoria.imagen}
            titulo={categoria.titulo}
            descripcion={categoria.descripcion}
          />
        ))}
      </section>
    </div>
  );
}

export default Inicio;
