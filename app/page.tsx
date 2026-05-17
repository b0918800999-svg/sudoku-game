"use client";

import { useEffect, useState } from "react";

const initialBoard = [
  [5,3,"","",7,"","","",""],
  [6,"","",1,9,5,"","",""],
  ["",9,8,"","","","",6,""],
  [8,"","","",6,"","","",3],
  [4,"","",8,"",3,"","",1],
  [7,"","","",2,"","","",6],
  ["",6,"","","","",2,8,""],
  ["","","",4,1,9,"","",5],
  ["","","","",8,"","",7,9],
];

export default function SudokuGame() {
  const [board, setBoard] = useState(initialBoard);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (row: number, col: number, value: string) => {
    if (initialBoard[row][col] !== "") return;

    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSeconds(0);
  };

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        background: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
        🧩 數獨遊戲
      </h1>

      <div style={{ fontSize: "28px", marginBottom: "20px" }}>
        ⏱ {formatTime()}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 50px)",
          gap: "2px",
          background: "#333",
          padding: "5px",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              maxLength={1}
              onChange={(e) =>
                handleChange(rowIndex, colIndex, e.target.value)
              }
              style={{
                width: "50px",
                height: "50px",
                textAlign: "center",
                fontSize: "24px",
                border: "1px solid #ccc",
                background:
                  initialBoard[rowIndex][colIndex] !== ""
                    ? "#e5e5e5"
                    : "white",
              }}
            />
          ))
        )}
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "20px",
          borderRadius: "10px",
          border: "none",
          background: "#222",
          color: "white",
          cursor: "pointer",
        }}
      >
        重新開始
      </button>
    </main>
  );
}