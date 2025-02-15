import React from "react";
const RepositoryInfo = ({ owner, repo }) => {
  if (!owner || !repo) return null;
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
    </div>
  );
};
export default RepositoryInfo;
