import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const CategoriasContext = createContext();

export const useCategorias = () => useContext(CategoriasContext);

export function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const categoriasRef = collection(db, "Categorias");
        const snapshot = await getDocs(categoriasRef);
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategorias(lista);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias }}>
      {children}
    </CategoriasContext.Provider>
  );
}