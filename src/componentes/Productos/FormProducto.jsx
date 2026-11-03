import AbmToolbar from "../Botonera/Botonera";
import styles from "./FormProducto.module.css";
// =================================================================
// CÓDIGO VIEJO (array local) - dejado comentado
// =================================================================
// import { arrayProductos } from "../../../public/data/productos.js";
// =================================================================
import Producto from "./Productos.jsx";
import { useState } from "react";

export function FormProducto({
  datosForm,
  productos,
  cargando,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
}) {
  const [mostrarModal, setMostrarModal] = useState(false);

  // =================================================================
  // CÓDIGO VIEJO (datos desde el array local) - dejado comentado
  // =================================================================
  /*
  const productos = arrayProductos;
  */
  // =================================================================

  // NUEVO: los productos llegan por props, obtenidos desde Firebase
  // (se pasan desde ContainerProducto, que los trae con getDocs)

  return (
    <div className={styles.tabla_container}>
      <h3>Productos</h3>
      <AbmToolbar
        onAlta={() => setMostrarModal(true)}
        onModificar={() => alert("Modificar producto")}
        onBaja={() => alert("Baja de producto")}
        haySeleccion={true}
      />

      <table className={styles.tabla}>
        <thead>
          <tr>
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
          {!cargando && productos.length === 0 && (
            <tr>
              <td colSpan={6}>
                No hay productos cargados en la base de datos.
              </td>
            </tr>
          )}
          {!cargando &&
            productos.map((producto) => (
              <tr key={producto.id}>
                <td className={styles.dato_id}>{producto.id}</td>
                <td>{producto.Artnom}</td>
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
          manejarCambio={manejarCambio}
          manejarEnvio={manejarEnvio}
          manejarCambioImagen={manejarCambioImagen}
          onCerrar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}

export default FormProducto;
