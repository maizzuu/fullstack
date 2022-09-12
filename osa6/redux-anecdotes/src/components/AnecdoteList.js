import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { clearNotif, setNotif } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const beforeSorting = useSelector((state) => state.anecdotes);
  const anecdotes = beforeSorting.sort((a, b) => {
    return b.votes - a.votes;
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteFor(id));
    dispatch(setNotif(`you voted for "${content}"`));
    setTimeout(() => dispatch(clearNotif()), 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
