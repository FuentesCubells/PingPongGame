import './pop-up.css';

interface PopupProps {
    isVisible: boolean;
    onClose: () => void;
}

function Popup({ isVisible, onClose }: PopupProps) {
    if (!isVisible) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>How to Play</h2>
                <p>
                    <strong>Player 1:</strong> Use <b>W</b> to move up and <b>S</b> to move down.
                </p>
                <p>
                    <strong>Player 2:</strong> Use the <b>Arrow Up</b> and <b>Arrow Down</b> keys to control the right paddle.
                </p>
                <p>
                    If you want to play solo, press the <b>Single Player</b> button, and the right paddle will move automatically.
                </p>
                <p>
                    Press the <b>Spacebar</b> to start or pause the game at any time.
                </p>
                <button onClick={onClose}>Got it!</button>
            </div>
        </div>
    );
}

export default Popup;
