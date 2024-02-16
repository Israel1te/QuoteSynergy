import { Link } from "react-router-dom/cjs/react-router-dom";
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>QuoteSynergy</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">Login</Link>
                <Link to="/openai">Generate</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;