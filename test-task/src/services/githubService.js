import repoInfoGet from "../utils/getRepoInfo";
const getData = async (repoUrl, setOwner, setRepo, setIssues, setStars) => {
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
    console.log(data);

    setIssues({ todo: data, inProgress: [], done: [] });

    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    if (!repoResponse.ok) {
      throw new Error("GitHub API error (repo)");
    }
    const repoData = await repoResponse.json();
    console.log(repoData);
    setStars(repoData.stargazers_count);
  } catch (err) {
    console.log("Error issues:", err);
  }
};

export default getData;
