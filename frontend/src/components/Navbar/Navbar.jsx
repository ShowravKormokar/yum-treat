import { useState } from "react";
import { FaBars, FaSearch, FaShoppingCart, FaUser, FaUtensils, FaTimes } from "react-icons/fa";
import Cart from "../Cart/Cart";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import SearchBar from "../Search/SearchBar";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const { isLoggedIn } = useAuthContext();
    // console.log("User is log in:", isLoggedIn);

    return (
        <div className="relative w-full">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg flex items-center pl-4  pr-4 md:justify-evenly">
                <div className="flex items-center md:hidden">
                    <FaBars className={`cursor-pointer ${menuOpen ? 'hidden' : 'block'}`} onClick={() => setMenuOpen(true)} />
                    <FaTimes className={`cursor-pointer ${menuOpen ? 'block' : 'hidden'}`} onClick={() => setMenuOpen(false)} />
                </div>

                <Link to="/home" className="text-3xl font-bold text-gray-800 flex items-center mx-auto md:mx-0">
                    <FaUtensils className="text-[#c34c2e] mr-2" /> YumTreat
                </Link>

                <nav className={`absolute top-20 left-0 w-full bg-white shadow-md p-4 flex flex-col items-center space-y-4 text-lg text-gray-600 md:relative md:top-auto md:left-auto md:w-auto md:flex-row md:space-y-0 md:space-x-6 md:bg-transparent md:shadow-none ${menuOpen ? "flex" : "hidden md:flex"}`}>
                    <NavLink to="/" className="hover:text-[#c34c2e]" onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/menus" className="hover:text-[#c34c2e]" onClick={() => setMenuOpen(false)}>Menus</NavLink>
                    <NavLink to="/events" className="hover:text-[#c34c2e]" onClick={() => setMenuOpen(false)}>Events</NavLink>
                    <NavLink to="/blogs" className="hover:text-[#c34c2e]" onClick={() => setMenuOpen(false)}>Blogs</NavLink>
                    <NavLink to="/about_us" className="hover:text-[#c34c2e]" onClick={() => setMenuOpen(false)}>About us</NavLink>
                    <NavLink to="/contact_us" className="hover:text-[#c34c2e]" onClick={() => setMenuOpen(false)}>Contact us</NavLink>
                </nav>

                <div className="flex items-center gap-4 text-2xl">
                    <FaSearch className="cursor-pointer hover:text-[#c34c2e]" onClick={() => setSearchOpen(!searchOpen)} />
                    <FaShoppingCart className="cursor-pointer hover:text-[#c34c2e]" onClick={() => setCartOpen(!cartOpen)} />
                    {isLoggedIn ? (
                        <NavLink to="/account" className=" p-[4px] border-2 rounded-full"><FaUser className="cursor-pointer hover:text-[#c34c2e]" /></NavLink>
                    ) : (
                        <NavLink to="/sign_in" className="text-lg text-gray-600 border-1 px-2 py-1 rounded-lg hover:text-[#c34c2e]">Sign In</NavLink>
                    )}
                </div>
            </header>

            {/* Search Form */}
            {searchOpen && (
                <SearchBar />
            )}

            {/* Shopping Cart */}
            <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
        </div>
    );
};

export default Navbar;
