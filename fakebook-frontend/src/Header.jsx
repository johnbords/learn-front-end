import 'bootstrap/dist/css/bootstrap.min.css'

const links = [
  { name: "Home", path: "#" },
  { name: "Posts", path: "#" },
  { name: "Profile", path: "#" },
]

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark px-3">

        {/* Logo */}
        <a className="navbar-brand fw-bold" href="#">
          Fakebook
        </a>

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
              <a className="nav-link" href={link.path}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

        </div>
      </nav>
    </header>
  );
}

export default Header;