/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react";

const cartDrawerContext = createContext();

export const CartDrawerProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
    console.log(isCartOpen);
  };
  const closeCartDrawer = () => {
    setIsCartOpen(false);
    console.log(isCartOpen);
  };
  const openCartDrawer = () => {
    setIsCartOpen(true);
    console.log(isCartOpen);
  };

  return (
    <cartDrawerContext.Provider
      value={{ isCartOpen, toggleCartDrawer, openCartDrawer, closeCartDrawer }}
    >
      {children}
    </cartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => {
  return useContext(cartDrawerContext);
};
