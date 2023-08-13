import { DisplayState } from './helper'
import {FaPause, FaPlay, FaUndo} from 'react-icons/fa'
import {formatTime} from './helper'
interface DisplayProps {
    displayState: DisplayState;
    reset: () => void;
    startStop: (displayState: DisplayState) => void;
}

const Display:React.FC<DisplayProps> = ({
    displayState,
    reset,
    startStop
}) => {
    return (
        <div className="display">
            <h4 style={{color: "white"}} id="timer-label">{displayState.timeType}</h4>
            <span id="time-left" style={{color: `${displayState.timerRunning ? "red" : "white"}`}}>{formatTime(displayState.time)}</span>
            <div>
                <button onClick={() => startStop(displayState)} id="start_stop">{displayState.timerRunning ? <FaPause/> : <FaPlay/>}</button>
                <button onClick={reset} id="reset"><FaUndo /></button>
            </div>
        </div>
    )
}

export default Display