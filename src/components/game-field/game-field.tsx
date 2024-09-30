import { useEffect, useRef, useState } from 'react'
import BallField from './ball-field/ball-field'
import './game-field.css'
import BarField from './bar-field/bar-filed';

interface GameFieldProps {
    isPlaying: boolean,
    isGhostGame: boolean,
    onIsGoal: ({ one, two }: { one: boolean; two: boolean }) => void;
}
function GameField({ isPlaying, isGhostGame, onIsGoal }: GameFieldProps) {

    const ballSizes = { width: 8, height: 8 };
    const barSizes = { width: 8, height: 128 };

    const fieldSizeRef = useRef<HTMLDivElement>(null);
    const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });
    const [fieldState, setFieldState] = useState({
        barPositions: {
            one: 0,
            two: 0
        },
        ballPosition: {
            x: 0,
            y: 0
        }
    })

    const [timeCount, setTimeCount] = useState(0);
    const [hasBarCollision, setHasBarCollision] = useState({
        one: false,
        two: false
    });
    const [isGoal, setIsGoal] = useState({
        one: false,
        two: false
    })

    useEffect(() => {
        if (fieldSizeRef.current) {
            let fieldSizes = {
                width: fieldSizeRef.current.offsetWidth,
                height: fieldSizeRef.current.offsetHeight
            }
            setFieldSize(fieldSizes);
        }
    }, []);

    useEffect(() => {

        if (isPlaying) {
            const intervalID = setInterval(() => {
                setTimeCount(prevtimeCount => {
                    return prevtimeCount + 1
                });
            }, 100);

            return () => clearInterval(intervalID);
        } else {
            return
        }

    }, [isPlaying])

    const handlePositionUpdate = (barPositions: { one: number; two: number }) => {
        setFieldState(prevFieldState => ({
            ...prevFieldState,
            barPositions: { ...barPositions }
        }));
    };
    const handleBarPositionUpdate = (ballPosition: { x: number; y: number }) => {
        setFieldState(prevFieldState => ({
            ...prevFieldState,
            ballPosition: { ...ballPosition }
        }));
    };

    useEffect(() => {
        if (fieldState.ballPosition.x >= fieldSize.width - ballSizes.width || fieldState.ballPosition.x <= 0) {
            checkBarCollision();
        }
    }, [fieldState])
    const checkBarCollision = () => {

        const collisionPlayerOne =
            fieldState.ballPosition.x < barSizes.width &&
            fieldState.ballPosition.x + ballSizes.width < 0 &&
            fieldState.ballPosition.y < fieldState.barPositions.one + barSizes.height &&
            fieldState.ballPosition.y + ballSizes.width > fieldState.barPositions.one;

        const collisionPlayerTwo =
            fieldState.ballPosition.x + ballSizes.width >= fieldSize.width - barSizes.width && // Verifica si el borde de la pelota toca la barra dos
            fieldState.ballPosition.x <= fieldSize.width && // La pelota no ha salido del campo
            fieldState.ballPosition.y + ballSizes.height >= fieldState.barPositions.two && // El borde inferior de la pelota está por debajo del borde superior de la barra
            fieldState.ballPosition.y <= fieldState.barPositions.two + barSizes.height; // El borde superior de la pelota está por encima del borde inferior de la barra


        console.log()
        if (collisionPlayerOne) {
            setHasBarCollision({ one: true, two: false });
        } else if (collisionPlayerTwo) {
            setHasBarCollision({ one: false, two: true });
        } else {
            checkGoal()
        }
    };

    const checkGoal = () => {
        if (fieldState.ballPosition.x > fieldSize.width + ballSizes.width * 10) {
            setIsGoal({ one: true, two: false });
        }

        if (fieldState.ballPosition.x < - barSizes.width * 10) {
            setIsGoal({ one: false, two: true });
            console.log(isGoal)
        }
    };
    useEffect(() => {
        onIsGoal(isGoal)
    }, [isGoal])

    return (
        <>
            <div className="gameField-Wrapper" ref={fieldSizeRef}>
                <BarField
                    id={'one'}
                    isGhostGame={isGhostGame}
                    fieldSize={fieldSize}
                    onBarPositionUpdate={handlePositionUpdate}
                    isPlaying={isPlaying}
                    timeCount={timeCount}>
                </BarField>
                <BallField
                    isGoal={isGoal}
                    hasBarCollision={hasBarCollision}
                    onBallPositionUpdate={handleBarPositionUpdate}
                    isPlaying={isPlaying}
                    fieldSize={fieldSize}
                    timeCount={timeCount}>
                </BallField>
                <BarField
                    id={'two'}
                    isGhostGame={isGhostGame}
                    fieldSize={fieldSize}
                    onBarPositionUpdate={handlePositionUpdate}
                    isPlaying={isPlaying}
                    timeCount={timeCount}>
                </BarField>
            </div>
            <p>{timeCount}</p>
        </>
    )
}

export default GameField