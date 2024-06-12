import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "../login.css"

function Login({ login }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([])

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors", formErrors,
    )

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            history.push("/companies")
        } else {
            setFormErrors(result.errors)
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(1 => ({ ...1, [name]: value }))
    }

    return (
        <div className="login-form">
            <h1>Login</h1>
            <div className="login-card">
                <div className="required-entries">
                    <form onSubmit={handleChange}>
                        <div className="form-entries">
                            <label>Username</label>
                            <input name="username" className="login-username" value={formData.username} onChange={handleChange} required /> 
                        </div>
                        <div className="form-entries">
                            <label>Password</label>
                            <input type="password" name="password" className="login-password" value={formData.password} onChange={handleChange} required />
                        </div>
                        {formErrors.length
                            ? <Alert type="danger" messages={formErrors} />
                            : null
                        }
                        <button className="login-submitbtn" onSubmit={handleSubmit}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login