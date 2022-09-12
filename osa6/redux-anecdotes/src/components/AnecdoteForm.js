import React from "react";
import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { clearNotif, setNotif } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createNew(content));
    dispatch(setNotif(`you created "${content}"`));
    setTimeout(() => dispatch(clearNotif()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
