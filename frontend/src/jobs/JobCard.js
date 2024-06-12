import React, { useContext, useDebugValue, useState } from "react";
import UserContext from "../auth/UserContext"

function JobCard({ id, title, equity, companyName, salary }) {
    console.debug("JobCard")

    const { applyToJob, hasApplied } = useContext(UserContext);
    const [applied, setApplied] = useState();

    React.useEffect(function updateApplicationStatus() {
        console.debug("JobCard useEffect updateApplicationStatus", "id=", id)

        setApplied(hasApplied(id))
    }, [id, hasApplied]);

    async function handleApplication(evt) {
        if (hasApplied(id)) return
        applyToJob(id)
        setApplied(true)
    }

    return (
        <div className="job-card-main"> {applied}
            <h3 className="job-title">{title}</h3>
            <h5 className="company-name">{companyName}</h5>
            {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
            {equity !== undefined && <div><small>Equity: {equity}</small></div>}
            <button className="apply-btn" onClick={handleApplication} disabled={applied}>
                {applied ? "Applied" : "Apply"}
            </button>
        </div>
    )
}

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for(let i = salaryStr.length - 1; i >= 0; i--) {
        digitsRev.push(salaryStr[i])
        if (i > 0 && i % 3 === 0) digitsRev.push(",")
    }
    return digitsRev.reverse().join("")
}

export default JobCard