import AbmToolbar from "../Botonera/Botonera";
import styles from "./FormProducto.module.css";
import { arrayProductos } from "../../../public/data/productos.js";
import Producto from "./Productos.jsx";
import { useState } from "react";

export function FormProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
}) {
  const [mostrarModal, setMostrarModal] = useState(false);

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
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Activo</th>
          </tr>
        </thead>

        <tbody className={styles.tabla_tbody}>
          {arrayProductos.map((producto) => (
            <tr key={producto.id}>
              <td className={styles.dato_id}>{producto.id}</td>
              <td>{producto.categoria}</td>
              <td>{producto.descripcion}</td>
              <td className={styles.dato_id}>
                ${producto.precio.toFixed(2)}
              </td>
              <td>{producto.stock}</td>
              <td>
                {producto.activo ? "Sí" : "No"}
              </td>
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
