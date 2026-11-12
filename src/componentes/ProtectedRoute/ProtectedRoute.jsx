import { useAuth } from '../../context/AuthContext'; 
import { Navigate } from 'react-router-dom'; 
 
const ProtectedRoute = ({ children }) => { 
    const { user, loading } = useAuth(); 
 
    if (loading) { 
        return <div>Cargando...</div>; 
    }
    if (!user || user.rol !== 'admin') {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;