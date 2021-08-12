import React from "react";
import Timer from "./Timer";

export default function TopBar({ gameOver, winGame, restart, setTime, flagQnt, difficulty, setLevel }) {
  return (
    <div
      style={{
        background: "#4a752c",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div style={{flex: 1, flexDirection: "row", textAlign: "left" }}>
        <select style={{padding: "4px 7px",borderRadius: 5}} value={difficulty} onChange={setLevel}>
          <option value="0">Easy</option>
          <option value="1">Medium</option>
          <option selected value="2">Hard</option>
        </select>
      </div>

      <div style={{flex: 1, display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center",}}>
        <span role="img" aria-label="flag" style={{ color: "white", fontSize: 20, marginRight: 10 }}>
          🚩 {flagQnt}
        </span>
        {!restart ? <Timer gameOver={gameOver} winGame={winGame} sendTime={setTime} /> : '' }
      </div>

      <div style={{flex: 1, flexDirection: "row", textAlign: "right"}}>
      </div>
    </div>
  );
}
