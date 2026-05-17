"use client";

import { useEffect, useState } from "react";

const initialBoard = [
  [5, 3, "", "", 7, "", "", "", ""],
  [6, "", "", 1, 9, 5, "", "", ""],
  ["", 9, 8, "", "", "", "", 6, ""],
  [8, "", "", "", 6, "", "", "", 3],
  [4, "", "", 8, "", 3, "", "", 1],
  [7, "", "", "", 2, "", "", "", 6],
  ["", 6, "", "", "", "", 2, 8, ""],
  ["", "", "", 4, 1, 9, "", "", 5],
  ["", "", "", "", 8, "", "", 7, 9],
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

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSeconds(0);
  };

  const handleChange = (row: number, col: number, value: string) => {
    if (initialBoard[row][col] !== "") return;
    if (value !== "" && !/^[1-9]$/.test(value)) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);
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
        background:
          "linear-gradient(135deg, #111827, #312e81, #7c2d12)",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
        🧩 楊家將數獨
      </h1>

      <div
        style={{
          fontSize: "28px",
          marginBottom: "20px",
          background: "rgba(255,255,255,0.15)",
          padding: "10px 22px",
          borderRadius: "999px",
        }}
      >
        ⏱ {formatTime()}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 46px)",
          gap: "3px",
          background: "rgba(255,255,255,0.35)",
          padding: "8px",
          borderRadius: "14px",
          boxShadow: "0 0 30px rgba(255,255,255,0.35)",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              maxLength={1}
              inputMode="numeric"
              onChange={(e) =>
                handleChange(rowIndex, colIndex, e.target.value)
              }
              style={{
                width: "46px",
                height: "46px",
                textAlign: "center",
                fontSize: "23px",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "6px",
                color: "#111827",
                fontWeight:
                  initialBoard[rowIndex][colIndex] !== "" ? "bold" : "normal",
                background:
                  initialBoard[rowIndex][colIndex] !== ""
                    ? "#fde68a"
                    : "white",
              }}
            />
          ))
        )}
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop: "24px",
          padding: "14px 34px",
          fontSize: "20px",
          borderRadius: "999px",
          border: "none",
          background: "linear-gradient(135deg, #facc15, #fb923c)",
          color: "#111827",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
        }}
      >
        重新開始
      </button>
    </main>
  );
}