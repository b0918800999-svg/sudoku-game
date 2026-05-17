export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-8">
        🧩 Sudoku Game
      </h1>

      <div className="grid grid-cols-9 gap-1 border-4 border-black p-2 bg-white">
        {[...Array(81)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            className="w-10 h-10 text-center text-xl border border-gray-400"
          />
        ))}
      </div>

      <button className="mt-8 px-6 py-3 bg-black text-white rounded-xl">
        開始遊戲
      </button>
    </main>
  );
}