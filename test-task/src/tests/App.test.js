import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import IssueListCard from "../components/IssueListCard";

const mockStore = configureMockStore();
const initialState = {
  issues: {
    list: [
      {
        id: "1",
        title: "Fix bug",
        status: "todo",
        number: 101,
        created_at: "2",
        comments: 2
      }
    ]
  }
};

test("displays the correct title and list of tasks", () => {
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <IssueListCard
          title="To Do"
          status="todo"
          issues={initialState.issues.list}
        />
      </DndProvider>
    </Provider>
  );

  expect(screen.getByText("To Do")).toBeInTheDocument();
  expect(screen.getByText("Fix bug")).toBeInTheDocument();
});

test("displays the message 'No issues' if the list is empty", () => {
  const emptyState = { issues: { list: [] } };
  const store = mockStore(emptyState);

  render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <IssueListCard title="To Do" status="todo" issues={[]} />
      </DndProvider>
    </Provider>
  );

  expect(screen.getByText("No issues")).toBeInTheDocument();
});

test("checking the action call when moving the task", async () => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <IssueListCard
          title="To Do"
          status="todo"
          issues={initialState.issues.list}
        />
        <IssueListCard title="In Progress" status="inProgress" issues={[]} />
      </DndProvider>
    </Provider>
  );

  const issueCard = screen.getByText("Fix bug");
  const inProgressList = screen.getByText("In Progress");

  expect(issueCard).toBeInTheDocument();
  expect(inProgressList).toBeInTheDocument();

  fireEvent.dragStart(issueCard);

  await waitFor(() => fireEvent.dragOver(inProgressList));

  fireEvent.drop(inProgressList);
  await waitFor(() => {
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "issues/moveIssues",
      payload: {
        issueId: "1",
        newStatus: "inProgress"
      }
    });
  });

  expect(screen.getByText("Fix bug")).toBeInTheDocument();
});
