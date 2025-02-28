import React from "react";

interface HeaderProps {
  repoUrl: string;
  setRepoUrl: React.Dispatch<React.SetStateAction<string>>;
  getData: () => void;
}

const Header: React.FC<HeaderProps> = ({ repoUrl, setRepoUrl, getData }) => {
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
