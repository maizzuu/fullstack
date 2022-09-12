const anecdotesAtStart = [];
const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

export const voteFor = (id) => {
  return {
    type: "VOTE",
    data: { id: id },
  };
};

export const createNew = (data) => {
  return {
    type: "CREATE",
    data: data,
  };
};

export const setAnecdotes = (anecdoteList) => {
  return { type: "SET", data: anecdoteList };
};

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const anecdoteToUpdate = state.find((a) => a.id === action.data.id);
      const updated = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };
      return state.map((a) => (a.id !== action.data.id ? a : updated));
    case "CREATE":
      const newObj = asObject(action.data.content);
      return state.concat(newObj);
    case "SET":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
