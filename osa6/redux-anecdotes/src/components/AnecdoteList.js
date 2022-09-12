import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const beforeSorting = useSelector((state) => state.anecdotes);
  const anecdotes = beforeSorting.sort((a, b) => {
    return b.votes - a.votes;
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteFor(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
