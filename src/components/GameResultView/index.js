import './index.css'

const GameResultView = props => {
  const {
    selectedItemDetails,
    onClickPlayAgain,
    randomItemDetails,
    result,
  } = props

  const clickPlayAgain = () => {
    onClickPlayAgain()
  }

  let resultText = ''

  if (result === 'WIN') {
    resultText = 'YOU WON'
  } else if (result === 'LOSE') {
    resultText = 'YOU LOSE'
  } else {
    resultText = 'IT IS DRAW'
  }

  return (
    <>
      <div className="result-item-container">
        <h1 className="result-item-text">YOU</h1>
        <button type="button" className="result-item-btn">
          <img
            className="result-image"
            alt="your choice"
            src={selectedItemDetails.imageUrl}
          />
        </button>
      </div>
      <div className="result-item-container">
        <h1 className="result-item-text">OPPONENT</h1>
        <button type="button" className="result-item-btn">
          <img
            className="result-image"
            alt="opponent choice"
            src={randomItemDetails.imageUrl}
          />
        </button>
      </div>
      <div className="result-item-container">
        <h1 className="result-item-text">{resultText}</h1>
        <button
          onClick={clickPlayAgain}
          type="button"
          className="playagain-btn"
        >
          PLAY AGAIN
        </button>
      </div>
    </>
  )
}

export default GameResultView
