// Routing
import { Navigate } from "react-router-dom";

// HTTP Client
import axios from "axios";

const validateSession = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/v1/auth/validate_session`,
            {
                withCredentials: true,
            }
        );
        return response.data.ok;
    } catch (error) {
        return false;
    }
};

const ProtectedRoute = ({ isAuthenticated, element }) => {
    return isAuthenticated ? element : <Navigate to="/sign-in" replace />;
};

const signOut = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/auth/sign_out`,
        {
            withCredentials: true,
        }
    );
    if (response.data.ok) {
        window.location.href = "/";
    }
};

export default ProtectedRoute;
export { validateSession, signOut };
