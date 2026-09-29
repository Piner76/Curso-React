import styles from "./TarjetaPersona.module.css";

function TarjetaPersona({ nombre, cargo, foto }) {
  return (
    <div className={styles.tarjeta}>
      <img src={foto} alt={nombre} className={styles.foto} />
      <h4>{nombre}</h4>
      <p>{cargo}</p>
    </div>
  );
}

export default TarjetaPersona;
