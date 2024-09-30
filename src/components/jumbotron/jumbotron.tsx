import { useEffect, useState } from 'react'
import GameTitle from './atoms/gameTitle/gameTitle'
import ScoreBoard from './atoms/scoreBoard/scoreBoard'
import './jumbotron.css'

interface JumboTron {
    scoreBoard: {one: number, two: number}
    onGameStart: (onGameStart: boolean) => void;
    onGhostGameChange: (isGhostGame: boolean) => void;
}

function JumboTron( {onGameStart, scoreBoard, onGhostGameChange}: JumboTron){

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect( () => {
        window.addEventListener('keydown', handleGameStart );
        return () => {
            window.removeEventListener('keydown', handleGameStart);
        };
    });
    useEffect( () => {
        onGameStart(isPlaying)
    },[isPlaying])
    const handleGameStart = ( event: KeyboardEvent ) => {
        if( event.key === ' ') {
            setIsPlaying( prevIsPlaying => {
                return !prevIsPlaying
            })
        } else {
            return
        }
    }

    const handleGhostGame = (ghostGame: boolean) => {
        onGhostGameChange(ghostGame);
    }

    return(
        <> 
            <GameTitle 
                onGhostGameChange={handleGhostGame}
                isPlaying={isPlaying}>
            </GameTitle>
            <ScoreBoard scores={scoreBoard}></ScoreBoard>
        </>
    )
}

export default JumboTron