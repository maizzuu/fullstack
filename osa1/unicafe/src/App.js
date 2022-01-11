import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good">good</Button>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral">neutral</Button>
      <Button handleClick={() => setBad(bad+1)} text="bad">bad</Button>
      <h1>statistics</h1>
      <p>good {good}<br></br>neutral {neutral}<br></br>bad {bad}</p>
    </div>
  )
}

export default App