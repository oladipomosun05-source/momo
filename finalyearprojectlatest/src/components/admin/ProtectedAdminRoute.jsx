import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ProtectedAdminRoute = ({ children }) => {
    const { isAdminAuth } = useAdminAuth();
    if (!isAdminAuth) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

export default ProtectedAdminRoute;
