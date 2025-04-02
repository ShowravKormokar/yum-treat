import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPinterest } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 py-12 p-5 ">
            {/* Newsletter Section */}
            <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-[#c34c2e]">Newsletter</h3>
                <form className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c34c2e]"
                    />
                    <button className="bg-[#c34c2e] text-white px-6 py-3 rounded-md hover:bg-black transition cursor-pointer">
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Footer Links Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 lg:px-20">
                <div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#c34c2e]">Our Menu</h3>
                    <nav className="flex flex-col gap-2">
                        <Link to="/pizza" className="hover:text-[#c34c2e]">Pizza</Link>
                        <Link to="/burger" className="hover:text-[#c34c2e]">Burger</Link>
                        <Link to="/chicken" className="hover:text-[#c34c2e]">Chicken</Link>
                        <Link to="/combo" className="hover:text-[#c34c2e]">Combo</Link>
                        <Link to="/coffee" className="hover:text-[#c34c2e]">Coffee</Link>
                    </nav>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#c34c2e]">Quick Links</h3>
                    <nav className="flex flex-col gap-2">
                        <Link to="/home" className="hover:text-[#c34c2e]">Home</Link>
                        <Link to="/about" className="hover:text-[#c34c2e]">About</Link>
                        <Link to="/popular" className="hover:text-[#c34c2e]">Popular</Link>
                        <Link to="/menu" className="hover:text-[#c34c2e]">Menu</Link>
                        <Link to="/order" className="hover:text-[#c34c2e]">Order</Link>
                        <Link to="/blogs" className="hover:text-[#c34c2e]">Blogs</Link>
                    </nav>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#c34c2e]">Extra Links</h3>
                    <nav className="flex flex-col gap-2">
                        <Link to="/orders" className="hover:text-[#c34c2e]">My Order</Link>
                        <Link to="/account" className="hover:text-[#c34c2e]">My Account</Link>
                        <Link to="/favorites" className="hover:text-[#c34c2e]">My Favorite</Link>
                        <Link to="/terms" className="hover:text-[#c34c2e]">Terms of Use</Link>
                        <Link to="/privacy" className="hover:text-[#c34c2e]">Privacy Policy</Link>
                    </nav>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#c34c2e]">Opening Hours</h3>
                    <p>Monday - Friday: 7:00 AM - 10:00 PM</p>
                    <hr className="mt-2 mb-2 text-[#c34c2e]" />
                    <p>Saturday & Sunday: Closed</p>
                </div>
            </div>

            {/* Social Media & Copyright */}
            <div className="text-center mt-10">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white bg-[#c34c2e] p-3 rounded-full hover:bg-gray-800 transition">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white bg-[#c34c2e] p-3 rounded-full hover:bg-gray-800 transition">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white bg-[#c34c2e] p-3 rounded-full hover:bg-gray-800 transition">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white bg-[#c34c2e] p-3 rounded-full hover:bg-gray-800 transition">
                        <FaLinkedin />
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-white bg-[#c34c2e] p-3 rounded-full hover:bg-gray-800 transition">
                        <FaPinterest />
                    </a>
                </div>

                <p className="text-gray-600 text-lg">Created by <span className="text-[#c34c2e] font-semibold font-[cursive]">Showrav Kormokar</span> | All Rights Reserved!</p>
            </div>
        </footer>
    );
};

export default Footer;
