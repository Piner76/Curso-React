import styles from "./Botonera.module.css";
import { useState } from "react";

export default function AbmToolbar({
  onAlta,
  onModificar,
  onBaja,
  haySeleccion,
}) {
  return (
    <div className={[styles.container]}>
      <button type="button" onClick={onAlta} className={[styles.btn_alta]}>
        <plus size={16} />
        Alta
      </button>

      <button
        type="button"
        onClick={onModificar}
        disabled={!haySeleccion}
        className={[styles.btn_modificar]}
      >
        <pencil size={16} />
        Modificación
      </button>

      <button
        type="button"
        onClick={onBaja}
        disabled={!haySeleccion}
        className={[styles.btn_eliminar]}
      >
        <trash2 size={16} />
        Baja
      </button>
    </div>
  );
}
