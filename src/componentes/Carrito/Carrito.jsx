import { Container, Row, Col, Card, ListGroup, Button, Alert } from "react-bootstrap";
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
      <Container>
        <TituloCarrito>🍷 Carrito de compras</TituloCarrito>

        {cart.length === 0 ? (
          <Alert variant="warning" className="shadow-sm">
            <CarritoVacio>
              Tu carrito está vacío.{" "}
              <Link to="/comprar">¡Ve a comprar algo rico! 🥂</Link>
            </CarritoVacio>
          </Alert>
        ) : (
          <Row className="g-4">
            {/* Lista de productos */}
            <Col xs={12} lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <ListGroup variant="flush">
                    {cart.map((item) => (
                      <ListGroup.Item key={item.id} className="d-flex align-items-center gap-3 py-3">
                        <ImagenItem
                          src={item.Imagen}
                          alt={item.Descripcion || item.ProNom}
                        />
                        <div className="flex-grow-1">
                          <NombreItem>{item.Descripcion || item.ProNom}</NombreItem>
                          <DetalleItem>
                            {item.quantity} × ${formatear(item.Precio)} c/u
                          </DetalleItem>
                        </div>
                        <div className="text-nowrap fw-bold text-success">
                          ${formatear(Number(item.Precio) * item.quantity)}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            {/* Resumen */}
            <Col xs={12} lg={4}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white fw-bold text-uppercase small text-muted">
                  Resumen de la compra
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Productos: {getCartQuantitySafe(cart)}</span>
                    <span>${formatear(total)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <TotalTexto>
                      <strong>Total:</strong>
                    </TotalTexto>
                    <TotalTexto>
                      <strong>${formatear(total)}</strong>
                    </TotalTexto>
                  </div>
                  <div className="d-grid gap-2">
                    <Button variant="success" size="lg">
                      Finalizar compra
                    </Button>
                    <Button variant="outline-danger" onClick={clearCart}>
                      Vaciar carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </CarritoWrapper>
  );
}

// Cantidad total de unidades en el carrito
function getCartQuantitySafe(cart) {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

export default Carrito;
