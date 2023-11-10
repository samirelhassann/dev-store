/* eslint-disable react/jsx-no-constructed-context-values */

"use client";

import { createContext, useContext, useState } from "react";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
}

const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (productId: number) => {
    setItems((state) => {
      const itemIndex = state.findIndex((item) => item.productId === productId);

      if (itemIndex === -1) {
        return [...state, { productId, quantity: 1 }];
      }

      const newState = [...state];
      newState[itemIndex].quantity += 1;

      return newState;
    });
  };

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
