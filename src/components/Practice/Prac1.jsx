import { useState } from "react";
import toast from "react-hot-toast";

const SAMPLE_ITEMS = [
    { id: 1, name: "Apple", price: 10 },
    { id: 2, name: "Banana", price: 5 },
    { id: 3, name: "Orange", price: 12 },
];

// const emptyCart = [];
// const sampleCart = [
//     { id: 1, name: "Apple", price: 10, qty: 2 },
//     { id: 2, name: "Banana", price: 5, qty: 1 },
// ];

// const cart = emptyCart;

export default function Prac1() {

    const [cart, setCart] = useState([])
    const [coupon, setCoupon] = useState('')
    const [appliedCoupon, setAppliedCoupon] = useState(null)

    const addItems = (item) => {
        setCart((prev) => {
            const existingItem = prev.find((p) => p.id === item.id)
            if (existingItem) {
                return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
            }
            return [...prev, { ...item, qty: 1 }]
        })
    }

    const removeItem = (id) => {
        setCart((prev) => prev.filter((p) => p.id !== id))
    }

    const updatedItem = (id, qty) => {
        if (qty <= 0) {
            return removeItem(id)
        }
        setCart((prev) => prev.map((p) => (p.id === id) ? { ...p, qty: qty } : p))
    }


    const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0)
    const discount = appliedCoupon === 'SAVE10' ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - discount;

    const applyCoupon = () => {
        if (coupon.trim().toUpperCase() === 'SAVE10') {
            setAppliedCoupon('SAVE10')
        }
        else {
            setAppliedCoupon("INVALID")
        }
        setCoupon('')
    }

    return (
        <div className="bg-white mx-auto shadow rounded p-4 w-full md:w-[480px]">
            <h3 className="text-lg font-semibold mb-3">🛒 Cart (UI-only)</h3>

            <div className="grid grid-cols-3 gap-2 mb-4">
                {SAMPLE_ITEMS.map((it) => (
                    <button
                        key={it.id}
                        className="col-span-1 bg-indigo-50 hover:bg-indigo-100 border rounded p-2 text-sm flex flex-col items-start"
                        type="button"
                        onClick={() => addItems(it)}
                    >
                        <span className="font-medium">{it.name}</span>
                        <small className="text-xs text-gray-600">₹{it.price}</small>
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {cart.length === 0 ? (
                    <div className="text-sm text-gray-500">Cart is empty. Add items above.</div>
                ) : (
                    <ul className="divide-y">
                        {cart.map((item) => (
                            <li key={item.id} className="py-2 flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-gray-500">₹{item.price} each</div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="px-2 py-1 border rounded"
                                        aria-label={`decrease ${item.name}`}
                                        onClick={() => updatedItem(item.id, item.qty - 1)}
                                    >
                                        −
                                    </button>

                                    <div className="w-8 text-center">{item.qty}</div>

                                    <button
                                        type="button"
                                        className="px-2 py-1 border rounded"
                                        aria-label={`increase ${item.name}`}
                                        onClick={() => updatedItem(item.id, item.qty + 1)}

                                    >
                                        +
                                    </button>

                                    <button onClick={() => removeItem(item.id)} type="button" className="ml-3 text-sm text-red-600">
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-4">
                <div className="flex gap-2">
                    <input
                        onChange={(e) => setCoupon(e.target.value)}
                        value={coupon}
                        placeholder="Coupon e.g. SAVE10"
                        className="flex-1 p-2 border rounded"
                    />
                    <button onClick={applyCoupon} type="button" className="px-3 py-2 bg-indigo-600 text-white rounded">
                        Apply
                    </button>
                </div>

                <div className="mt-2 text-sm">
                    {appliedCoupon === "SAVE10" && <span className="text-green-600">Coupon applied: 10% off</span>}
                    {appliedCoupon === "INVALID" && <span className="text-red-600">Invalid coupon</span>}
                </div>
            </div>

            <div className="mt-4 border-t pt-3 text-sm space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between"><span>Discount</span><span>-₹{discount}</span></div>
                <div className="flex justify-between font-semibold"><span>Total</span><span>₹{total}</span></div>
            </div>

            <div className="mt-4 flex gap-2">
                <button type="button" className="flex-1 border rounded px-3 py-2">Clear</button>
                <button type="button" className="flex-1 bg-green-600 text-white rounded px-3 py-2" onClick={() => toast.success(`Checkout ₹${total}`)} disabled={cart.length === 0}>
                    Checkout
                </button>
            </div>
        </div>
    );
}
