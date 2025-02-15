import React from "react";
import IssueListCard from "./IssueListCard";

const val = ["todo", "inProgress", "done"];
const Cards = ({ issues, setIssues }) => {
  return (
    <div className="list_container">
      {val.map((status) => (
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
          issues={issues[status]}
          setIssues={setIssues}
        />
      ))}
    </div>
  );
};
export default Cards;
