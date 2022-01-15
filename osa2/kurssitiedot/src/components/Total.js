import React from 'react';

const Total = ({parts}) => {
  const exercises = []
  parts.forEach(item => exercises.push(item.exercises))
  const sum = exercises.reduce( (p,c) => p+c)
  return(
    <div>
      <b>total of {sum} exercises</b>
    </div>
  )
}

export default Total;