import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore"; 

const ProductosContext = createContext();
export const useProductos = () => useContext(ProductosContext);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]); // Solo activos (Tienda)
  const [todosLosProductos, setTodosLosProductos] = useState([]); // Todos (Admin)
  const [cargando, setCargando] = useState(true);

  const fetchProductos = async () => {
    try {
      setCargando(true);
      const productosRef = collection(db, "Productos");
      
      // 1. Traemos TODOS los productos (para el Admin)
      const snapshotTodos = await getDocs(productosRef);
      const dataTodos = snapshotTodos.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodosLosProductos(dataTodos);

      // 2. Traemos SOLO los activos (para la Tienda)
      // Si algún producto viejo no tiene el campo Activo, lo podés forzar o ignorar
      const qActivos = query(productosRef, where("Activo", "==", true));
      const snapshotActivos = await getDocs(qActivos);
      const dataActivos = snapshotActivos.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(dataActivos);
      
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <ProductosContext.Provider
      value={{ 
        productos, 
        todosLosProductos, 
        cargando, 
        refrescarProductos: fetchProductos 
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}