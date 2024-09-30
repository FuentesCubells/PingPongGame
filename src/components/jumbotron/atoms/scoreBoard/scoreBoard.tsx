import './scoreBoard.css'

interface ScoreBoard{
    scores: Scores
}

interface Scores {
    one: number;
    two: number;
}
function ScoreBoard ( {scores}: ScoreBoard ){

    return(
        <div className="scoreBoard-wrapper">
            <div className="scorePlayer-One">
                <span>{scores.one}</span>
            </div>
            <div className="scorePlayer-Two">
                <span>{scores.two}</span>
            </div>
        </div>
    )
}

export default ScoreBoard