import { NavLink } from "react-router";
import Button from "../../../components/Button.tsx";
import Authorized from "../../security/component/Authorized.tsx";
import { useContext, useState } from "react";
import AuthenticationContext from "../../security/utils/AuthenticationContext.ts";
import { logout } from "../../security/utils/HandleJWT.ts";

export default function Menu() {
  const { claims, update } = useContext(AuthenticationContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  function getUserName() {
    return claims.filter((x) => x.name === "name")[0]?.value;
  }

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand fw-bold">
          <i className="bi bi-film me-2"></i>React Movies
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            !isNavCollapsed ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/movies/filter"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-funnel me-1"></i>Filter Movies
              </NavLink>
            </li>
            <Authorized
              claims={["isadmin"]}
              authorized={
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/actors"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      <i className="bi bi-person-badge me-1"></i>Actors
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/genres"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      <i className="bi bi-tags me-1"></i>Genres
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/theaters"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      <i className="bi bi-building me-1"></i>Theaters
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/movies/create"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      <i className="bi bi-plus-circle me-1"></i>Create Movie
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/users"
                      className="nav-link"
                      onClick={handleNavLinkClick}
                    >
                      <i className="bi bi-people me-1"></i>Users
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
            <Authorized
              authorized={
                <>
                  <div className="d-flex align-items-center mb-2 mb-lg-0">
                    <i className="bi bi-person-circle me-2"></i>
                    <span className="nav-link mb-0">
                      Hello, {getUserName()}
                    </span>
                  </div>
                  <Button
                    className="btn btn-outline-danger ms-lg-2"
                    onClick={() => {
                      logout();
                      update([]);
                      handleNavLinkClick();
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>Logout
                  </Button>
                </>
              }
              notAuthorized={
                <>
                  <NavLink
                    to="/register"
                    className="btn btn-outline-primary me-2 mb-2 mb-lg-0"
                    onClick={handleNavLinkClick}
                  >
                    <i className="bi bi-person-plus me-1"></i>Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="btn btn-primary"
                    onClick={handleNavLinkClick}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                  </NavLink>
                </>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
