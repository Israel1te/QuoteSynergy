import { Link } from "react-router-dom/cjs/react-router-dom";
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>QuoteSynergy</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" style={{
                    // color: "white",
                    // backgroundColor: "#f1356d",
                    // borderRadius: "8px"
                }}>Login</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;