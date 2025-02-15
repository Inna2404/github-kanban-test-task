import repoInfoGet from "../utils/getRepoInfo";
const getData = async (repoUrl, setOwner, setRepo, setIssues) => {
  const repoInfo = repoInfoGet(repoUrl);
  if (!repoInfo) {
    return;
  }
  const { owner, repo } = repoInfo;
  setOwner(owner);
  setRepo(repo);
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`
    );
    if (!response.ok) {
      throw new Error("GitHub API error");
    }
    const data = await response.json();

    setIssues({ todo: data, inProgress: [], done: [] });
  } catch (err) {
    console.log("Error issues:", err);
  }
};

export default getData;
