import styles from "./FormProducto.module.css";

export function Producto({
  datosForm,
  categorias = [],
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  modoEdicion = false,
  onCerrar,
}) {

  // Mensaje visual de ayuda por campo (usado en atributos nativos + validación JS)
  const handleSubmit = async (evento) => {
    evento.preventDefault(); // Valor por defecto por si tarda en cargar
    const exito = await manejarEnvio(evento);

    if (exito){
      onCerrar();
    }
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
        <h2 id="titulo-form-producto">
          {modoEdicion ? "Modificar producto" : "Alta de producto"}
        </h2>
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
          <select
            name="CategoriaId"
            value={datosForm.CategoriaId}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.CatNom}
              </option>
            ))}
          </select>
        </label>
      
        <label>
          Producto
          <input
            type="text"
            name="ProNom"
            value={datosForm.ProNom}
            onChange={manejarCambio}
            required
            minLength={3}
            maxLength={60}
            placeholder="Mínimo 3 caracteres"
          />
        </label>
        <label>
          Descripción
          <textarea
            name="Descripcion"
            value={datosForm.Descripcion}
            onChange={manejarCambio}
            rows={3}
            maxLength={300}
            placeholder="Máximo 300 caracteres"
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            name="Precio"
            min="0.01"
            step="0.01"
            value={datosForm.Precio}
            onChange={manejarCambio}
            required
            placeholder="Mayor a 0"
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            name="Stock"
            min="0"
            step="1"
            value={datosForm.Stock}
            onChange={manejarCambio}
            required
            placeholder="Entero ≥ 0"
          />
        </label>
        <label>
          Imagen
          {modoEdicion && (
            <small> (dejá vacío para conservar la imagen actual)</small>
          )}
          <input
            type="file"
            placeholder="https://"
            name="img"
            onChange={manejarCambioImagen}
            {...(!modoEdicion && { required: true })}
          />
        </label>
        <label className={styles.campo_checkbox}>
          <input
            type="checkbox"
            name="Activo"
            checked={datosForm.Activo}
            onChange={manejarCambio}
          />
          Producto Activo
        </label>
        <div className={styles.formulario_acciones}>
          <button type="button" onClick={onCerrar}>
            Cancelar
          </button>
          <button type="submit">
            {modoEdicion ? "Guardar cambios" : "Guardar producto"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default Producto;
