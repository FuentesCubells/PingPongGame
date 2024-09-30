import { useEffect, useState } from 'react'
import Bar from './atoms/bar'
import './bar-field.css'
import GhostService from '../../../services/ghostService'

interface BarFieldProps {
    id: string
    timeCount: number,
    fieldSize: {width: number, height: number}
    isPlaying: boolean,
    isGhostGame: boolean
    onBarPositionUpdate: ({ one, two }: { one: number; two: number }) => void;
}

function BarField( {id, isPlaying, fieldSize, isGhostGame, onBarPositionUpdate} :BarFieldProps) {
    
    const [barPositions, setBarPositions] = useState({
        one: 0,
        two: 0
    });
    const moveStep = 30;
    const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    const handleKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        setKeysPressed(prevKeys => new Set(prevKeys.add(event.key)));
    };
    const handleKeyUp = (event: KeyboardEvent) => {
        event.preventDefault();
        setKeysPressed(prevKeys => {
            const newKeys = new Set(prevKeys);
            newKeys.delete(event.key);
            return newKeys;
        });
    };

    useEffect( () => {
        if( id === 'one' && isPlaying) {
            playerOneControls( keysPressed );
        }
        if (id === 'two'  && isPlaying) {
            playerTwoControls( keysPressed );
        }
    }, [keysPressed, isPlaying]);
    const playerOneControls = ( keyPressed: any) => {
        if( keyPressed.has('w') ){
            setBarPositions( prevPositions => {
                if (prevPositions.one > 0) {
                    return { ...prevPositions, one: prevPositions.one - moveStep };
                } else {
                    return prevPositions
                }
            })
        }
        if( keyPressed.has('s') ){
            setBarPositions( prevPositions => {
                if (prevPositions.one < fieldSize.height - 128) {
                    return { ...prevPositions, one: prevPositions.one + moveStep };
                } else {
                    return prevPositions
                }
            })
        }
    }
    const playerTwoControls = ( keyPressed: any) => {
        if( keyPressed.has('ArrowUp') ){
            setBarPositions( prevPositions => {
                if (prevPositions.two > 0) {
                    return { ...prevPositions, two: prevPositions.two - moveStep };
                } else {
                    return prevPositions
                }
            })
        }
        if( keyPressed.has('ArrowDown')){
            setBarPositions( prevPositions => {
                if (prevPositions.two < fieldSize.height - 128) {
                    return { ...prevPositions, two: prevPositions.two + moveStep };
                } else {
                    return prevPositions
                }
            })
        }
    }

    useEffect(() => {
        onBarPositionUpdate(barPositions)
    },[barPositions])

    useEffect(() => {
        
        if( isGhostGame && id ==='two' ) {
            const handleBarPositionUpdate = (newBarPosition: number) => {
                setBarPositions({...barPositions, two: newBarPosition});
            };
    
            GhostService.subscribe(handleBarPositionUpdate);
        }
    }, [isGhostGame])

    return ( 
        <div className='barField-wrapper'>
            <Bar    
                id={id}
                barPositions={barPositions}>
            </Bar>
        </div>
    )
}

export default BarField