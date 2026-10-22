import { useCart } from "../../context/CartContext.jsx";

function Carrito() {
  const { cart, getCartTotal } = useCart();
  const total = getCartTotal();

  return (
    <div style={{ padding: "32px" }}>
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.descripcion || item.nombre} - {item.quantity} x $
                {item.precio.toLocaleString("es-AR")} = $
                {(item.precio * item.quantity).toLocaleString("es-AR")}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: ${total.toLocaleString("es-AR")}</strong>
          </p>
        </>
      )}
    </div>
  );
}

export default Carrito;
