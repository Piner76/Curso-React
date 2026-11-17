import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

/**
 * Protege rutas:
 * - Sin rolesPermitidos: alcanza con estar logueado (ej: /perfil).
 * - Con rolesPermitidos (ej: ["admin"]): además exige ese rol (ej: /panel).
 */
const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }
  // No logueado → al login
  if (!user) {
    return <Navigate to="/login" />;
  }
  // Logueado pero sin el rol requerido → al inicio
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
