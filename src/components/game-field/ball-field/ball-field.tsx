import { useEffect, useState } from 'react';
import Ball from './atoms/ball';
import './ball-field.css';
import GhostService from '../../../services/ghostService';

interface BallFieldProps{
    timeCount: number;
    fieldSize: { width: number, height: number};
    isPlaying: boolean;
    hasBarCollision: {one: boolean, two: boolean};
    isGoal: {one: boolean, two: boolean};
    onBallPositionUpdate: ({ x, y }: { x: number; y: number }) => void;
}

function BallField( {timeCount, fieldSize, isPlaying, hasBarCollision, onBallPositionUpdate, isGoal} : BallFieldProps) {
    
    const ballSize = 8;
    const speed = 20;
    const [ballPosition, setBallPosition] = useState({
        x: 0,
        y: 0
    })
    const [direction, setDirection] = useState({
            x: -1,
            y: -1
    })

    useEffect( () => {

        if( fieldSize ){
            setBallPosition( {
                x: fieldSize.width / 2,
                y: fieldSize.height / 2
            })
        } else {
            return 
        }

    },[ fieldSize ]);

    useEffect ( () => {
        if( isPlaying ) {
            updatePosition();
        } else {
            return 
        }
    }, [isPlaying, timeCount]);
    const updatePosition = () => {
        
        setBallPosition( prevPosition => {
            
            let updatedPosition = {
                x: prevPosition.x + speed * direction.x,
                y: prevPosition.y + speed * direction.y
            }

            return updatedPosition
        })
    }

    useEffect( () => {
        checkCollisions();
    },[ballPosition]);
    const checkCollisions = () => {
        if (ballPosition.y - ballSize <= 0 && direction.y !== 1) {
          setDirection(prevDirection => ({
            ...prevDirection,
            y: 1
          }));
        } else if (ballPosition.y + ballSize >= fieldSize.height && direction.y !== -1) {
          setDirection(prevDirection => ({
            ...prevDirection,
            y: -1 
          }));
        }
    };
    useEffect( () => {
        if( hasBarCollision.one ) {
            setDirection( prevDirection => {
                return {
                    ...prevDirection,
                    x: 1
                }
            })
        } 

        if( hasBarCollision.two ) {
            setDirection( prevDirection => {
                return {
                    ...prevDirection,
                    x: -1
                }
            })
        } 
    },[hasBarCollision])

    useEffect( () => {
        onBallPositionUpdate(ballPosition);
        GhostService.calculateBarPosition(ballPosition, direction, fieldSize);
    }, [ballPosition])
      
    useEffect( () => {
        if( isGoal.one || isGoal.two ){
            setBallPosition( {
                x: fieldSize.width / 2,
                y: fieldSize.height / 2
            })
        }
    },[isGoal])
    
    return(
        <div className='ball-field'>
            <Ball ballPosition={ballPosition}></Ball>
        </div>
    )
}

export default BallField