// src/components/FormState_S.jsx
import { useState } from "react";

export default function FormState_S() {
    const [mode, setMode] = useState("login"); // "login" | "signup"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    // visibility toggles (useState example)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const validate = () => {
        if (!email.includes("@")) return "Invalid email";
        if (password.length < 6) return "Password too short (min 6 chars)";
        if (mode === "signup" && password !== confirm) return "Passwords do not match";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setError(err);
        } else {
            setError("");
            alert(`${mode} successful ✅\nEmail: ${email}`);
            // reset inputs (keep mode)
            setEmail("");
            setPassword("");
            setConfirm("");
            setShowPassword(false);
            setShowConfirm(false);
        }
    };

    return (
        <div className="bg-white shadow-2xl rounded mx-auto mt-10 p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{mode === "login" ? "Login" : "Signup"}</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="block">
                    <span className="text-sm font-medium">Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full border p-2 rounded"
                        placeholder="you@example.com"
                        required
                    />
                </label>

                <label className="block relative">
                    <span className="text-sm font-medium">Password</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full border p-2 rounded pr-20"
                        placeholder="at least 6 characters"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-pressed={showPassword}
                        className="absolute right-2 top-8 text-sm px-2 py-1 rounded bg-gray-100 border"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </label>

                {mode === "signup" && (
                    <label className="block relative">
                        <span className="text-sm font-medium">Confirm Password</span>
                        <input
                            type={showConfirm ? "text" : "password"}
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="mt-1 w-full border p-2 rounded pr-20"
                            placeholder="repeat password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm((s) => !s)}
                            aria-pressed={showConfirm}
                            className="absolute right-2 top-8 text-sm px-2 py-1 rounded bg-gray-100 border"
                        >
                            {showConfirm ? "Hide" : "Show"}
                        </button>
                    </label>
                )}

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="flex gap-2 mt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
                    >
                        {mode === "login" ? "Login" : "Signup"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setMode((m) => (m === "login" ? "signup" : "login"));
                            setError("");
                            // reset confirm when switching to login
                            if (mode === "signup") setConfirm("");
                        }}
                        className="flex-1 border rounded py-2"
                    >
                        Switch to {mode === "login" ? "Signup" : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}
