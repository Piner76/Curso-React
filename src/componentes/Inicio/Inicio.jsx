import CardCategoria from "../CardCategoria/CardCategoria";
import { useCategorias } from "../../context/CategoriasContext";
import { Link } from "react-router-dom";

function Inicio() {
  const { categorias } = useCategorias();

  return (
    <div>
      {/* Banner principal */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg bg-[url('/images/banner.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Tu Tienda de Bebidas
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Una experiencia refrescante en cada trago.
          </p>
        </div>
      </section>

      {/* Categorías */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto px-4 sm:px-8 py-12">
        {categorias.map((categoria) => (
          <Link
            key={categoria.id}
            to={`/comprar?categoria=${categoria.id}`}
            className="block no-underline text-inherit transition-transform duration-200 hover:scale-[1.02]"
          >
            <CardCategoria
              imagen={categoria.Imagen}
              titulo={categoria.CatNom}
              descripcion={categoria.Descripcion}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Inicio;
