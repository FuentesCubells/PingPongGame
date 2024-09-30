import './bar.css'

interface BarProps {
    id: string,
    barPositions: {
        [key: string]: number;
        one: number;
        two: number;
    };
}

function Bar( {id, barPositions} : BarProps) {
    
    return (
        <span className='bar' id={id} style={{ top: `${barPositions[id]}px`}}></span>
    )
}

export default Bar