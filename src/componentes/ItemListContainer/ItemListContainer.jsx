import { useSearchParams } from "react-router-dom";
import Item from "../Item/Item";
import styles from "./ItemListContainer.module.css";
import { useProductos } from "../../context/ProductosContext";
import { useCategorias } from "../../context/CategoriasContext"; // Traemos las categorías

function ItemListContainer({ mensaje }) {
  const { productos, cargando } = useProductos();
  const { categorias } = useCategorias();
  
  // Leemos los parámetros de la URL
  const [searchParams] = useSearchParams();
  const categoriaId = searchParams.get("categoria");

  // Filtramos los productos si es que hay una categoría seleccionada
  const productosFiltrados = categoriaId
    ? productos.filter((prod) => prod.CategoriaId === categoriaId)
    : productos;

  // Buscamos el nombre de la categoría para mostrarlo en el título
  const categoriaActual = categorias.find((cat) => cat.id === categoriaId);
  
  // Definimos el título dinámico
  let tituloMostrar = mensaje;
  if (categoriaId) {
    tituloMostrar = categoriaActual ? `Categoría: ${categoriaActual.CatNom}` : "Productos";
  }

  return (
    <div className={styles.contenedor}>
      <h2>{tituloMostrar}</h2>
      
      {cargando && <p>Cargando productos...</p>}
      
      {!cargando && productosFiltrados.length === 0 && (
        <p className={styles.mensaje}>No hay productos en esta categoría.</p>
      )}

      {!cargando && productosFiltrados.length > 0 && (
        <div className={styles.grid}>
          {productosFiltrados.map((producto) => (
            <Item
              key={producto.id}
              id={producto.id}
              ProNom={producto.ProNom}
              Descripcion={producto.Descripcion}
              Precio={producto.Precio}
              Imagen={producto.Imagen}
              Stock={producto.Stock}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemListContainer;