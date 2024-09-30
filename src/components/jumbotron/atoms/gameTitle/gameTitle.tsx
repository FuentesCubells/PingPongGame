import { useState } from 'react';
import './gameTitle.css';
import Popup from '../pop-up/pop-up';

interface GameTitleProps {
    isPlaying: boolean;
    onGhostGameChange: (isGhostGame: boolean) => void;
}

function GameTitle({ isPlaying, onGhostGameChange }: GameTitleProps) {
    const [isActive, setIsActive] = useState(false);
    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleClick = () => {
        setIsActive(!isActive);
        onGhostGameChange(!isActive);
    };

    return (
        <header className="gameTitle-wrapper">
            <div className="gameTitle">
                <h1>Ping Pong Game</h1>
            </div>
            <div className="gameState">
                {isPlaying ? <h2>Playing</h2> : <h2>Press Space To Start Playing</h2>}
            </div>
            <div
                className={`gameState-ghostGame${isActive ? '-active' : ''}`}
                onClick={handleClick}
            >
                Play Solo
            </div>
            <Popup isVisible={showPopup} onClose={handleClosePopup} />
        </header>
    );
}

export default GameTitle;
