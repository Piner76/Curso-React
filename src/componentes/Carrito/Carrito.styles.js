import styled from "styled-components";

export const CarritoWrapper = styled.div`
  min-height: 60vh;
  background: linear-gradient(180deg, #faf6f0 0%, #f3ece2 100%);
  padding: 2rem 1rem 4rem;
`;

export const TituloCarrito = styled.h2`
  color: #5a3d2b;
  font-weight: 700;
  letter-spacing: 0.5px;
 
  display: inline-block;
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
`;

export const ImagenItem = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

export const NombreItem = styled.span`
  font-weight: 600;
  color: #3d2b1f;
  display: block;

  @media (min-width: 768px) {
    display: inline;
  }
`;

export const DetalleItem = styled.span`
  color: #7a6552;
  font-size: 0.95rem;
  gap: 10.5rem;

`;

export const TotalTexto = styled.span`
  font-size: 1.3rem;
  color: #5a3d2b;
   gap: 3.5rem;
`;

export const CarritoVacio = styled.div`
  font-size: 1.1rem;
  color: #7a6552;
`;
