import React from "react";
import { useSelector } from "react-redux";
import IssueListCard from "./IssueListCard.tsx";
import { RootState } from "../store/store.ts";

const statuses: Array<"todo" | "inProgress" | "done"> = [
  "todo",
  "inProgress",
  "done"
];

const Cards = () => {
  const issues = useSelector((state: RootState) => state.issues.issues);
  console.log("Isues from Redux:", issues);

  return (
    <div className="list_container">
      {statuses.map((status) => {
        console.log("Isues for status", status, issues[status]);
        return (
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
          />
        );
      })}
    </div>
  );
};
export default Cards;
