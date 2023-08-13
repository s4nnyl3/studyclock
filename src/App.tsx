import { useState, useEffect } from 'react'
import './App.css'
import { DisplayState } from "./helper"
import TimeSetter from './time-setter'
import Display from './display'
import alarmsound from "./assets/alarmsound.mp3"

const defaultBreakTime = 5*60;
const defaultSessionTime = 25*60;
const min = 60;
const max = 60*60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false
  });

  useEffect(() => {
    let timerID: number;
    if(!displayState.timerRunning) return;

    if(displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }

    return () => {window.clearInterval(timerID)}
  }, [displayState.timerRunning])

  useEffect(() => {
    if(displayState.time === 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime = 7;
      audio.play().catch((err) => console.log(err));
      setDisplayState((prev) => ({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime
      }))
    }
  }, [displayState.time]);

  

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false
    });

    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };
  
  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  }

  

  const startStop = () => {
    setDisplayState((prev) => ({...prev, timerRunning: !prev.timerRunning}))
  }

  const changeBreakTime = (time: number) => {
    if(displayState.timerRunning) return;
    setBreakTime(time);
    
  }

  const changeSessionTime = (time: number) => {
    if(displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false
    });
  }

  return (
    <>
      <div className="clock">
        <div className="setters">
          <div className="break">
            <h4 style={{color: "white"}} id="break-label">Break Length</h4>
            <TimeSetter time={breakTime} setTime={changeBreakTime} min={min} max={max} interval={interval} type="break" />
          <div className="session">
            <h4 style={{color: "white"}} id="session-label">Session Length</h4>
            <TimeSetter time={sessionTime} setTime={changeSessionTime} min={min} max={max} interval={interval} type="session" />
          </div>
          </div>
        </div>
        <Display displayState={displayState} reset={reset} startStop={startStop} />
        <audio id="beep" src={alarmsound} />
      </div>
    </>
  )
}

export default App
