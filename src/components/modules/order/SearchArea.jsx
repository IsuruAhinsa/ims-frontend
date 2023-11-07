import React from 'react';

const SearchArea = ({placeholder, onClick, onChange, value}) => {

    return (
        <div className="input-group mb-3">
            <input
                type="search"
                name="search"
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                aria-describedby="basic-addon2"
            />
            <span
                className="input-group-text rounded-0 border-left-0"
                id="basic-addon2"
                onClick={onClick}
            >
                    <i className="fas fa-search" />
                  </span>
        </div>
    );
};

export default SearchArea;
