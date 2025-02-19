import "../src/styles/App.css";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import getData from "./services/githubService";
import Header from "./сomponents/Header.tsx";
import RepositoryInfo from "./сomponents/RepositoryInfo.tsx";
import Cards from "./сomponents/Cards.tsx";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const [stars, setStars] = useState(null);

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
          getData={() =>
            getData(repoUrl, setOwner, setRepo, setIssues, setStars)
          }
        />
        <RepositoryInfo owner={owner} repo={repo} stars={stars} />
        <Cards issues={issues} setIssues={setIssues} />
      </div>
    </DndProvider>
  );
}

export default App;
