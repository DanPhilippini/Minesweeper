import React, { useState, useEffect } from "react";
let timeIntervalId;
export default function Timer({ gameOver, winGame, sendTime }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => {
    if (time > 0 && (gameOver || winGame)) {
      setSTime(time);
      setTime(0);
    }
  }, [gameOver, winGame, time]);

  useEffect(() => {
    const incrementTime = () => {
      let newTime = time + 1;
      setTime(newTime);
    };
    timeIntervalId = setTimeout(() => {
      incrementTime();
    }, 1000);

    if (gameOver || winGame) {
      clearInterval(timeIntervalId);
    }
  }, [time, setTime, gameOver, winGame, sendTime]);

  return (
    <div style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
      {(gameOver || winGame) ? sTime : time}
    </div>
  );
}
