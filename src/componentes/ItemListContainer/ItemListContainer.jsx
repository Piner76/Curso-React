import { useSearchParams } from "react-router-dom";
import Item from "../Item/Item";
import styles from "./ItemListContainer.module.css";
import { useProductos } from "../../context/ProductosContext";
import { useCategorias } from "../../context/CategoriasContext"; // Traemos las categorías

/*
 * ============================ BÚSQUEDA EN TIEMPO REAL ============================
 * La barra de búsqueda filtra los productos a medida que el usuario escribe,
 * sin recargar la página ni pedir datos al servidor de nuevo.
 * =================================================================================
 */

// Normaliza texto: minúsculas y sin acentos, para que "Vino" coincida con "vino" o "vínO"
const normalizar = (texto) =>
  (texto || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function ItemListContainer({ mensaje }) {
  const { productos, cargando } = useProductos();
  const { categorias } = useCategorias();

  // Leemos los parámetros de la URL (categoría y término de búsqueda)
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaId = searchParams.get("categoria");
  const terminoBusqueda = searchParams.get("buscar") || "";

  // Actualiza el término en la URL; con replace:false se agrega al historial
  const manejarBusqueda = (evento) => {
    const valor = evento.target.value;
    setSearchParams(
      (params) => {
        if (valor) params.set("buscar", valor);
        else params.delete("buscar");
        return params;
      },
      { replace: true }, 
    );
  };

  // 1er filtro: por categoría (si hay una seleccionada)
  const porCategoria = categoriaId
    ? productos.filter((prod) => prod.CategoriaId === categoriaId)
    : productos;

  // 2do filtro: por término de búsqueda (nombre o descripción)
  const busquedaNorm = normalizar(terminoBusqueda);
  const productosFiltrados = busquedaNorm
    ? porCategoria.filter(
        (prod) =>
          normalizar(prod.ProNom).includes(busquedaNorm) ||
          normalizar(prod.Descripcion).includes(busquedaNorm),
      )
    : porCategoria;

  // Buscamos el nombre de la categoría para mostrarlo en el título
  const categoriaActual = categorias.find((cat) => cat.id === categoriaId);

  // Definimos el título dinámico
  let tituloMostrar = mensaje;
  if (categoriaId) {
    tituloMostrar = categoriaActual
      ? `Categoría: ${categoriaActual.CatNom}`
      : "Productos";
  }

  return (
    <div className={styles.contenedor}>
      <h2>{tituloMostrar}</h2>

      {/* Barra de búsqueda en tiempo real (Tailwind) */}
      <div className="-mt-6 mb-8 max-w-md mx-auto">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            🔍
          </span>
          <input
            type="search"
            value={terminoBusqueda}
            onChange={manejarBusqueda}
            placeholder="Buscar por nombre o descripción..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors"
          />
          {terminoBusqueda && (
            <button
              type="button"
              onClick={() => manejarBusqueda({ target: { value: "" } })}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none text-lg leading-none"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {cargando && <p>Cargando productos...</p>}

      {!cargando && productosFiltrados.length === 0 && (
        <p className={styles.mensaje}>
          {busquedaNorm
            ? `No se encontraron productos para "${terminoBusqueda}".`
            : "No hay productos en esta categoría."}
        </p>
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
