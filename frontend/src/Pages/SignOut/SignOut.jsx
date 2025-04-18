import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { Navigate } from "react-router-dom";
import Loader from '../../components/Loader'; // 🧠 Import the Loader

const Logout = () => {
    const { logOutUser } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        logOutUser();
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate delay
    }, [logOutUser]);

    if (loading) {
        return <Loader />;
    }

    return <Navigate to="/" />;
};

export default Logout;
