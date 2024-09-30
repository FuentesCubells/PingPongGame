import { useEffect, useState } from 'react';
import './App.css'
import GameField from './components/game-field/game-field'
import JumboTron from './components/jumbotron/jumbotron'


function App() {

  const [gameStarted, setGameStarted] = useState( false )  ;
  const [scoreBoard, setScoreBoard] = useState ( {
    one: 0,
    two: 0
  })
  const [isGhostGame, setIsGhostGame] = useState(false);

  const handleGameStart = (isPlaying: boolean) => {
    setGameStarted( isPlaying );
  }

  const handleGoal = ( goal: {one: boolean, two: boolean}) => {
    if( goal.one ){
      setScoreBoard( prevScoreBoard => ({
        ...prevScoreBoard,
        one: prevScoreBoard.one + 1
      }));
    }
    if( goal.two ){
      setScoreBoard( prevScoreBoard => ({
        ...prevScoreBoard,
        two: prevScoreBoard.two + 1
      }));
    }
  }

  useEffect(() => {
    setGameStarted(false)
  }, [scoreBoard])

  const handleGhostGame = (ghostGame: boolean) => {
    setIsGhostGame(ghostGame);
  } 

  return (
    <>
      <JumboTron 
        onGhostGameChange={handleGhostGame}
        scoreBoard={scoreBoard}
        onGameStart={handleGameStart}></JumboTron>
      <GameField
        isGhostGame={isGhostGame}
        onIsGoal={handleGoal}
        isPlaying={gameStarted}>
      </GameField>
    </>
  )
}

export default App
