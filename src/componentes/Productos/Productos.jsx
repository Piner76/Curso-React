export function Producto({
  datosForm,
  categorias = [],
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  modoEdicion = false,
  onCerrar,
}) {
  const handleSubmit = async (evento) => {
    evento.preventDefault();
    const exito = await manejarEnvio(evento);
    if (exito) onCerrar();
  };

  return (
    <dialog
      className="fixed left-1/2 top-1/2 z-50 m-0 -translate-x-1/2 -translate-y-1/2 w-[min(32rem,calc(100%-2rem))] max-h-[calc(100%-2rem)] overflow-y-auto p-6 rounded-xl text-slate-700 shadow-2xl backdrop:bg-slate-900/60 open:flex open:flex-col"
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
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2
          id="titulo-form-producto"
          className="text-xl font-semibold text-slate-800 m-0"
        >
          {modoEdicion ? "Modificar producto" : "Alta de producto"}
        </h2>
        <button
          type="button"
          className="text-slate-500 hover:text-slate-700 text-2xl leading-none cursor-pointer bg-transparent border-0"
          onClick={onCerrar}
          aria-label="Cerrar formulario"
        >
         X
        </button>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-1.5 text-sm text-slate-700">
          Categoría
          <select
            name="CategoriaId"
            value={datosForm.CategoriaId}
            onChange={manejarCambio}
            required
            className="w-full px-3 py-2.5 border border-slate-300 rounded-md text-slate-800 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.CatNom}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm text-slate-700">
          Producto
          <input
            type="text"
            name="ProNom"
            value={datosForm.ProNom}
            onChange={manejarCambio}
            required
            minLength={3}
            maxLength={60}
            placeholder="Mánimo 3 caracteres"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </label>

        <label className="grid gap-1.5 text-sm text-slate-700">
          Descripción
          <textarea
            name="Descripcion"
            value={datosForm.Descripcion}
            onChange={manejarCambio}
            rows={3}
            maxLength={300}
            placeholder="Máximo 300 caracteres"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
          />
        </label>

        <label className="grid gap-1.5 text-sm text-slate-700">
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
            className="w-full px-3 py-2.5 border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </label>

        <label className="grid gap-1.5 text-sm text-slate-700">
          Stock
          <input
            type="number"
            name="Stock"
            min="0"
            step="1"
            value={datosForm.Stock}
            onChange={manejarCambio}
            required
            placeholder="Entero 0-9999"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </label>

        <label className="grid gap-1.5 text-sm text-slate-700">
          Imagen
          {modoEdicion && (
            <small className="text-slate-500 font-normal">
              (dejá vací­o para conservar la imagen actual)
            </small>
          )}
          <input
            type="file"
            name="img"
            onChange={manejarCambioImagen}
            {...(!modoEdicion && { required: true })}
            className="w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-violet-600 file:text-white file:font-medium file:cursor-pointer hover:file:bg-violet-700"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="Activo"
            checked={datosForm.Activo}
            onChange={manejarCambio}
            className="w-4 h-4 accent-violet-600"
          />
          Producto Activo
        </label>

        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={onCerrar}
            className="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#422d76] hover:bg-[#523a92] text-white rounded-md transition-colors cursor-pointer"
          >
            {modoEdicion ? "Guardar cambios" : "Guardar producto"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default Producto;
