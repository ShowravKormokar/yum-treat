import { createContext, useContext, useReducer } from "react";
import authReducer from "../Reducer/AuthReducer";

// Create context
const AuthContext = createContext();

// Get token from either localStorage or sessionStorage
const initialState = {
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
};

// AuthProvider Component
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Store token based on "Remember Me"
    const storeTokenInLS = (serverToken, rememberMe) => {
        //This function saves the JWT/token in localStorage when the user logs in. This use this to persist login state across sessions.
        if (rememberMe) {
            localStorage.setItem("token", serverToken); // Save for 30 days
        } else {
            sessionStorage.setItem("token", serverToken); // Session only
        }

        // Update token in state
        dispatch({
            type: "SET_TOKEN",
            payload: serverToken
        });
    };

    // Logout: remove token from both storages
    const logOutUser = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        dispatch({
            type: "REMOVE_TOKEN"
        });
    };

    // Boolean flag for login status
    const isLoggedIn = !!state.token;

    // Auth context value
    const value = {
        storeTokenInLS,
        logOutUser,
        isLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access context
const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };