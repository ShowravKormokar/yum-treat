import React, { useState } from "react";
import { IoMdMenu, IoMdClose, IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, profileImage }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-opacity-80 backdrop-blur-md bg-white/10 text-[#c34c2e] shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Menu Icon (Mobile) */}
                <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
                </button>

                {/* Logo */}
                <div className="text-2xl font-bold">YumTreat</div>

                {/* NavLinks (Desktop) */}
                <ul className="hidden lg:flex space-x-6 text-lg font-medium">
                    <li><Link to="/" className="hover:border-b-2 hover:transition hover:duration-700">Home</Link></li>
                    <li><Link to="/menus" className="hover:border-b-2 hover:transition hover:duration-700">Menus</Link></li>
                    <li><Link to="/events" className="hover:border-b-2 hover:transition hover:duration-700">Events</Link></li>
                    <li><Link to="/blogs" className="hover:border-b-2 hover:transition hover:duration-700">Blogs</Link></li>
                    <li><Link to="/about_us" className="hover:border-b-2 hover:transition hover:duration-700">About Us</Link></li>
                    <li><Link to="/contact" className="hover:border-b-2 hover:transition hover:duration-700">Contact Us</Link></li>
                </ul>

                {/* Cart & Profile Section */}
                <div className="flex items-center space-x-4">
                    <button onClick={() => setCartOpen(!cartOpen)}>
                        {cartOpen ? <IoMdClose size={28} /> : <IoMdCart size={28} />}
                    </button>
                    {isLoggedIn ? (
                        <Link to="/account">
                            <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#c34c2e]" />
                        </Link>
                    ) : (
                        <Link to="/sign_in" className="px-4 py-2 bg-[#c34c2e] text-white rounded-lg">Login</Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-red p-5 shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 lg:hidden`}>
                <button className="mb-4" onClick={() => setMenuOpen(false)}>
                    <IoMdClose size={28} />
                </button>
                <ul className="space-y-4 text-lg">
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/menus" onClick={() => setMenuOpen(false)}>Menus</Link></li>
                    <li><Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link></li>
                    <li><Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
                    <li><Link to="/about_us" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                    <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
                </ul>
            </div>

            {/* Cart Drawer */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-white p-5 shadow-lg transform ${cartOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
                <button className="mb-4" onClick={() => setCartOpen(false)}>
                    <IoMdClose size={28} />
                </button>
                <p className="text-lg font-semibold">Your Cart</p>
                {/* Cart items will be displayed here */}
            </div>
        </nav>
    );
};

export default Navbar;