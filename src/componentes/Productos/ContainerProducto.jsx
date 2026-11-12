import { useState } from "react";
import FormProducto from "./FormProducto";
import { db } from "../../firebase/config";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useProductos } from "../../context/ProductosContext";
import { useCategorias } from "../../context/CategoriasContext";

export function ContainerProducto() {
  const { refrescarProductos } = useProductos();
  const { categorias } = useCategorias();
  // 1. Ajustamos el estado inicial para que use CategoriaId
  const [datosForm, setDatosForm] = useState({
    CategoriaId: "",
    ProNom: "",
    Descripcion: "",
    Precio: "",
    Stock: "",
    Activo: false,
  });
  const [imagenFile, setImagenFile] = useState(null);

  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;
    setDatosForm((datosActuales) => ({
      ...datosActuales,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return false;
    }

    const apiKey = "58905c0f753cf81c11e6252165534c12";
    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const datosImgbb = await respuestaImgbb.json();
      if (!datosImgbb.success) {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }

      // 3. Guardamos el producto con el CategoriaId y la URL de la imagen
      const productoCompleto = {
        ...datosForm,
        Imagen: datosImgbb.data.url,
      };

      //console.log("Guardando el producto en Firestore:", productoCompleto);
      const productosRef = collection(db, "Productos");
      await addDoc(productosRef, productoCompleto);

      //alert("¡Producto guardado con éxito!");

      // 4. Reseteamos el form con los nombres correctos
      setDatosForm({
        CategoriaId: "",
        ProNom: "",
        Descripcion: "",
        Precio: "",
        Stock: "",
        Activo: false,
      });
      setImagenFile(null);

      await refrescarProductos();
      return true; // Éxito para cerrar el modal
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al guardar el producto. Por favor, intentá de nuevo.");
      return false;
    }
  };

  const eliminarProducto = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?",
    );
    if (confirmacion) {
      try {
        const docRef = doc(db, "Productos", id);
        await deleteDoc(docRef);
        await refrescarProductos(); // Actualizamos la lista de productos
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al eliminar el producto. Por favor, intentá de nuevo.");
      }
    }
  };

  return (
    <FormProducto
      datosForm={datosForm}
      categorias={categorias} // Las categorías vienen del contexto
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      eliminarProducto={eliminarProducto}
    />
  );
}
export default ContainerProducto;