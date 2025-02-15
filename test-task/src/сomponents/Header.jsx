import React from "react";

const Header = ({ repoUrl, setRepoUrl, getData }) => {
  return (
    <header className="serch_container">
      <input
        className="search_input"
        placeholder="Enter repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      ></input>
      <button onClick={getData}>Load issues</button>
    </header>
  );
};
export default Header;
