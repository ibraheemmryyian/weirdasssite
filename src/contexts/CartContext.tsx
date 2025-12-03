import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface CartState {
  items: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; size: string }
  | { type: 'REMOVE_FROM_CART'; id: string; size: string }
  | { type: 'UPDATE_QUANTITY'; id: string; size: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; product: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; id: string }
  | { type: 'TOGGLE_CART' }
  | { type: 'TOGGLE_WISHLIST' }
  | { type: 'CLOSE_MODALS' };

const initialState: CartState = {
  items: [],
  wishlist: [],
  isCartOpen: false,
  isWishlistOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size } = action;
      const cartItemId = `${product.name}-${size}`;

      const existingItem = state.items.find(
        item => item.name === product.name && item.size === size
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.name === product.name && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1, size }],
      };
    }

    case 'REMOVE_FROM_CART': {
      const { id, size } = action;
      return {
        ...state,
        items: state.items.filter(item => !(item.name === id && item.size === size)),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, size, quantity } = action;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => !(item.name === id && item.size === size)),
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.name === id && item.size === size
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'ADD_TO_WISHLIST': {
      const existingItem = state.wishlist.find(item => item.name === action.product.name);
      if (existingItem) return state;

      return {
        ...state,
        wishlist: [...state.wishlist, action.product],
      };
    }

    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.name !== action.id),
      };
    }

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
        isWishlistOpen: false,
      };

    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        isWishlistOpen: !state.isWishlistOpen,
        isCartOpen: false,
      };

    case 'CLOSE_MODALS':
      return {
        ...state,
        isCartOpen: false,
        isWishlistOpen: false,
      };

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  toggleCart: () => void;
  toggleWishlist: () => void;
  closeModals: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getWishlistCount: () => number;
  isInWishlist: (productName: string) => boolean;
  isInCart: (productName: string, size: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product, size: string) => {
    dispatch({ type: 'ADD_TO_CART', product, size });
  };

  const removeFromCart = (id: string, size: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', id, size });
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, size, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', product });
  };

  const removeFromWishlist = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', id });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const toggleWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST' });
  };

  const closeModals = () => {
    dispatch({ type: 'CLOSE_MODALS' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getWishlistCount = () => {
    return state.wishlist.length;
  };

  const isInWishlist = (productName: string) => {
    return state.wishlist.some(item => item.name === productName);
  };

  const isInCart = (productName: string, size: string) => {
    return state.items.some(item => item.name === productName && item.size === size);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleCart,
        toggleWishlist,
        closeModals,
        getCartTotal,
        getCartItemCount,
        getWishlistCount,
        isInWishlist,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
