import styles from "./CardCategoria.module.css";

/*
 * Imgbb guarda en Firestore dos tipos de URL:
 *  - https://ibb.co/xxxxx  → página del visor, NO es una imagen.
 *  - https://i.ibb.co/xxxxx.jpg → imagen directa, sí sirve para <img>.
 * Si recibimos la del visor, la convertimos a la directa.
 */
const urlImagenDirecta = (url) =>
  url ? url.replace("ibb.co/", "i.ibb.co/") : url;

function CardCategoria({ imagen, titulo, descripcion }) {
  return (
    <article className={styles.card}>
      <img
        src={urlImagenDirecta(imagen)}
        alt={titulo}
        className={styles.imagen}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className={styles.info}>
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </div>
    </article>
  );
}

export default CardCategoria;
