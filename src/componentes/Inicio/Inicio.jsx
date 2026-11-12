import styles from "./Inicio.module.css";
import CardCategoria from "../CardCategoria/CardCategoria";
import { useCategorias } from "../../context/CategoriasContext";
import { Link } from "react-router-dom"; // 1. Importamos Link


  function Inicio() {
   
     const { categorias } = useCategorias();

    const handleCategoriaClick = (categoriaId) => {
    setMostrarMenu(false); // Cerramos el menú
    navigate(`/comprar?categoria=${categoriaId}`);
  };

    return (
      <div>
        {/* Banner principal */}
        <section className={styles.banner}>
          <div className={styles.bannerContenido}>
            <h1>Tu Tienda de Bebidas</h1>
            <p>Una experiencia refrescante en cada trago.</p>
          </div>
          {/* <button
            className={styles.botonComprar}
            onClick={() => navigate("/productos")}
          >
            Comprar Ahora
          </button> */}
        </section>

        {/* Texto de presentación */}
        {/* <section className={styles.presentacion}>
          <p>
            Desde hace más de una década, nos dedicamos a ofrecer un universo de
            sabores a través de nuestra extensa gama de bebidas. En{" "}
            <strong>El Rincón del Brindis</strong>, entendemos que cada cliente es
            único, por eso nos esforzamos por curar la mejor selección de bebidas,
            desde las más clásicas hasta las más innovadoras.
          </p>
        </section>  */}
        
        
        <section className={styles.categorias}>
          {categorias.map((categoria) => (
           <Link 
            key={categoria.id} 
            to={`/comprar?categoria=${categoria.id}`} 
            className={styles.linkTarjeta} // Para quitar el subrayado
          >
            <CardCategoria
              imagen={categoria.Imagen}
              titulo={categoria.CatNom}
              descripcion={categoria.Descripcion}
            />
          </Link>
          ))}
        </section>  

        {/* <section className={styles.categorias}>
          {arrayCategorias.map((categoria) => (
            <CardCategoria
              key={categoria.id}
              imagen={categoria.Imagen}
              titulo={categoria.CatNom}
              descripcion={categoria.Descripcion}
            />
          ))}
        </section>  */}


            </div>
    );
  }

  export default Inicio;
