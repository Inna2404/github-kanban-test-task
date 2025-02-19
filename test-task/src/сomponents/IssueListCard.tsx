import React, { useRef, useEffect } from "react";
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
  setIssues: React.Dispatch<React.SetStateAction<Record<string, Issue[]>>>;
}

const IssueListCard: React.FC<IssueListCardProps> = ({
  issues,
  title,
  status,
  setIssues
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const moveIssue = (issueId: string, newStatus: string) => {
    setIssues((prevIssues) => {
      let issueToMove: Issue | null = null;

      const updatedIssues = Object.keys(prevIssues).reduce(
        (acc, key) => {
          acc[key] = prevIssues[key].filter((issue) => {
            if (issue.id === issueId) {
              issueToMove = issue;
              return false;
            }
            return true;
          });
          return acc;
        },
        {} as Record<string, Issue[]>
      );

      if (issueToMove) {
        const updatedIssue: Issue = {
          ...(issueToMove as Issue),
          status: newStatus
        };

        if (!updatedIssues[newStatus]) {
          updatedIssues[newStatus] = [];
        }

        updatedIssues[newStatus].push(updatedIssue);
      }

      return updatedIssues;
    });
  };

  const [{ isOver }, drop] = useDrop({
    accept: "ISSUES",
    drop: (item: { id: string }) => moveIssue(item.id, status),
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
          <p>No issues</p>
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        )}
      </div>
    </div>
  );
};

export default IssueListCard;
