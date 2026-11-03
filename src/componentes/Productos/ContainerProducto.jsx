import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export function ContainerProducto() {
  const [datosForm, setDatosForm] = useState({
    Artnom: "",
    ProNom: "",
    Precio: "",
    Stock: "",
    Activo: false,
  });
  const [imagenFile, setImagenFile] = useState(null);

  // Función para manejar el cambio del input de tipo "file"
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

    // Validamos que el usuario haya seleccionado una imagen
    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    // API key de Imgbb
    const apiKey = "58905c0f753cf81c11e6252165534c12";
    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      // 1. Subimos la imagen a Imgbb
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

      console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

      // 2. Armamos el producto completo con la URL de la imagen
      const productoCompleto = {
        ...datosForm,
        Imagen: datosImgbb.data.url,
      };
      console.log("Guardando el producto en Firestore:", productoCompleto);

      // 3. Guardamos el producto en la colección "Productos" de Firestore
      const productosRef = collection(db, "Productos");
      await addDoc(productosRef, productoCompleto);

      alert("¡Producto guardado con éxito!");
      // Limpiamos el formulario
      setDatosForm({
        Categoria: "",
        Producto: "",
        Precio: "",
        Stock: "",
        Activo: false,
      });
      setImagenFile(null);

      // Refrescamos la lista de productos para ver el nuevo en la tabla
      await obtenerProductos();
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert(
        "Hubo un error al guardar el producto. Por favor, intentá de nuevo.",
      );
    }
  };

  // Obtenemos los productos directamente desde Firebase (Firestore)
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerProductos = async () => {
    try {
      setCargando(true);
      const productosRef = collection(db, "Productos");
      const snapshot = await getDocs(productosRef);
      const listaProductos = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));
      setProductos(listaProductos);
    } catch (error) {
      console.error("Error al obtener los productos desde Firebase:", error);
    } finally {
      setCargando(false);
    }
  };

  // Al montar el componente, traemos los productos desde Firebase
  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <FormProducto
      datosForm={datosForm}
      productos={productos}
      cargando={cargando}
      obtenerProductos={obtenerProductos}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
    />
  );
}
export default ContainerProducto;
