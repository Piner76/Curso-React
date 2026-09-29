import styles from "./CardCategoria.module.css";

function CardCategoria({ imagen, titulo, descripcion }) {
  return (
    <article className={styles.card}>
      <img src={imagen} alt={titulo} className={styles.imagen} />
      <div className={styles.info}>
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </div>
    </article>
  );
}

export default CardCategoria;
