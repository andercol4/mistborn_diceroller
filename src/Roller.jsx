import { useState } from 'react'

function rollDice() {
  return(Math.floor(Math.random() * 6) + 1)
}

function Roller() {
  const [diceCount, setDiceCount] = useState(2)
  const [diceRoll, setDiceRoll] = useState({})
  const [nudges, setNudges] = useState(0)

  const handleChange = (e) => {
    setDiceCount(parseInt(e.target.value))
  }

  const handleClick = () => {
    const diceToRoll = [10, diceCount].sort(function(a, b) {
      return a - b;
    })[0]
    const newRoll = [...Array(diceToRoll)].map((_, i) => {
      return rollDice();
    }).reduce(function(obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});
    const nudgeCount = diceCount > 10 ? (diceCount - 10) + newRoll[6]  : (newRoll[6] || 0)
    setNudges(nudgeCount)
    setDiceRoll(newRoll)
  }

  const calculateResult = () => {
    let highestResult = 0
    Object.keys(diceRoll).sort().reverse().forEach((key, index) => {
      if( key !== '6' && diceRoll[key] >= 2 && highestResult === 0) {
        highestResult = key
      }
    })
    return highestResult
  }

  const displayResults = () => {
    return(
      <h2>
        Result is {calculateResult() + " "}
        with {nudges} Nudges
      </h2>
    )
  }

  const displayRoll = () => {
    return(
      <div>
        <p>
          Dice Roll:
        </p>
        {
          Object.keys(diceRoll).sort().reverse().map(function(key, index) {
            return(<p> {key}: {diceRoll[key]}x </p>)
          })
        }
      </div>
    )
  }

  return (
    <>
      <input value={diceCount} onChange={handleChange} type="number" min="2" />
      <button onClick={handleClick}>Roll</button>
      {displayResults()}
      {displayRoll()}
    </>
  )
}

export default Roller;
