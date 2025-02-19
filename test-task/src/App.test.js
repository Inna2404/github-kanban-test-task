import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IssueListCard from "./сomponents/IssueListCard.tsx";

test("renders learn react link", () => {
  render(<App />);
});

const issuesMock = {
  todo: [
    { id: 1, title: "Test Issues", number: 123, comments: 5, create_at: "3" }
  ],
  inProgress: [],
  done: []
};
describe("List", () => {
  test("display a list of cards", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <IssueListCard
          title="ToDo"
          status="todo"
          issues={issuesMock.todo}
          setIssues={jest.fn()}
        />
      </DndProvider>
    );
    expect(screen.getByText("Test Issues")).toBeInTheDocument();
  });

  test("move an image from one list to another", () => {
    const setIssuesMock = jest.fn();

    render(
      <DndProvider backend={HTML5Backend}>
        <IssueListCard
          title="ToDo"
          status="todo"
          issues={issuesMock.todo}
          setIssues={setIssuesMock}
        />
        <IssueListCard
          title="In Progress"
          status="inProgress"
          issues={issuesMock.inProgress}
          setIssues={setIssuesMock}
        />
        <IssueListCard
          title="Done"
          status="done"
          issues={issuesMock.done}
          setIssues={setIssuesMock}
        />
      </DndProvider>
    );

    expect(screen.getByText("Test Issue")).toBeInTheDocument();

    const todoList = screen.getByText("ToDo");
    const inProgress = screen.getByText("In Progress");

    fireEvent.dragStart(todoList);
    fireEvent.drop(inProgress);

    expect(setIssuesMock).toHaveBeenCalledTimes(1);
    expect(setIssuesMock).toHaveBeenCalledWith(
      expect.objectContaining({
        todo: [],
        inProgress: [
          {
            id: "1",
            title: "Test Issue",
            number: 123,
            comments: 5,
            created_at: "3"
          }
        ],
        done: []
      })
    );
  });
});
