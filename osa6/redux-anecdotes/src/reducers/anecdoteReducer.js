const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

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

export const createNew = (content) => {
  return {
    type: "CREATE",
    data: { content: content },
  };
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
    default:
      return state;
  }
};

export default anecdoteReducer;