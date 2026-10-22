import styles from "./Botonera.module.css";

export default function AbmToolbar({
  onAlta,
  onModificar,
  onBaja,
  haySeleccion,
}) {
  return (
    <div className={styles.container}>
      <button type="button" onClick={onAlta} className={styles.btn_alta}>
        +
        Alta
      </button>

      <button
        type="button"
        onClick={onModificar}
        disabled={!haySeleccion}
        className={styles.btn_modificar}
      >
        Modificación
      </button>

      <button
        type="button"
        onClick={onBaja}
        disabled={!haySeleccion}
        className={styles.btn_eliminar}
      >
        Baja
      </button>
    </div>
  );
}
