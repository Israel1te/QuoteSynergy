import { Link } from "react-router-dom/cjs/react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div>
          <h1>QuoteSynergy</h1>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
            className="logo-icon"
          >
            <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z"></path>
          </svg>
        </div>
      </div>
      <div className="links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/openai" className="nav-link">
          Quote Generator
        </Link>
        <Link to="/image-gen" className="nav-link">
          Image Generator
        </Link>
        <Link to="/curated-gallery" className="nav-link">
          Resources
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;