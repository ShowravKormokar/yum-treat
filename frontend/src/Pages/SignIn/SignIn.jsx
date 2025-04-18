import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

// SignIn post request url
const URL = "http://localhost:5000/api/auth/sign_in";

const SignIn = () => {
    const { storeTokenInLS } = useAuthContext();
    const navigate = useNavigate();

    const [userlogIn, setUserLogIn] = useState({
        email: "",
        password: ""
    });

    const [rememberMe, setRememberMe] = useState(false); // Track checkbox state

    // Handle user Input
    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserLogIn({
            ...userlogIn,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userlogIn)
            });

            console.log(res);
            if (res.ok) {
                const resdata = await res.json();
                if (rememberMe) {
                    storeTokenInLS(resdata.token); // Only store if checked
                }

                alert("Log in successfully!");
                setUserLogIn({ email: "", password: "" });
                navigate("/"); // redirect to /home
            } else {
                alert("Invalid credentials!");
                const errorData = await res.json(); // Read server error message
                alert(errorData.message || "Login failed!");
            }
        } catch (err) {
            alert("Login failed!");
            console.error(err);
        }
    }
    console.log(userlogIn);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userlogIn.email}
                            onChange={handleInputs}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userlogIn.password}
                            onChange={handleInputs}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
                        </div>
                        <NavLink to="/forgot-password" className="text-blue-500 text-sm">Forgot password?</NavLink>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Don't have an account? <NavLink to="/sign_up" className="text-blue-500">Create one</NavLink>
                </p>
            </div>
        </div>
    );
};

export default SignIn;