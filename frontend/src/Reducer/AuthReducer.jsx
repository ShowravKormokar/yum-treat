//This reducer handles how your authentication state (like login, logout token) should change in response to certain actions.
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "REMOVE_TOKEN": {
            const removeToken = localStorage.removeItem("token"); //It's responsible for clearing the token both from localStorage and from React state.

            return {
                ...state, //spreads the previous state (in case you add more fields in the future).
                token: "", //sets token to an empty string, meaning user is logged out.
                removeToken
            }
        }
        default:
            return state;
    }
};

export default AuthReducer