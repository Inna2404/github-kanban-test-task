import "../src/styles/App.css";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import getData from "./services/githubService";
import Header from "./сomponents/Header.jsx";
import RepositoryInfo from "./сomponents/RepositoryInfo.jsx";
import Cards from "./сomponents/Cards.jsx";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem("issues");
    return saved
      ? JSON.parse(saved)
      : {
          todo: [],
          inProgress: [],
          done: []
        };
  });

  useEffect(() => {
    if (issues) {
      localStorage.setItem("issues", JSON.stringify(issues));
    }
  }, [issues]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Header
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          getData={() => getData(repoUrl, setOwner, setRepo, setIssues)}
        />
        <RepositoryInfo owner={owner} repo={repo} />
        <Cards issues={issues} setIssues={setIssues} />
      </div>
    </DndProvider>
  );
}

export default App;
