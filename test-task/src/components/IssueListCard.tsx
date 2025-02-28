import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { moveIssues } from "../store/IssuesSlice.ts";
import { useDrop } from "react-dnd";
import IssueCard from "./IssueCard.tsx";

interface Issue {
  id: string;
  title: string;
  status: string;
  number: number;
  created_at: string;
  comments: number;
}

interface IssueListCardProps {
  issues: Issue[];
  title: string;
  status: string;
}

const IssueListCard: React.FC<IssueListCardProps> = ({
  issues,
  title,
  status
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: "ISSUES",
    drop: (item: { id: string }) => {
      dispatch(moveIssues({ issueId: item.id, newStatus: status }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  return (
    <div ref={ref} className={`list_wrap ${isOver ? "hovered" : ""}`}>
      <h2>{title}</h2>
      <div className={`list_issues_cards ${issues.length > 0 ? "filled" : ""}`}>
        {issues.length === 0 ? (
          <p className="no_issues">No issues</p>
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        )}
      </div>
    </div>
  );
};

export default IssueListCard;
