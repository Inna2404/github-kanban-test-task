import React from "react";
import { useDrop } from "react-dnd";
import IssueCard from "./IssueCard";

const IssueListCard = ({ issues, title, status, setIssues }) => {
  const moveIssue = (issueId, newStatus) => {
    setIssues((prevIssues) => {
      let issueToMove = null;

      const updatedIssue = Object.keys(prevIssues).reduce((acc, key) => {
        acc[key] = prevIssues[key].filter((issue) => {
          if (issue.id === issueId) {
            issueToMove = issue;
            return false;
          }
          return true;
        });
        return acc;
      }, {});

      if (issueToMove) {
        issueToMove.status = newStatus;
        updatedIssue[newStatus].push(issueToMove);
      }
      return updatedIssue;
    });
  };

  const [{ isOver }, drop] = useDrop({
    accept: "ISSUES",
    drop: (item) => moveIssue(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });
  return (
    <div ref={drop} className={`list_wrap ${isOver ? "hovered" : ""}`}>
      <h2>{title}</h2>
      <div className={`list_issues_cards ${issues.length > 0 ? "filled" : 0}`}>
        {issues.length === 0 ? (
          <p>No issues</p>
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        )}
      </div>
    </div>
  );
};
export default IssueListCard;
