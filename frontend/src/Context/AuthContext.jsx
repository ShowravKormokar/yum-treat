import { createContext, useContext, useReducer } from "react";
import authReducer from "../Reducer/AuthReducer";

// Create context
const AuthContext = createContext();
const initialState = {
    token: localStorage.getItem("token"),
}

// Create provider
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Store token in local storage
    const storeTokenInLS = (serverToken) => {
        //This function saves the JWT/token in localStorage when the user logs in. This use this to persist login state across sessions.
        return localStorage.setItem("token", serverToken);
    };

    //User logout 
    const logOutUser = () => {
        dispatch({
            type: "REMOVE_TOKEN" //This dispatches an action to the reducer to remove the token (logout).
        })
    };

    //Logged status
    let isLoggedIn = state.token;

    const value = {
        storeTokenInLS,
        logOutUser,
        isLoggedIn
    }
    //It passes down the value so any nested component can access auth state and functions.
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return (useAuthContext(AuthContext))
};

export { AuthProvider, useAuthContext }