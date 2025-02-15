import React from "react";
import { useDrag } from "react-dnd";
import { timeAgo } from "./time";

const IssueCard = ({ issue }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ISSUES",
    item: { id: issue.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });
  return (
    <div ref={drag} className={`issue_card ${isDragging ? "dragging" : ""}`}>
      <h3>{issue.title}</h3>
      <p>
        #{issue.number} opened {timeAgo(issue.created_at)}
      </p>
      <p>Admim | Comments: {issue.comments}</p>
    </div>
  );
};
export default IssueCard;
