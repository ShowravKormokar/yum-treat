import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ThankYou = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-[#fefefe] text-center px-4">
            <FaCheckCircle className="text-[#34d399] text-6xl mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h1>
            <p className="text-lg text-gray-600 max-w-md">
                We've received your order and are preparing it with care. You'll receive a confirmation email shortly.
            </p>
            <Link
                to="/"
                className="mt-6 inline-block bg-[#c34c2e] text-white px-6 py-3 rounded-md hover:bg-[#a53a23] transition"
            >
                Back to Home
            </Link>
        </section>
    );
};

export default ThankYou;
