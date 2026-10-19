import { useState } from "react";
import FormProducto from "./FormProducto";

export function ContainerProducto() {
  const [datosForm, setDatosForm] = useState({
    categoria: "",
    producto: "",
    precio: "",
    stock: "",
    activo: false,
    img: "",
  });

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm((datosActuales) => ({ ...datosActuales, [name]: value }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    console.log("Enviando datos a la api:", datosForm);
  };

  return (
    <FormProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
    />
  );
}
export default ContainerProducto;
