import React, { useState, useEffect } from "react";
import SearchBar from "../common/SearchBar";
import JoblyApi from "../api/api"
import CompanyCard from "./CompanyCard"
import LoadingSpinner from "../common/LoadingSpinner"

function CompanyList() {
    console.debug("CompanyList");

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompanies() {
        console.debug("CompanyList useEffect getCompanies")
        search();
    }, [])

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies)
    }

    if (!companies) return <LoadingSpinner />

    return (
        <div className="company-list">
            <SearchBar searchFor={search} />
            {companies.length
                ? (
                    <div className="companyList">
                        {companies.map(c => (
                            <CompanyCard key={c.handle} handle={c.handle} name={c.name} description={c.description} logoUrl={c.logoUrl} />
                        ))}
                    </div>
                ) : (
                    <p className="search-results">No results found.</p>
                )}
        </div>
    )
}

export default CompanyList