import './ball.css'

interface BallProps {
    ballPosition : {x: number, y: number}
}
function Ball( {ballPosition} : BallProps){

    return(
        <span className='ball-span' style={{ top: `${ballPosition.y}px`, left: `${ballPosition.x}px` }}></span>
    )
}

export default Ball