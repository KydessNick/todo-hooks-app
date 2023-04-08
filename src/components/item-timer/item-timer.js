import React, { useState, useEffect } from 'react';

import './item-timer.css';

export default function ItemTimer(props) {
  // eslint-disable-next-line class-methods-use-this
  const { onPlay, onPause, timeInSec, isTimerOn } = props;
  const [totalTime, setTotalTime] = useState(timeInSec);

  useEffect(() => {
    let interval = null;
    if (isTimerOn) {
      interval = setInterval(() => {
        setTotalTime((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerOn, totalTime]);

  const formatTime = (timeState) => {
    const getPadTime = (time) => time.toString().padStart(2, '0');
    const minutes = getPadTime(Math.floor(timeState / 60));
    const seconds = getPadTime(timeState - minutes * 60);
    return `${minutes}:${seconds}`;
  };
  const formattedTime = formatTime(totalTime);
  return (
    <span className="timer-container">
      <button type="button" className="icon icon-play" aria-label="play" onClick={onPlay} />
      <button type="button" className="icon icon-pause" aria-label="pause" onClick={onPause} />
      <div className="timer">{formattedTime}</div>
    </span>
  );
}
