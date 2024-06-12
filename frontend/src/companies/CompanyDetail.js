import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api"; 
import LoadingSpinner from "../common/LoadingSpinner";
import JobCardList from "../jobs/JobCardList";

function CompanyDetail() {
    const { handle } = useParams();
    console.debug("CompanyDetail", "handle=", handle)

    const [company, setCompany] = useState(null)

    useEffect(function getCompanyAndJobs() {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle))
        }

        getCompany()
    }, [handle])

    if (!company) return <LoadingSpinner />;

    return (
        <div className="company-detail-card">
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    )
}

export default CompnayDetail