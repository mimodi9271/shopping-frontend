import axios from "axios";
import { useState } from "react";
import { Usecart, UsecartActions } from "../Context/ProviderContext";
import { toast } from 'react-toastify';

function checkcart(cart, product) {
    return cart.find(item => item._id == product._id)
}

const Product = ({ pro }) => {
  const carts = Usecart();
  const dispatch = UsecartActions();

  const Addhandler = (pro) => {
    toast.success(`${pro.name} added to cart`)
    dispatch({ type: "add_to_cart", payload: pro });
  };
  return (
    <div className="pro">
      <img src={pro.image} />
      <span>{pro.name}</span>
      <button onClick={() => Addhandler(pro)}>{checkcart(carts.cart , pro) ? "In cart" : "Add to cart"}</button>
    </div>
  );
};

export default Product;
