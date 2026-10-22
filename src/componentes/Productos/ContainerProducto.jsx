import { useState } from "react";
import FormProducto from "./FormProducto";

export function ContainerProducto() {
  const [datosForm, setDatosForm] = useState({
    categoria: "",
    producto: "",
    precio: "",
    stock: "",
    activo: false,
  });
  const [imagenFile, setImagenFile] = useState(null);
  // 2. Nueva función para manejar el cambio del input de tipo "file"
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
      if (datosImgbb.success) {
        console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
        // Unimos la URL de la imagen con el resto de los datos del formulario;
        const productoCompleto = {
          ...datosForm,
          // Agregamos la URL obtenida
          urlImagen: datosImgbb.data.url,
        };
        console.log(
          "Enviando los siguientes datos COMPLETOS a la API:",
          productoCompleto,
        );
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
    }
  };

  return (
    <FormProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
    />
  );
}
export default ContainerProducto;

//
