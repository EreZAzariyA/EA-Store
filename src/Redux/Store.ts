import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { ProductReducer } from "./Products-state";
import { shoppingCartReducer } from "./ShoppingCartState";

export const authStore = createStore(authReducer);
export const productsStore = createStore(ProductReducer);
export const shoppingCartStore = createStore(shoppingCartReducer);
