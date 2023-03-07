import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import GameResultView from '../GameResultView'

import './index.css'

const gameResultList = {
  initial: 'INITIAL',
  win: 'WIN',
  lose: 'LOSE',
  draw: 'DRAW',
}

class Game extends Component {
  state = {
    score: 0,
    isGameEnd: false,
    selectedItemDetails: '',
    result: gameResultList.initial,
    randomItemDetails: '',
  }

  showInitialGame = () => {
    const {choicesList} = this.props
    return (
      <>
        {choicesList.map(each => {
          const {id, imageUrl} = each
          const clickChoiceItem = () => {
            const randomNumber = Math.floor(Math.random() * 3)
            const randomItemDetails = choicesList[randomNumber]
            const selectedId = id
            const randomId = randomItemDetails.id
            let result = ''
            if (selectedId === randomId) {
              result = gameResultList.draw
            } else if (selectedId === 'ROCK') {
              if (randomId === 'SCISSORS') {
                result = gameResultList.win
              } else {
                result = gameResultList.lose
              }
            } else if (selectedId === 'SCISSORS') {
              if (randomId === 'PAPER') {
                result = gameResultList.win
              } else {
                result = gameResultList.lose
              }
            } else if (selectedId === 'PAPER') {
              if (randomId === 'ROCK') {
                result = gameResultList.win
              } else {
                result = gameResultList.lose
              }
            }

            console.log(result)

            if (result === gameResultList.win) {
              this.setState(prevState => ({
                selectedItemDetails: each,
                isGameEnd: true,
                result,
                randomItemDetails,
                score: prevState.score + 1,
              }))
            } else if (result === gameResultList.lose) {
              this.setState(prevState => ({
                selectedItemDetails: each,
                isGameEnd: true,
                result,
                randomItemDetails,
                score: prevState.score - 1,
              }))
            } else {
              this.setState(prevState => ({
                selectedItemDetails: each,
                isGameEnd: true,
                result,
                randomItemDetails,
                score: prevState.score,
              }))
            }
          }

          return (
            <button
              data-testid={`${id.toLowerCase()}Button`}
              type="button"
              key={id}
              className="choice-item-btn"
            >
              <img
                onClick={clickChoiceItem}
                className="choice-image"
                alt={id}
                src={imageUrl}
              />
            </button>
          )
        })}
      </>
    )
  }

  onClickPlayAgain = () => {
    this.setState({isGameEnd: false})
  }

  render() {
    const {
      score,
      isGameEnd,
      randomItemDetails,
      result,
      selectedItemDetails,
    } = this.state
    return (
      <div className="app-container">
        <div className="score-container">
          <div className="score-head-container">
            <h1 className="score-head-item">Rock Paper Scissors</h1>
          </div>
          <button type="button" className="score-btn-container">
            <p className="score-text">Score</p>
            <p className="score">{score}</p>
          </button>
        </div>
        <div className="game-container">
          {isGameEnd ? (
            <GameResultView
              result={result}
              selectedItemDetails={selectedItemDetails}
              randomItemDetails={randomItemDetails}
              onClickPlayAgain={this.onClickPlayAgain}
            />
          ) : (
            this.showInitialGame()
          )}
        </div>
        <div className="rules-btn-container">
          <Popup
            modal
            trigger={
              <button className="rules-btn" type="button">
                RULES
              </button>
            }
            className="popup-content"
          >
            {close => (
              <>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  <RiCloseLine className="wrong-icon" />
                </button>
                <div className="rules-image-container">
                  <img
                    className="rules-image"
                    alt="rules"
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  />
                </div>
              </>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default Game
