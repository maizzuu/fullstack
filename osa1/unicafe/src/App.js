import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <p>
          good {props.good}<br></br>
          neutral {props.neutral}<br></br>
          bad {props.bad}<br></br>
          all {props.all}<br></br>
          average {(props.good*1+props.bad*-1)/props.all}<br></br>
          positive {(props.good/props.all)*100} %
        </p>
      </div>
    )
  }
  
}

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
  const all = good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good">good</Button>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral">neutral</Button>
      <Button handleClick={() => setBad(bad+1)} text="bad">bad</Button>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}></Statistics>
    </div>
  )
}

export default App