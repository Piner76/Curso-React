const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "48rem",
  margin: "3rem auto",
  padding: "1.5rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  gap: "16px",
  color: "#333",
};

export function Producto({ datosForm, manejarCambio, manejarEnvio }) {
  <form style={formStyle} onSubmit={manejarEnvio}>
    <div>
      <label htmlFor="categoria">Categoría:</label>
      <input
        type="text"
        id="categoria"
        name="categoria"
        value={datosForm.categoria}
        onChange={manejarCambio}
      />
    </div>
    <div>
      <label htmlFor="producto">Producto:</label>
      <input
        type="text"
        id="producto"
        name="producto"
        value={datosForm.producto}
        onChange={manejarCambio}
      />
    </div>
    <div>
      <label htmlFor="precio">Precio:</label>
      <input
        type="number"
        id="precio"
        name="precio"
        value={datosForm.precio}
        onChange={manejarCambio}
      />
    </div>
    <div>
      <label htmlFor="stock">Stock:</label>
      <input
        type="number"
        id="stock"
        name="stock"
        value={datosForm.stock}
        onChange={manejarCambio}
      />
    </div>
    <div>
      <label htmlFor="img">Imagen:</label>
      <input
        type="text"
        id="img"
        name="img"
        value={datosForm.img}
        onChange={manejarCambio}
      />
    </div>
    {/* Aquí puedes agregar los otros 2 atributos del formulario en el futuro */}
    <button type="submit">Guardar Producto</button>
  </form>;
}
