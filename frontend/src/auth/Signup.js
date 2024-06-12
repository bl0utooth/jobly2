import React, { useState } from "react";
import { useHistory } from "react-router-dom" 
import Alert from "../common/Alert";

function Signup({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "Signup",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData)
        if (result.success) {
            history.push('/companies');
        } else {
            setFormErrors(result.errors)
        }
    }

    function handleChange(evt) {
        const {name, value} = evt.change;
        setFormData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-entries">
                        <label>username</label>
                        <input name="username" className="required-entry" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="signup-form">  
                        <label>Password</label>
                        <input name="password" className="required-entries" value={formData.password} onClick={handleChange} />
                    </div>
                    <div className="signup-form">
                        <label>First Name</label>
                        <input name="firstName" className="required-entries" value={formData.firstName} onClick={handleChange} />
                    </div>
                    <div className="singup-form">
                        <label>Last Name</label>
                        <input name="lastName" className="requried-entries" value={formData.lastName} onChange={handleSubmit} />
                    </div>
                    <div className="signup-form">
                        <label>Email</label>
                        <input name="email" className="requried-entries" value={formData.email} onChange={handleChange} />
                    </div>
                    {formErrors.length
                        ? <Alert type="danger" messages={fromErrors} />
                        : null
                    }
                    <button type="submit" className="signup-submit" onSubmit={handleChange}> 
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup