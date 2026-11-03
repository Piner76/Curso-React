import { db } from "./firebaseConfig";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";

async function crearEstructuraComercial() {
  try {
    // 1. Insertar una Marca
    const marcaId = "MARCA-01";
    await setDoc(doc(db, "marcas", marcaId), {
      nombre: "Nike",
      logo_url: "https://googleapis.com",
    });
    console.log("Marca creada");

    // 2. Insertar una Promoción / Descuento
    const promoId = "PROM-CYBER";
    await setDoc(doc(db, "promociones", promoId), {
      nombre: "Descuento Cyber Monday",
      tipo: "porcentaje", // Puede ser 'porcentaje' o 'monto_fijo'
      valor: 20, // 20% de descuento
      activo: true,
      fecha_inicio: serverTimestamp(),
      fecha_fin: new Date("2026-11-30T23:59:59"), // Fecha límite
    });
    console.log("Promoción creada");

    // 3. Insertar el Artículo vinculado a la Marca
    const articuloId = "ART-001";
    await setDoc(doc(db, "articulos", articuloId), {
      codigo: articuloId,
      descripcion: "Camiseta de algodón deportiva",
      id_marca: marcaId, // Vinculamos el artículo a la marca Nike
      activo: true,
    });
    console.log("Artículo creado");

    // 4. Insertar el Producto con Imagen y Promoción aplicada
    const productoId = "PROD-101";
    await setDoc(doc(db, "productos", productoId), {
      cod_articulo: articuloId,
      cod_producto: productoId,
      nombre: "Camiseta Negra Talle M",
      precio: 25.99,
      stock: 50,
      // URL del archivo subido previamente a Firebase Storage
      imagen_url: "https://googleapis.com",
      id_promocion: promoId, // Vinculamos el producto al descuento del Cyber Monday
    });
    console.log("Producto con imagen y descuento creado con éxito");
  } catch (error) {
    console.error("Error al registrar los datos comerciales: ", error);
  }
}

crearEstructuraComercial();
