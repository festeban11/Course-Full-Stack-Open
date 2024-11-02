import { useState } from 'react'

const Header = (props) => {
  return (
  <div>
    <h1>{props.title}</h1>
  </div>)
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


const StatisticLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
    )
   
  };

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  let average = 0
  let positive = 0
  if (total > 0){
    average = (good - bad) / total
    positive = (good / total) * 100
  } else {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )

 
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }



  return (
    <div>
      <Header title={"give me feedback"}/> 
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header title={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App