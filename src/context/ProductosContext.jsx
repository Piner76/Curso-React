import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const ProductosContext = createContext();
export const useProductos = () => useContext(ProductosContext);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fetchProductos = async () => {
    try {
      const productosRef = collection(db, "Productos");
      const snapshot = await getDocs(productosRef);
      const productosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosData);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    // Carga inicial de productos desde Firestore
    const cargar = async () => {
      await fetchProductos();
    };
    cargar();
  }, []);

  return (
    <ProductosContext.Provider
      value={{ productos, cargando, refrescarProductos: fetchProductos }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
