import styles from "./FormProducto.module.css";

export function Producto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  onCerrar,
}) {
  const handleSubmit = (evento) => {
    manejarEnvio(evento);
    onCerrar();
  };

  return (
    <dialog
      className={styles.modal}
      aria-labelledby="titulo-form-producto"
      onCancel={(evento) => {
        evento.preventDefault();
        onCerrar();
      }}
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
      ref={(dialogo) => {
        if (dialogo && !dialogo.open) dialogo.showModal();
      }}
    >
      <div className={styles.modal_header}>
        <h2 id="titulo-form-producto">Alta de producto</h2>
        <button
          type="button"
          className={styles.boton_cerrar}
          onClick={onCerrar}
          aria-label="Cerrar formulario"
        >
          ×
        </button>
      </div>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <label>
          Categoría
          <input
            type="text"
            name="categoria"
            value={datosForm.categoria}
            onChange={manejarCambio}
            required
          />
        </label>
        <label>
          Producto
          <input
            type="text"
            name="producto"
            value={datosForm.producto}
            onChange={manejarCambio}
            required
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            name="precio"
            min="0"
            step="0.01"
            value={datosForm.precio}
            onChange={manejarCambio}
            required
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            name="stock"
            min="0"
            step="1"
            value={datosForm.stock}
            onChange={manejarCambio}
            required
          />
        </label>
        <label>
          Imagen
          <input
            type="file"
            placeholder="https://"
            name="img"
            onChange={manejarCambioImagen}
          />
        </label>
        <label className={styles.campo_checkbox}>
          <input
            type="checkbox"
            name="activo"
            checked={datosForm.activo}
            onChange={manejarCambio}
          />
          Producto activo
        </label>
        <div className={styles.formulario_acciones}>
          <button type="button" onClick={onCerrar}>
            Cancelar
          </button>
          <button type="submit">Guardar producto</button>
        </div>
      </form>
    </dialog>
  );
}

export default Producto;
