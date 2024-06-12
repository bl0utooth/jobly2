import React, { useContext } from "react";
import { Link } from "react-router-dom"
import UserContext from "../auth/UserContext";

function Homepage() {
    const { currentUser } = useContext(UserContext)
    console.debug("Homepage", "currentUser=", currentUser)

    return (
        <div className="homepage-card">
            <h1 className="homepage-title">Jobly,</h1>
            <p className="homepage-subtitle">Helping you find a job.</p>
            {currentUser
                ? <h2>
                    Hello, {currentUser.firstName || currentUser.username}
                </h2>
                : (
                    <p>
                        <Link className="homepage-login-link" to="/login">
                        Login </Link>
                        <Link className="homepage-singup-link" to="/signup">
                        New Here? Sign up Here.</Link>
                    </p>
                )}
        </div>
    )
}

export default Homepage