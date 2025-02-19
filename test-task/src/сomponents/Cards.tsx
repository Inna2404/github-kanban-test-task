import React from "react";
import IssueListCard from "./IssueListCard.tsx";

interface Issues {
  id: string;
  title: string;
  status: string;
  number: number;
  created_at: string;
  comments: number;
}

interface CardProps {
  issues: Record<string, Issues[]>;
  setIssues: React.Dispatch<React.SetStateAction<Record<string, Issues[]>>>;
}
const statuses: Array<"todo" | "inProgress" | "done"> = [
  "todo",
  "inProgress",
  "done"
];
const Cards: React.FC<CardProps> = ({ issues, setIssues }) => {
  return (
    <div className="list_container">
      {statuses.map((status) => (
        <IssueListCard
          key={status}
          title={
            status === "todo"
              ? "To Do"
              : status === "inProgress"
                ? "In Progress"
                : "Done"
          }
          status={status}
          issues={issues[status] || []}
          setIssues={setIssues}
        />
      ))}
    </div>
  );
};
export default Cards;
