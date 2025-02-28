import repoInfoGet from "../utils/getRepoInfo";
import {
  setIssues,
  setStars,
  setOwner,
  setRepo
} from "../store/IssuesSlice.ts";

const getData = async (repoUrl, dispatch) => {
  const repoInfo = repoInfoGet(repoUrl);

  if (!repoInfo) {
    return;
  }

  const { owner, repo } = repoInfo;

  try {
    dispatch(setOwner(owner));
    dispatch(setRepo(repo));

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`
    );

    if (!response.ok) {
      throw new Error("GitHub API error");
    }

    const data = await response.json();
    console.log(data);

    dispatch(setIssues({ todo: data, inProgress: [], done: [] }));

    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    if (!repoResponse.ok) {
      throw new Error("GitHub API error (repo)");
    }

    const repoData = await repoResponse.json();
    console.log(repoData);

    dispatch(setStars(repoData.stargazers_count));
  } catch (err) {
    console.log("Error issues:", err);
  }
};

export default getData;
