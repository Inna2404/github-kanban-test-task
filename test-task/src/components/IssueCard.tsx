import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { timeAgo } from "./time";

interface Issue {
  id: string;
  title: string;
  number: number;
  created_at: string;
  comments: number;
}

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "ISSUES",
    item: { id: issue.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div ref={ref} className={`issue_card ${isDragging ? "dragging" : ""}`}>
      <h3>{issue.title}</h3>
      <p>
        #{issue.number} opened {timeAgo(issue.created_at)}
      </p>
      <p>Admim | Comments: {issue.comments}</p>
    </div>
  );
};
export default IssueCard;
