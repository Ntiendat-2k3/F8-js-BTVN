import React, { useCallback } from "react";
import { debounce } from "lodash";

function SearchBox({ onSearch }) {
     const debouncedSearch = useCallback(
          debounce((searchValue) => {
               onSearch(searchValue);
          }, 500),
          []
     );

     const handleSearchChange = (e) => {
          debouncedSearch(e.target.value);
     };

     return (
          <div className="search-box">
               <input type="text" placeholder="Search task..." onChange={handleSearchChange} />
          </div>
     );
}

export default SearchBox;
