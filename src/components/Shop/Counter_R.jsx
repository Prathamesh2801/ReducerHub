import { useReducer } from "react";


const initialValue = {
    count: 0
}
function reducer(state, action,) {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

export default function Counter_R() {
    const [state, dispatch] = useReducer(reducer, initialValue);

    return (
        <div className="bg-white shadow rounded mx-auto mt-20 p-6 flex flex-col items-center gap-4 w-64">
            <h2 className="text-lg font-semibold">Counter_R (useReducer)</h2>
            <div className="text-3xl font-bold">{state.count}</div>
            <div className="flex gap-3">
                <button
                    onClick={() => dispatch({ type: "DECREMENT" })}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    −
                </button>
                <button
                    onClick={() => dispatch({ type: "INCREMENT" })}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    +
                </button>
            </div>
        </div>
    );
}
