// src/components/FormReducer_R.jsx
import { useReducer } from "react";

const initialState = {
  mode: "login",
  email: "",
  password: "",
  confirm: "",
  error: "",
  // visibility flags included in reducer state
  showPassword: false,
  showConfirm: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value, error: "" };
    case "TOGGLE_MODE":
      return {
        ...state,
        mode: state.mode === "login" ? "signup" : "login",
        error: "",
        confirm: "",
        showConfirm: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "TOGGLE_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "TOGGLE_SHOW_CONFIRM":
      return { ...state, showConfirm: !state.showConfirm };
    case "RESET_FIELDS":
      return { ...state, email: "", password: "", confirm: "", showPassword: false, showConfirm: false, error: "" };
    default:
      return state;
  }
}

export default function FormReducer_R() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const validate = () => {
    if (!state.email.includes("@")) return "Invalid email";
    if (state.password.length < 6) return "Password too short (min 6 chars)";
    if (state.mode === "signup" && state.password !== state.confirm) return "Passwords do not match";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      dispatch({ type: "SET_ERROR", error: err });
      return;
    }
    alert(`${state.mode} successful ✅\nEmail: ${state.email}`);
    dispatch({ type: "RESET_FIELDS" });
  };

  return (
    <div className="bg-white shadow rounded p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{state.mode === "login" ? "Login" : "Signup"}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
            className="mt-1 w-full border p-2 rounded"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block relative">
          <span className="text-sm font-medium">Password</span>
          <input
            type={state.showPassword ? "text" : "password"}
            value={state.password}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
            className="mt-1 w-full border p-2 rounded pr-20"
            placeholder="at least 6 characters"
            required
          />
          <button
            type="button"
            onClick={() => dispatch({ type: "TOGGLE_SHOW_PASSWORD" })}
            aria-pressed={state.showPassword}
            className="absolute right-2 top-8 text-sm px-2 py-1 rounded bg-gray-100 border"
          >
            {state.showPassword ? "Hide" : "Show"}
          </button>
        </label>

        {state.mode === "signup" && (
          <label className="block relative">
            <span className="text-sm font-medium">Confirm Password</span>
            <input
              type={state.showConfirm ? "text" : "password"}
              value={state.confirm}
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "confirm", value: e.target.value })}
              className="mt-1 w-full border p-2 rounded pr-20"
              placeholder="repeat password"
              required
            />
            <button
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_SHOW_CONFIRM" })}
              aria-pressed={state.showConfirm}
              className="absolute right-2 top-8 text-sm px-2 py-1 rounded bg-gray-100 border"
            >
              {state.showConfirm ? "Hide" : "Show"}
            </button>
          </label>
        )}

        {state.error && <p className="text-red-600 text-sm">{state.error}</p>}

        <div className="flex gap-2 mt-2">
          <button type="submit" className="flex-1 bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
            {state.mode === "login" ? "Login" : "Signup"}
          </button>

          <button
            type="button"
            onClick={() => dispatch({ type: "TOGGLE_MODE" })}
            className="flex-1 border rounded py-2"
          >
            Switch to {state.mode === "login" ? "Signup" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
