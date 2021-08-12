import React, { useState, useEffect } from "react";
import createBoard from "../util/createboard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";
import TopBar from "./TopBar";
import Modal from "./Modal";
export default function Board() {
  const [board, setBoard] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [restart, setRestart] = useState(false);
  const [newTime, setTime] = useState(0);
  const [flagQnt, setFlag] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  useEffect(() => {
    const generateBoard = () => {
      let size, bombs;
      if(difficulty == 0) { size = 10; bombs = 20; }
      if(difficulty == 1) { size = 16; bombs = 40; }
      if(difficulty == 2) { size = 20; bombs = 60; }
      const getBoard = createBoard(size, size, bombs, setMineLocations);
      setNonMinesCount((size * size) - bombs);
      setTime(0);
      setFlag(0);
      setBoard(getBoard.board);
      setMineLocations(getBoard.mineLocation);
      setGameOver(false);
      setWinGame(false);
      setRestart(false);
    };
    generateBoard();
  }, [restart, setRestart]);

  const updateBoard = (x, y, e) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    let newNonMinesCount = nonMinesCount;
    if (newBoardValues[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        if (
          !newBoardValues[mineLocations[i][0]][mineLocations[i][1]].revealed
        ) {
          newBoardValues[mineLocations[i][0]][
            mineLocations[i][1]
          ].revealed = true;
          setBoard(newBoardValues);
        }
      }
      setGameOver(true);
    } else {
      newBoardValues = revealed(newBoardValues, x, y, newNonMinesCount);
      if (!newBoardValues) { return; }
      setBoard(newBoardValues.arr);
      setNonMinesCount(newBoardValues.newNonMinesCount);
      if(newBoardValues.newNonMinesCount == 0) { setWinGame(true); }
    }
  };

  const flagCell = (x, y) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    newBoardValues[x][y].flagged = !newBoardValues[x][y].flagged;

    if(newBoardValues[x][y].flagged) {
      setFlag(flagQnt + 1)
    } else {
      setFlag(flagQnt - 1)
    }
    setBoard(newBoardValues);
  };


  const setLevel = (event) => {
    setDifficulty(event.target.value);
    setRestart(true);
  }

  return (
    <div style={{ boxShadow: "0 4px 3px rgba(0,0,0,0.3)", position: "relative" }}>
      {gameOver && <Modal reset={setRestart} completeTime={newTime} />}
      {winGame && <Modal reset={setRestart} completeTime={newTime} />}
      <TopBar gameOver={gameOver} winGame={winGame} restart={restart} setTime={setTime} newTime={newTime} flagQnt={flagQnt} difficulty={difficulty} setLevel={setLevel}  />
      {board.map((row, inde) => {
        return (
          <div style={{ display: "flex" }} key={inde}>
            {row.map((singleCell, index) => {
              return (
                <Cell
                  key={index}
                  data={singleCell}
                  updateBoard={updateBoard}
                  flagCell={flagCell}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
