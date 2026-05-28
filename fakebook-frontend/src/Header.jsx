import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useLocation } from 'react-router-dom';

const links = [
  { name: "Home", path: "#" },
  { name: "Posts", path: "#" },
  { name: "Profile", path: "#" },
]

function Header() {

  const location = useLocation();

  const hideNavbarContent = 
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark px-3">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" href="#">
          Fakebook
        </Link>

        {!hideNavbarContent && (
          <>
        
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">

              {/* Search bar */}
              <form className="d-flex flex-grow-1 justify-content-center my-2 my-md-0">
                <input
                  className="form-control me-2"
                  style={{ maxWidth: "400px" }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />

                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>

              {/* Navbar Links */}
              <ul className="navbar-nav ms-md-auto">

                {links.map((link) => (
                  <li className="nav-item">
                    <Link className="nav-link" href={link.path}>
                        {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;