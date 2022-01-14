import React, { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

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
      <table>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={(props.good*1+props.bad*-1)/props.all} />
          <StatisticLine text="positive" value={(props.good/props.all)*100 + " %"} />
      </table>
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
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}></Statistics>
    </div>
  )
}

export default App