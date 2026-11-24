import { useState } from "react";
import FormProducto from "./FormProducto";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useProductos } from "../../context/ProductosContext";
import { useCategorias } from "../../context/CategoriasContext";

// Estado inicial vacío del formulario (usado para alta y para resetear)
const FORM_VACIO = {
  CategoriaId: "",
  ProNom: "",
  Descripcion: "",
  Precio: "",
  Stock: "",
  Activo: false,
};

export function ContainerProducto() {
  const { refrescarProductos, todosLosProductos } = useProductos();
  const { categorias } = useCategorias();

  // 1. Ajustamos el estado inicial para que use CategoriaId
  const [datosForm, setDatosForm] = useState(FORM_VACIO);
  const [imagenFile, setImagenFile] = useState(null);
  // null = modo Alta | id del producto = modo Modificación
  const [idEditando, setIdEditando] = useState(null);

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

  // ===================== VALIDACIÓN DE DATOS =====================
  const validarFormulario = (datos) => {
    const errores = [];

    if (!datos.CategoriaId) {
      errores.push("Debes seleccionar una categoria.");
    }

    if (!datos.ProNom || datos.ProNom.trim().length < 3) {
      errores.push("El nombre del producto debe tener al menos 3 caracteres.");
    }

    if (datos.Descripcion && datos.Descripcion.trim().length > 300) {
      errores.push("La descripción no puede superar los 300 caracteres.");
    }

    const precio = Number(datos.Precio);
    if (datos.Precio === "" || Number.isNaN(precio) || precio <= 0) {
      errores.push("El precio debe ser un número mayor a 0.");
    }

    const stock = Number(datos.Stock);
    if (
      datos.Stock === "" ||
      Number.isNaN(stock) ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      errores.push("El stock debe ser un número entero mayor o igual a 0.");
    }

    return errores;
  };

  // Sube la imagen a Imgbb (solo si el usuario eligió una nueva)
  const subirImagen = async () => {
    if (!imagenFile) return null;

    const apiKey = "58905c0f753cf81c11e6252165534c12";
    const formData = new FormData();
    formData.append("image", imagenFile);

    const respuestaImgbb = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      { method: "POST", body: formData },
    );

    const datosImgbb = await respuestaImgbb.json();
    if (!datosImgbb.success) {
      throw new Error("La subida de la imagen a Imgbb falló.");
    }

    /*
     * Imgbb devuelve varias URLs dentro de datosImgbb.data:
     *  - data.url          → página del visor (https://ibb.co/xxx) NO sirve para <img>
     *  - data.display_url  → imagen directa (https://i.ibb.co/xxx.jpg) ✓
     *  - data.image.url    → imagen directa alternativa
     * Usamos encadenamiento opcional (?.) para no romper si algún campo falta.
     */
    const urlDirecta =
      datosImgbb.data?.display_url || datosImgbb.data?.image?.url;
    if (!urlDirecta) {
      throw new Error("Imgbb no devolvió una URL de imagen válida.");
    }
    return urlDirecta;
  };

  // ===================== ALTA (CREATE) =====================
  const crearProducto = async () => {
    const urlImagen = await subirImagen();
    if (!urlImagen) {
      alert("Por favor, selecciona una imagen para el producto.");
      return false;
    }

    const productosRef = collection(db, "Productos");
    await addDoc(productosRef, { ...datosForm, Imagen: urlImagen });
    return true;
  };

  // ===================== MODIFICACIÓN (UPDATE) =====================
  const actualizarProducto = async () => {
    // Si no se eligió imagen nueva, conservamos la existente
    const urlImagen = await subirImagen();
    const productoActualizado = {
      ...datosForm,
      ...(urlImagen && { Imagen: urlImagen }),
    };

    const docRef = doc(db, "Productos", idEditando);
    await updateDoc(docRef, productoActualizado);
    return true;
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Validamos antes de tocar la base de datos
    const errores = validarFormulario(datosForm);
    if (errores.length > 0) {
      alert("Revisá estos campos:\n\n• " + errores.join("\n• "));
      return false;
    }

    try {
      if (idEditando) {
        await actualizarProducto();
      } else {
        await crearProducto();
      }

      // Reseteamos el formulario y el modo edición
      setDatosForm(FORM_VACIO);
      setImagenFile(null);
      setIdEditando(null);

      await refrescarProductos();
      return true; 
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert(
        "Hubo un error al guardar el producto. Por favor, intentá de nuevo.",
      );
      return false;
    }
  };

  const eliminarProducto = async (id) => {
    if (!id) {
      alert("Seleccioná un producto para dar de baja.");
      return;
    }
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
        alert(
          "Hubo un error al eliminar el producto. Por favor, intentá de nuevo.",
        );
      }
    }
  };

  // Carga los datos del producto seleccionado en el form y activa el modo edición
  const modificarProducto = (id) => {
    const producto = todosLosProductos.find((p) => p.id === id);
    if (!producto) return;

    setIdEditando(id);
    setImagenFile(null); // la imagen solo se reemplaza si se elige una nueva
    setDatosForm({
      CategoriaId: producto.CategoriaId || "",
      ProNom: producto.ProNom || "",
      Descripcion: producto.Descripcion || "",
      Precio: producto.Precio ?? "",
      Stock: producto.Stock ?? "",
      Activo: Boolean(producto.Activo),
    });
  };

  // Cancelar edición: vuelve al modo alta con el form limpio
  const cancelarEdicion = () => {
    setIdEditando(null);
    setDatosForm(FORM_VACIO);
    setImagenFile(null);
  };

  return (
    <FormProducto
      datosForm={datosForm}
      categorias={categorias} // Las categorías vienen del contexto
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      eliminarProducto={eliminarProducto}
      modificarProducto={modificarProducto}
      idEditando={idEditando}
      cancelarEdicion={cancelarEdicion}
    />
  );
}
export default ContainerProducto;
