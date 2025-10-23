import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import Loader from "../../components/Loader/Loader";
import apiF from "../../lib/api.js";

const SignIn = () => {
    const { storeTokenInLS } = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [userlogIn, setUserLogIn] = useState({ email: "", password: "" });

    // 🔹 Handle input changes
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUserLogIn((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const resData = await apiF.post("/api/auth/sign_in", userlogIn);

            storeTokenInLS(resData.token, rememberMe);
            alert("✅ Log in successful!");

            // 🧭 Redirect based on role
            const role = resData?.user?.userRole;
            navigate(role === "admin" ? "/admin-dashboard" : "/");

        } catch (err) {
            console.error("Login failed:", err.message);
            alert(`❌ ${err.message || "Login failed!"}`);
        } finally {
            setLoading(false);
            setUserLogIn({ email: "", password: "" });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
                    <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userlogIn.email}
                                onChange={handleInputs}
                                required
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#c34c2e] focus:outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={userlogIn.password}
                                onChange={handleInputs}
                                required
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#c34c2e] focus:outline-none"
                            />
                        </div>

                        {/* Remember me + Forgot password */}
                        <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="w-4 h-4 text-[#c34c2e] border-gray-300 rounded focus:ring-[#c34c2e]"
                                />
                                <span className="ml-2">Remember me</span>
                            </label>
                            <NavLink to="/forgot-password" className="text-[#c34c2e] text-sm hover:underline">
                                Forgot password?
                            </NavLink>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#c34c2e] text-white py-2 rounded-lg hover:bg-black transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        Don’t have an account?{" "}
                        <NavLink to="/sign_up" className="text-[#c34c2e] underline hover:text-black">
                            Create one
                        </NavLink>
                    </p>
                </div>
            )}
        </div>
    );
};

export default SignIn;