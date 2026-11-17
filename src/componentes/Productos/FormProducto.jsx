import AbmToolbar from "../Botonera/Botonera";
import styles from "./FormProducto.module.css";
import Producto from "./Productos.jsx";
import { useState } from "react";
import { useProductos } from "../../context/ProductosContext";



export function FormProducto({
  datosForm,
  categorias,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  eliminarProducto,
  modificarProducto,
  idEditando,
  cancelarEdicion,
}) {
  // Los productos y el estado de carga vienen del contexto
  const { todosLosProductos, cargando } = useProductos();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  // Permite marcar/desmarcar un producto de la lista (solo uno a la vez)
  const manejarSeleccion = (id, checked) => {
    setIdSeleccionado(checked ? id : null);
  };

  return (
    <div className={styles.tabla_container}>
      <h3>Productos</h3>
      <AbmToolbar
        onAlta={() => {
          if (idEditando) cancelarEdicion(); // si veníamos de editar, volvemos a modo alta
          setMostrarModal(true);
        }}
        onModificar={() => {
          if (idSeleccionado === null) {
            alert("Seleccioná un producto de la tabla para modificar.");
            return;
          }
          modificarProducto(idSeleccionado); // precarga los datos en el form
          setMostrarModal(true); // reutilizamos el mismo modal del alta
        }}
        onBaja={() => {
          eliminarProducto(idSeleccionado);
          setIdSeleccionado(null); // limpiamos la selección tras la baja
        }}
        haySeleccion={idSeleccionado !== null}
      />

      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Sel</th>
            <th>ID</th>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Activo</th>
          </tr>
        </thead>

        <tbody className={styles.tabla_tbody}>
          {cargando && (
            <tr>
              <td colSpan={6}>Cargando productos desde Firebase...</td>
            </tr>
          )}
          {!cargando && todosLosProductos.length === 0 && (
            <tr>
              <td colSpan={6}>
                No hay productos cargados en la base de datos.
              </td>
            </tr>
          )}
          {!cargando &&
            todosLosProductos.map((producto) => (
              <tr
                key={producto.id}
                className={
                  idSeleccionado === producto.id ? styles.fila_seleccionada : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    name={`seleccion-${producto.id}`}
                    checked={idSeleccionado === producto.id}
                    onChange={(e) =>
                      manejarSeleccion(producto.id, e.target.checked)
                    }
                  />
                </td>
                <td className={styles.dato_id}>{producto.id}</td>
              
             <td>
  {categorias.find((categoria) => categoria.id === producto.CategoriaId)?.CatNom || "Sin categoría"}
</td>
              
                <td>{producto.ProNom}</td>
                <td className={styles.dato_id}>
                  ${Number(producto.Precio).toFixed(2)}
                </td>
                <td>{producto.Stock}</td>
                <td>{producto.Activo ? "Sí" : "No"}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {mostrarModal && (
        <Producto
          datosForm={datosForm}
          categorias={categorias}
          manejarCambio={manejarCambio}
          manejarEnvio={manejarEnvio}
          manejarCambioImagen={manejarCambioImagen}
          modoEdicion={idEditando !== null}
          onCerrar={() => {
            if (idEditando) cancelarEdicion(); // descartamos cambios al cerrar
            setMostrarModal(false);
          }}
        />
      )}
    </div>
  );
}

export default FormProducto;
