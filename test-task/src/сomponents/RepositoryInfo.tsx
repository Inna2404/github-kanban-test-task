import React from "react";

interface InfoProps {
  owner: string;
  repo: string;
  stars?: number | null;
}
const RepositoryInfo = ({ owner, repo, stars }) => {
  if (!owner || !repo) return null;

  function formatStars(count: number): string {
    return count >= 100
      ? (count / 1000).toFixed(1) + " K stars"
      : count + "stars";
  }
  return (
    <div className="discrabe_repo">
      {owner && repo ? (
        <>
          {owner.charAt(0).toUpperCase() + owner.slice(1)} &gt;{" "}
          {repo.charAt(0).toUpperCase() + repo.slice(1)}
        </>
      ) : (
        ""
      )}
      {stars !== null && (
        <span style={{ width: 20, height: 20 }}> ⭐{formatStars(stars)}</span>
      )}
    </div>
  );
};
export default RepositoryInfo;
