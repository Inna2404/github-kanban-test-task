import "../src/styles/App.css";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import getData from "./services/githubService";
import Header from "./components/Header.tsx";
import RepositoryInfo from "./components/RepositoryInfo.tsx";
import Cards from "./components/Cards.tsx";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [repoUrl, setRepoUrl] = useState("");
  const { owner, repo, stars } = useSelector((state) => state.issues);

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
          getData={() => getData(repoUrl, dispatch)}
        />
        <RepositoryInfo owner={owner} repo={repo} stars={stars} />
        <Cards issues={issues} setIssues={setIssues} />
      </div>
    </DndProvider>
  );
}

export default App;
