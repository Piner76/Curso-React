import { useState } from "react";
import AbmToolbar from "../Botonera/Botonera";
import ProductoModal from "./Productos.jsx";
import { useProductos } from "../../context/ProductosContext";

export function FormProducto({
  datosForm,
  categorias = [],
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  eliminarProducto,
  modificarProducto,
  idEditando,
  cancelarEdicion,
}) {
  const { todosLosProductos, cargando } = useProductos();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  const cerrarModal = () => {
    if (idEditando) cancelarEdicion();
    setMostrarModal(false);
  };

  return (
    <section className="mx-auto w-full max-w-6xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 text-center text-xl font-semibold text-slate-800">Productos</h2>

      <AbmToolbar
        onAlta={() => {
          if (idEditando) cancelarEdicion();
          setMostrarModal(true);
        }}
        onModificar={() => {
          if (!idSeleccionado) {
            alert("Seleccioná un producto de la tabla para modificar.");
            return;
          }
          modificarProducto(idSeleccionado);
          setMostrarModal(true);
        }}
        onBaja={() => {
          eliminarProducto(idSeleccionado);
          setIdSeleccionado(null);
        }}
        haySeleccion={idSeleccionado !== null}
      />

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full border-collapse text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Sel.</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Activo</th>
            </tr>
          </thead>
          <tbody>
            {cargando && (
              <tr><td className="px-4 py-3" colSpan={7}>Cargando productos desde Firebase...</td></tr>
            )}
            {!cargando && todosLosProductos.length === 0 && (
              <tr><td className="px-4 py-3" colSpan={7}>No hay productos cargados en la base de datos.</td></tr>
            )}
            {!cargando && todosLosProductos.map((producto) => (
              <tr
                key={producto.id}
                className={`border-t border-slate-200 hover:bg-slate-50 ${idSeleccionado === producto.id ? "bg-violet-100" : ""}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label={`Seleccionar ${producto.ProNom}`}
                    checked={idSeleccionado === producto.id}
                    onChange={(evento) => setIdSeleccionado(evento.target.checked ? producto.id : null)}
                  />
                </td>
                <td className="px-4 py-3 font-mono">{producto.id}</td>
                <td className="px-4 py-3">{categorias.find((categoria) => categoria.id === producto.CategoriaId)?.CatNom || "Sin categoría"}</td>
                <td className="px-4 py-3">{producto.ProNom}</td>
                <td className="px-4 py-3">${Number(producto.Precio).toFixed(2)}</td>
                <td className="px-4 py-3">{producto.Stock}</td>
                <td className="px-4 py-3">{producto.Activo ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <ProductoModal
          datosForm={datosForm}
          categorias={categorias}
          manejarCambio={manejarCambio}
          manejarEnvio={manejarEnvio}
          manejarCambioImagen={manejarCambioImagen}
          modoEdicion={idEditando !== null}
          onCerrar={cerrarModal}
        />
      )}
    </section>
  );
}

export default FormProducto;
