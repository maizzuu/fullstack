import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const beforeSorting = useSelector((state) => {
    return state.filter === ""
      ? state.anecdotes
      : state.anecdotes.filter((item) => item.content.includes(state.filter));
  });

  const anecdotes = [...beforeSorting].sort((a, b) => {
    return b.votes - a.votes;
  });

  const vote = (obj) => {
    const voted = { ...obj, votes: obj.votes + 1 };
    dispatch(voteFor(voted));
    dispatch(setNotification(`you voted for "${obj.content}"`, 5000));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
