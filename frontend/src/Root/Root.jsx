import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../Pages/Home/Home";

const Root = () => {
    return (
        <div>
            <Navbar />
            {/* <Home/> */}
            <Outlet />

            <Footer />
        </div>
    );
};

export default Root;