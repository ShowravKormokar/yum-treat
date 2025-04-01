import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" required />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400" />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="text-blue-500 text-sm">Forgot password?</Link>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Sign In</button>
                </form>
                <p className="text-sm text-center mt-4">
                    Don't have an account? <Link to="/sign_up" className="text-blue-500">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;