import { useState } from "react";

export default function Counter_S() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white shadow mx-auto mt-20 rounded p-6 flex flex-col items-center gap-4 w-64">
      <h2 className="text-lg font-semibold">Counter_S (useState)</h2>
      <div className="text-3xl font-bold">{count}</div>
      <div className="flex gap-3">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          −
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}
