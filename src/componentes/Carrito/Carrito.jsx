import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import {
  CarritoWrapper,
  TituloCarrito,
  ImagenItem,
  NombreItem,
  DetalleItem,
  TotalTexto,
  CarritoVacio,
} from "./Carrito.styles.js";

function Carrito() {
  const { cart, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();

  const formatear = (valor) => Number(valor).toLocaleString("es-AR");

  return (
    <CarritoWrapper>
      <div className="max-w-5xl mx-auto px-4">
        <TituloCarrito>🍷 Carrito de compras</TituloCarrito>

        {cart.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg shadow-sm p-5">
            <CarritoVacio>
              Tu carrito está vacío.{" "}
              <Link
                to="/comprar"
                className="text-amber-700 font-semibold underline hover:text-amber-900"
              >
                ¡Ve a comprar algo rico! 🥂
              </Link>
            </CarritoVacio>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Lista de productos */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm border-0 overflow-hidden">
                <ul className="divide-y divide-gray-100 list-none m-0 p-0">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 py-3 px-4"
                    >
                      <ImagenItem
                        src={item.Imagen}
                        alt={item.Descripcion || item.ProNom}
                      />
                      <div className="flex-grow-1">
                        <NombreItem>
                          {item.Descripcion || item.ProNom}
                        </NombreItem>
                        <DetalleItem>
                          {item.quantity} × ${formatear(item.Precio)} c/u
                        </DetalleItem>
                      </div>
                      <div className="whitespace-nowrap font-bold text-green-600">
                        ${formatear(Number(item.Precio) * item.quantity)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resumen */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm border-0 overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 font-bold uppercase text-sm text-gray-500">
                  Resumen de la compra
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span>Productos: {getCartQuantitySafe(cart)}</span>
                    <span>${formatear(total)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center mb-3">
                    <TotalTexto>
                      <strong>Total:</strong>
                    </TotalTexto>
                    <TotalTexto>
                      <strong>${formatear(total)}</strong>
                    </TotalTexto>
                  </div>
                  <div className="grid gap-2">
                    <button
                      type="button"
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-4 py-3 rounded-lg transition-colors cursor-pointer border-none"
                    >
                      Finalizar compra
                    </button>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="bg-white hover:bg-red-50 text-red-600 border border-red-600 font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CarritoWrapper>
  );
}

// Cantidad total de unidades en el carrito
function getCartQuantitySafe(cart) {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

export default Carrito;
