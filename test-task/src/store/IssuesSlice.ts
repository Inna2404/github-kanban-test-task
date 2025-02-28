import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Issue {
  id: string;
  title: string;
  status: string;
  number: number;
  created_at: string;
  comments: number;
}

interface IssuesState {
  issues: Record<string, Issue[]>;
  stars: number;
  repo: string;
  owner: string;
}

const initialState: IssuesState = {
  issues: {
    todo: [],
    inProgress: [],
    done: []
  },
  stars: 0,
  repo: "",
  owner: ""
};

const IssuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Record<string, Issue[]>>) => {
      console.log("Setting issues in Redux:", action.payload);
      state.issues = action.payload;
    },
    setStars: (state, action) => {
      state.stars = action.payload;
    },
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
    setRepo: (state, action) => {
      state.repo = action.payload;
    },
    moveIssues: (
      state,
      action: PayloadAction<{ issueId: string; newStatus: string }>
    ) => {
      const { issueId, newStatus } = action.payload;
      let issueToMove: Issue | null = null;

      Object.keys(state.issues).forEach((status) => {
        state.issues[status] = state.issues[status].filter((issue) => {
          if (issue.id === issueId) {
            issueToMove = issue;
            return false;
          }
          return true;
        });
      });

      if (issueToMove) {
        state.issues[newStatus].push(issueToMove);
      }
    }
  }
});

export const { setIssues, setStars, setOwner, setRepo, moveIssues } =
  IssuesSlice.actions;
export default IssuesSlice.reducer;
