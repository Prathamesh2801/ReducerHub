import { useReducer, useState } from "react";

const initialVal = {
  count: 0
}
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 }
    case "DECREMENT":
      return { count: state.count - 1 }
    case "CLEAR":
      return {
        count: 0
      }
    default:
      break;
  }
}
export default function Counter_S() {
  const [state, dispatch] = useReducer(reducer, initialVal)

  return (
    <div className="bg-white shadow mx-auto mt-20 rounded p-6 flex flex-col items-center gap-4 w-64">
      <h2 className="text-lg font-semibold">Counter_S (useState)</h2>
      <div className="text-3xl font-bold">{state.count}</div>
      <div className="flex gap-3">
        <button
          disabled={state.count <= 0}
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
        >
          −
        </button>
        <button
          onClick={() => dispatch({ type: 'CLEAR' })}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          X
        </button>
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}
