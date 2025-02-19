import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IssueListCard from "./сomponents/IssueListCard.tsx";

test("renders learn react link", () => {
  render(<App />);
});

test("display a list of cards", () => {
  render(
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  );
  expect(screen.getByRole("heading", { name: /To Do/i })).toBeInTheDocument();
});

const issuesMock = {
  todo: [
    { id: 1, title: "Test Issues 1", number: 123, created_at: "3", comments: 5 }
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
    expect(
      screen.getByRole("heading", { name: /Test Issues/i })
    ).toBeInTheDocument();
  });

  test("move an image from one list to another", async () => {
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

    const issueCard = screen.getByText("Test Issues 1");
    const inProgressList = screen.getByText("In Progress");

    expect(issueCard).toBeInTheDocument();

    fireEvent.dragStart(issueCard);
    await waitFor(() => fireEvent.dragOver(inProgressList));
    fireEvent.drop(inProgressList);

    await waitFor(() => {
      expect(setIssuesMock).toHaveBeenCalledTimes(1);

      expect(setIssuesMock).toHaveBeenCalledWith(expect.any(Function));
    });
    expect(setIssuesMock.mock.calls[0][0](issuesMock)).toEqual({
      todo: [],
      inProgress: [
        {
          id: 1,
          title: "Test Issues 1",
          number: 123,
          created_at: "3",
          comments: 5,
          status: "inProgress"
        }
      ],
      done: []
    });
  });
});
