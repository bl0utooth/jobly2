import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom"

function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug("Navigation", "currentUser=", currentUser)

    function logInNavbar() {
        return (
            <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/companies">
                Companies
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/jobs">
                Jobs
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={logout}>
                Log out {currentUser.first_name || currentUser.username}
              </Link>
            </li>
          </ul>
        )
    }

    function logOutNavbar () {
        return (
            <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </li>
          </ul>
        )
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
          Jobly
        </Link>
        {currentUser ? logInNavbar() : logOutNavbar()}
      </nav>
    )
}

export default Navigation;