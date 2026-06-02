import { Link, useLocation } from 'react-router-dom';

const links = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
]

// MODIFY THIS LATER TO ACTUALLY SEARCH FOR POSTS/USERS
function handleSearch(e) {
  e.preventDefault(); // Prevent page refresh
  console.log("Search button clicked!");
}

function Header() {

  const location = useLocation();

  const hideNavbarContent = 
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark px-3">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="#">
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
              <form className="d-flex flex-grow-1 justify-content-center my-2 my-md-0" onSubmit={handleSearch}>
                <div 
                  className="input-group search-bar"
                  style={{ maxWidth: "450px", width: "100%" }}
                >
                  <button className="input-group-text" type="submit">
                    <i className="bi bi-search"></i>
                  </button>

                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search Fakebook"
                    aria-label="Search"                  
                  />
                </div>
              </form>

              {/* Navbar Links */}
              <ul className="navbar-nav ms-md-auto">

                {links.map((link) => (
                  <li className="nav-item">
                    <Link className="nav-link" to={link.path}>
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