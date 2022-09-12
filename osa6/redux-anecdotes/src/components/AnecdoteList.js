import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnecdotes, voteFor } from "../reducers/anecdoteReducer";
import { clearNotif, setNotif } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((list) => dispatch(setAnecdotes(list)));
  }, [dispatch]);
  const beforeSorting = useSelector((state) => {
    return state.filter === ""
      ? state.anecdotes
      : state.anecdotes.filter((item) => item.content.includes(state.filter));
  });
  const anecdotes = beforeSorting.sort((a, b) => {
    return b.votes - a.votes;
  });

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
