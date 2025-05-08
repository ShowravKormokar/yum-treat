import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div className="text-center mt-10 text-red-500">
            <h2>403 - Unauthorized</h2>
            <p>You don’t have access to this page.</p>
            <Link to={"/sign_in"}>Sign In</Link>
        </div>
    );
};

export default Unauthorized;
