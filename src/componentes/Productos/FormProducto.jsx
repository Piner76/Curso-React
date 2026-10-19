import AbmToolbar from "../Botonera/Botonera";
import styles from "./FormProducto.module.css";
import { arrayProductos } from "../../../public/data/productos.js";

export function FormProducto() {
  return (
    <div className={[styles.tabla_container]}>
      <h3>Productos</h3>
      <AbmToolbar
        onAlta={() => alert("Alta de producto")}
        onModificar={() => alert("Modificar producto")}
        onBaja={() => alert("Baja de producto")}
        haySeleccion={true} // Cambiar según la lógica de selección
      />

      <div className={[styles.tabla]}>
        <thead className={[styles.tabla_thead]}>
          <th className={[styles.tabla_th]}>ID</th>
          <th className={[styles.tabla_th]}>Categoría</th>
          <th className={[styles.tabla_th]}>Producto</th>
          <th className={[styles.tabla_th]}>Precio</th>
          <th className={[styles.tabla_th]}>Stock</th>
          <th className={[styles.tabla_th]}>Activo</th>
        </thead>

        <tbody className={[styles.tabla_tbody]}>
          {arrayProductos.map((producto) => (
            <tr key={producto.id} className={[styles.tabla_tr]}>
              <td className={[styles.dato_id]}>{producto.id}</td>
              <td className={[styles.tabla_td]}>{producto.categoria}</td>
              <td className={[styles.tabla_td]}>{producto.descripcion}</td>
              <td className={[styles.dato_id]}>
                ${producto.precio.toFixed(2)}
              </td>
              <td className={[styles.tabla_td]}>{producto.stock}</td>
              <td className={[styles.activa]}>
                {producto.activo ? "Sí" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
}

export default FormProducto;
