import React, { useState, useContext } from "react";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext"
import Alert from "../common/Alert"

function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([])

    const [saveConfirmed, setSaveConfirmed] = useState(false)

    console.debug(
        "ProfileForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();

        let ProfileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, ProfileData);
        } catch (errors) {
            debugger;
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({ ...f, password: ""}))
        setFormErrors([])
        setSaveConfirmed(true)
        setCurrentUser(updatedUser)
    }

    function handleChange(evt) {
        const { name, value } = evt.target
        setFormData(f => ({
            ...f, [name]: value,
        }))
        setFormErrors([])
    }

    return (
        <div className="profileform-main">
            <h2>Profile</h2>
            <div className="profilecard-card">
                <form>
                    <div className="profileform-username">
                        <label>Username</label>
                        <p>{formData.username}</p>
                    </div>
                    <div className="profileform-firstname">
                        <label>First Name</label>
                        <input name="firstName" className="profileform-entries" value={formData.firstName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input name="lastName" className="profileform-entries" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input name="email" className="profileform-entries" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Confirm password to make changes:</label>
                        <input name="password" type="password" className="profileform-entries" value={formData.password} onChange={handleChange} />
                    </div>

                    {formErrors.length
                        ? <Alert type="danger" messages={formErrors} />
                        : null}
                    
                    {saveConfirmed
                        ? <Alert type="success" messages={["Password Changed Successfully"]} />
                        : null}
                    
                    <button
                        className="password-submit-btn"
                        onClick={handleSubmit}
                    >
                        Save Changes to Profile
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProfileForm