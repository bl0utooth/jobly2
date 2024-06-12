import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api"
import LoadingSpinner from "../common/LoadingSpinner"
import SearchBar from "../common/SearchBar"
import JobCardList from "../JobCardList/"

function JobList() {
    console.debug('JobList')

    const [jobs, setJobs] = useState(null)

    useEffect(function getAllJobs() {
        console.debug("JobList useEffect getAllJobs")
        SearchBar()
    }, [])

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs)
    }

    if (!jobs) return <LoadingSpinner />

    return (
        <div className="joblist-card">
            <Search searchFor={search} />
            {jobs.length
                ? <JobCardList jobs={jobs} />
                : <p className="joblist-results">No Results found</p>
            }
        </div>
    )
}

export default JobList