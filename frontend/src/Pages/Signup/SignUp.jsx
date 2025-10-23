import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import apiF from "../../lib/api.js"; // ✅ Use centralized API helper

const SignUp = () => {
    const { storeTokenInLS } = useAuthContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        cPassword: "",
        role: "user",
    });

    const [error, setError] = useState(""); // For user-friendly error messages
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // if (formData.password !== formData.cPassword) {
        //     setError("Passwords do not match.");
        //     return;
        // }

        try {
            setLoading(true);
            const resData = await apiF.post("/api/auth/sign_up", formData); // ✅ Using apiF

            storeTokenInLS?.(resData.token); // Save token
            setFormData({ email: "", password: "", cPassword: "", role: "user" });
            navigate("/sign_in"); // Redirect after successful signup
        } catch (err) {
            // console.error(err);
            setError(err.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
                            required
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInput}
                            required
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="cPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="cPassword"
                            name="cPassword"
                            value={formData.cPassword}
                            onChange={handleInput}
                            required
                            placeholder="Confirm your password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#c34c2e] text-white py-2 rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <NavLink to="/sign_in" className="text-blue-500 underline">
                        Sign in
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default SignUp;