"use client";

import { useEffect, useState } from "react";

export default function Home() {
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

  const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [isWin, setIsWin] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isWin) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isWin]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const sec = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsWin(false);
    setSeconds(0);
  };

  const isDuplicate = (row: number, col: number, value: string) => {
    if (value === "") return false;

    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] == value) return true;
      if (i !== row && board[i][col] == value) return true;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] == value) return true;
      }
    }

    return false;
  };

  const handleChange = (row: number, col: number, value: string) => {
    const newBoard = board.map((r) => [...r]);

    newBoard[row][col] = value;
    setBoard(newBoard);

    const completed = newBoard.every((row, rowIndex) =>
      row.every((cell, colIndex) => Number(cell) === solution[rowIndex][colIndex])
    );

    if (completed) {
      setIsWin(true);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold mb-4">🧩 Sudoku Game</h1>

      <div className="mb-6 text-2xl font-bold">
        ⏱ {formatTime(seconds)}
      </div>

      <div className="grid grid-cols-9 gap-1 border-4 border-black p-2 bg-white">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={cell}
              maxLength={1}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "" || /^[1-9]$/.test(value)) {
                  handleChange(rowIndex, colIndex, value);
                }
              }}
              disabled={initialBoard[rowIndex][colIndex] !== "" || isWin}
              className={`w-10 h-10 text-center text-xl border border-gray-400 focus:outline-none
              ${
                isDuplicate(rowIndex, colIndex, String(cell))
                  ? "bg-red-200"
                  : initialBoard[rowIndex][colIndex] !== ""
                  ? "bg-gray-200 font-bold"
                  : "bg-white"
              }`}
            />
          ))
        )}
      </div>

      {isWin && (
       
  <div className="mt-6 flex flex-col items-center animate-bounce">
    <div className="text-5xl font-black text-green-500">
      🎉 YOU WIN 🎉
    </div>

    <div className="mt-2 text-xl text-gray-700">
      完成時間：{formatTime(seconds)}
    </div>

    <div className="mt-4 text-6xl">
      🏆
    </div>
  </div>
)} 

      <button
        onClick={resetGame}
        className="mt-4 px-6 py-3 bg-black text-white rounded-xl"
      >
        重新開始
      </button>
    </main>
  );
}