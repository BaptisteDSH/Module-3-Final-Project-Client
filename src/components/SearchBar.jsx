import React from "react";

const SearchBar = ({
  value = "",
  onChange = () => {},
  onSubmit = () => {},
}) => {
  return (
    <div className="search-bar-wrapper">
      <h4 className="search-bar-title">Find your new friend or local event</h4>
      <div
        style={{
          display: "flex",
          gap: 8,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <input
          className="search-bar"
          type="text"
          placeholder="Search by city, pet or event..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
