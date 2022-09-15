import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const toBeChanged = state.find((a) => a.id === id);
      const changed = {
        ...toBeChanged,
        votes: toBeChanged.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changed));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { vote, setAnecdotes, addAnecdote } = anecdoteSlice.actions;

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.vote(anecdote);
    dispatch(vote(updated.id));
  };
};
export default anecdoteSlice.reducer;
