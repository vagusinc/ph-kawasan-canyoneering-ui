import { TCartItem } from "~/types/CartItem";

export const CART_ITEMS_KEY = "phkc_cart_items";
export const CUSTOMER_RESERVATION_FORM_KEY = "phkc_customer_reservation_form";

export const getCartItems = () => {
  const cartItemsString = localStorage.getItem(CART_ITEMS_KEY);
  if (!cartItemsString) return [];

  return JSON.parse(cartItemsString) as TCartItem[];
};

export const addCartItem = (newCartItem: TCartItem) => {
  const cartItems = getCartItems();
  cartItems.push(newCartItem);

  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));
};

export const removeCartItem = (index: number) => {
  const cartItems = getCartItems();
  const newCartItems = cartItems.filter(
    (item, itemIndex) => itemIndex !== index
  );

  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(newCartItems));
};

export const updateCartItem = (newCartItem: TCartItem, index: number) => {
  const cartItems = getCartItems();
  cartItems[index] = newCartItem;

  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));
};
