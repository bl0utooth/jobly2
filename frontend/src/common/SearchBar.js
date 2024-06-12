import React from "react";
import './SearchBar.css'

function SearchBar({ searchFor }) {
    console.debug('SearchBar', 'searchFor=', typeof searchFor)

    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined)
        setSearchTerm(searchTerm.trim())
    }

    function handleChange(evt) {
        setSearchTerm(evt.target.value)
    }

    return (
        <div>
            <form className="search-form" onSubmit={handleSubmit}>
                <input name="searchTerm" placeholder="Look For Jobs Here" value={searchTerm} onChange={handleChange} />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchBar