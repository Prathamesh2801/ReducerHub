import { useReducer } from "react";
import toast from "react-hot-toast";

const SAMPLE_ITEMS = [
  { id: 1, name: "Apple", price: 10 },
  { id: 2, name: "Banana", price: 5 },
  { id: 3, name: "Orange", price: 12 },
];

// const emptyCart = [];
// const sampleCart = [
//   { id: 1, name: "Apple", price: 10, qty: 2 },
//   { id: 2, name: "Banana", price: 5, qty: 1 },
// ];

// const cart = emptyCart;
// const appliedCoupon = null;
// const coupon = "";

const initialValue = {
  cart: [],
  coupon: '',
  appliedCoupon: null
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.cart.find((p) => p.id === action.item.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((p) => (p.id === action.item.id ? { ...p, qty: p.qty + 1 } : p))
        }
      }
      return { ...state, cart: [...state.cart, { ...action.item, qty: 1 }] }
    }
    case "REMOVE_ITEM": {
      return { ...state, cart: state.cart.filter((p) => p.id !== action.id) }
    }
    case "UPDATE_ITEM": {
      // if (action.qty <= 0) {
      //   return { ...state, cart: state.cart.filter((p) => p.id !== action.id) }
      // }
      return {
        ...state,
        cart: state.cart.map((p) => (p.id === action.id ? { ...p, qty: action.qty } : p))
          .filter((p) => p.qty > 0)
      }
    }
    case "CLEAR_CART": {
      return { ...state, cart: [], coupon: '', appliedCoupon: null }
    }
    case "SET_COUPON": {
      return { ...state, coupon: action.coupon }
    }
    case "APPLY_COUPON":
      if (state.coupon.trim().toUpperCase() === "SAVE10") {
        return { ...state, appliedCoupon: "SAVE10", coupon: '' }
      }
      return { ...state, appliedCoupon: "INVALID", coupon: '' }

    case "CLEAR_INVALID_FLAG":
      return { ...state, appliedCoupon: null }

    case "CHECKOUT":
      return {}
    default:
      return state
  }

}

export default function Prac2_R() {

  const [state, dispatch] = useReducer(reducer, initialValue)

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', item })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id })
  const updateItem = (id, qty) => dispatch({ type: 'UPDATE_ITEM', id, qty })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const applyCoupon = () => {
    dispatch({ type: "APPLY_COUPON" })
    if (state.coupon.trim().toUpperCase() !== "SAVE10") {
      setTimeout(() => dispatch({ type: "CLEAR_INVALID_FLAG" }), 1200)
    }
  }



  const subtotal = state.cart.reduce((s, it) => s + it.price * it.qty, 0)
  const discount = state.appliedCoupon === "SAVE10" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  return (
    <div className="bg-white mx-auto mt-20 shadow rounded-2xl p-4 w-full md:w-[480px]">
      <h3 className="text-lg font-semibold mb-3">🛒 Cart (UI-only) using useReducer</h3>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {SAMPLE_ITEMS.map((it) => (
          <button
            key={it.id}
            onClick={() => addItem(it)}
            className="col-span-1 bg-indigo-50 hover:bg-indigo-100 border rounded p-2 text-sm flex flex-col items-start"
            type="button"
          >
            <span className="font-medium">{it.name}</span>
            <small className="text-xs text-gray-600">₹{it.price}</small>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {state.cart.length === 0 ? (
          <div className="text-sm text-gray-500">Cart is empty. Add items above.</div>
        ) : (
          <ul className="divide-y">
            {state.cart.map((item) => (
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
                    onClick={() => updateItem(item.id, item.qty - 1)}
                  >
                    −
                  </button>
                  <div className="w-8 text-center">{item.qty}</div>
                  <button
                    type="button"
                    className="px-2 py-1 border rounded"
                    aria-label={`increase ${item.name}`}
                    onClick={() => updateItem(item.id, item.qty + 1)}

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
            value={state.coupon}
            onChange={(e) => dispatch({ type: 'SET_COUPON', coupon: e.target.value })}
            placeholder="Coupon e.g. SAVE10"
            className="flex-1 p-2 border rounded"

          />
          <button onClick={applyCoupon} type="button" className="px-3 py-2 bg-indigo-600 text-white rounded">
            Apply
          </button>
        </div>
        <div className="mt-2 text-sm">
          {state.appliedCoupon === "SAVE10" && (
            <span className="text-green-600">Coupon applied: 10% off</span>
          )}
          {state.appliedCoupon === "INVALID" && (
            <span className="text-red-600">Invalid coupon</span>
          )}
        </div>
      </div>

      <div className="mt-4 border-t pt-3 text-sm space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={clearCart} type="button" className="flex-1 border rounded px-3 py-2">
          Clear
        </button>
        <button
          type="button"
          className="flex-1 bg-green-600 text-white rounded px-3 py-2"
          disabled={state.cart.length === 0}
          onClick={() => toast.success(`Checkout : ₹${total}`)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
