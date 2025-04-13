import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Signup post request url
const url = "http://localhost:5000/api/auth/sign_up";

const SignUp = () => {

    const [usersignUp, setUserSignUp] = useState({
        email: "",
        password: "",
        cPassword: "",
        wrongPass: false
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserSignUp({
            ...usersignUp,
            [name]: value
        });

    }
    // console.log(usersignUp);

    const handleSubmit = async (e) => {
        e.preventDefault(); //Stops the browser from automaticaly reloading the page when the form submitted

        try {
            if (usersignUp.password === usersignUp.cPassword) {
                // console.info(usersignUp);

                const res = await fetch(url, {
                    method: "POST", //Tells the server this is a POST request
                    headers: {
                        "Content-Type": "application/json" // The request headers tells the backend: The request contains JSON data
                    },
                    body: JSON.stringify(usersignUp) // Converts the form objects into a JSON string
                });

                if (res.status === 201) {
                    alert("Sign up successfully!");
                    const resData = await res.json();

                    setUserSignUp({
                        email: "",
                        password: "",
                        cPassword: ""
                    });
                    navigate("/sign_in");
                } else {
                    const resData = await res.json();
                    alert(resData.message || "Signup failed");
                }
                // console.log(res);
            } else {
                setUserSignUp({
                    ...usersignUp,
                    wrongPass: true
                });
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            name="email"
                            value={usersignUp.email}
                            onChange={handleInput} required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password"
                            name="password"
                            value={usersignUp.password}
                            onChange={handleInput}
                            required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm your password"
                            name="cPassword"
                            value={usersignUp.cPassword}
                            onChange={handleInput}
                            required />
                    </div>

                    {/* Error message */}
                    {
                        usersignUp.wrongPass && <div className="wronMsg"><p>The password didn't match.</p></div>
                    }

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Sign Up</button>
                </form>
                <p className="text-sm text-center mt-4">
                    Already have an account? <NavLink to="/sign_in" className="text-blue-500">Sign in</NavLink>
                </p>
            </div>
        </div>
    );
};

export default SignUp;