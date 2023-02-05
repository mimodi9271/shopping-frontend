import { createContext, useContext, useReducer, useState } from "react";

const Cartprovider = createContext();
const Cartproviderdispatcher = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "add_to_cart":
      const clonecart = [...state.cart];
      const index = state.cart.findIndex(
        (item) => item._id == action.payload._id
      );
      if (index >= 0) {
        const updateditem = clonecart[index];
        updateditem.quantity++;
        return { ...state, cart: clonecart , total : state.total + action.payload.price };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
          total : state.total + action.payload.price
        };
      }
    case "remove": {
      const clone = [...state.cart];
      const indexxx = clone.findIndex((item) => item._id == action._id);
      const selected = clone[indexxx];
      if (selected.quantity == 1) {
        const filteritems = state.cart.filter((item) => item._id !== action._id);
        return { ...state, cart: filteritems , total : state.total - selected.price };
      }else{
        selected.quantity--;
        return { ...state, cart: clone , total : state.total - selected.price };
      }
    }
    case "increment":
      const clone = [...state.cart];
      const indexxx = clone.findIndex((item) => item._id == action._id);
      const selected = clone[indexxx];
      selected.quantity++;
      return { ...state, cart: clone , total : state.total + selected.price };
    default:
      return state;
  }
};

const initialstate = {
  cart: [],
  total: 0,
};

const ProviderContext = ({ children }) => {
  const [carts, dispatch] = useReducer(reducer, initialstate);

  return (
    <Cartprovider.Provider value={carts}>
      <Cartproviderdispatcher.Provider value={dispatch}>
        {children}
      </Cartproviderdispatcher.Provider>
    </Cartprovider.Provider>
  );
};

export default ProviderContext;

export const Usecart = () => useContext(Cartprovider);

export const UsecartActions = () => useContext(Cartproviderdispatcher);
