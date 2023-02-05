import { useEffect, useState } from "react";
import axios from "axios";
import { Usecart, UsecartActions } from "../Context/ProviderContext";
import {Link} from "react-router-dom"

const Cartpage = () => {
  const carts = Usecart();
  const dispatch = UsecartActions();

  return (
    <div className="carts">
      {carts.cart.map((cart) => {
        return (
          <div className="cart" key={cart._id}>
            <img src={cart.image} className="cartimg" />
            <span>{cart.name}</span>
            <span>{cart.quantity}</span>
            <button
              onClick={() => dispatch({ type: "increment", id: cart._id })}
            >
              increment
            </button>
            <span>{cart.quantity * cart.price}</span>
            <button onClick={() => dispatch({ type: "remove", id: cart._id })}>
              delete
            </button>
          </div>
        );
      })}
      <div>
        <p>total price is : {carts.total} $</p>
        <Link to={{pathname : "/login" , search : "checkout" }}>
          <button>go to check out</button>
        </Link>
      </div>
    </div>
  );
};

export default Cartpage;
