import { ItemInCartModel } from "../Models/item-in-cart-model";
import { ShoppingCartModel } from "../Models/shopping-cart-model";

export class ShoppingCartState {
      public shoppingCart: ShoppingCartModel = null;
      public itemsInCart: ItemInCartModel[] = [];

      constructor() {
            const shoppingCart = localStorage.getItem("shoppingCart");
            if (shoppingCart) {
                  this.shoppingCart = JSON.parse(shoppingCart);

                  const itemsInCart = localStorage.getItem("itemsInCart");
                  if (itemsInCart) {
                        this.itemsInCart = JSON.parse(itemsInCart);
                  }
            }
      }
}
export enum ShoppingCartActionType {
      FetchShoppingCart = "FetchShoppingCart",
      FetchItemsInCart = "FetchItemsInCart",
      AddItemIntoCart = "AddItemIntoCart",
      DeleteFromCart = "DeleteFromCart",
      Logout = "Logout"
}
export interface ShoppingCartAction {
      type: ShoppingCartActionType;
      payload?: any;
}

export function fetchUserCartAction(shoppingCart: ShoppingCartModel): ShoppingCartAction {
      return { type: ShoppingCartActionType.FetchShoppingCart, payload: shoppingCart };
}
export function fetchAllItemsFromCart(itemsInCart: ItemInCartModel[]): ShoppingCartAction {
      return { type: ShoppingCartActionType.FetchItemsInCart, payload: itemsInCart };
}
export function addItemIntoCartAction(itemToAdd: ItemInCartModel): ShoppingCartAction {
      return { type: ShoppingCartActionType.AddItemIntoCart, payload: itemToAdd };
}
export function deleteItemFromCartAction(itemIdToDelete: string): ShoppingCartAction {
      return { type: ShoppingCartActionType.DeleteFromCart, payload: itemIdToDelete };
}
export function logoutShoppingCartAction(): ShoppingCartAction {
      return { type: ShoppingCartActionType.Logout };
}

export function shoppingCartReducer(currentShoppingCartState: ShoppingCartState = new ShoppingCartState(), action: ShoppingCartAction): ShoppingCartState {

      const newCartState = { ...currentShoppingCartState };

      switch (action.type) {
            case ShoppingCartActionType.FetchShoppingCart:
                  newCartState.shoppingCart = action.payload;
                  localStorage.setItem("shoppingCart", JSON.stringify(newCartState.shoppingCart));
                  break;

            case ShoppingCartActionType.FetchItemsInCart:
                  newCartState.itemsInCart = action.payload;
                  localStorage.setItem("itemsInCart", JSON.stringify(newCartState.itemsInCart));
                  break;

            case ShoppingCartActionType.AddItemIntoCart:
                  if (newCartState.itemsInCart?.find(i => i.productId === action.payload.productId)) {
                        const newList = newCartState.itemsInCart.filter(i => i.productId !== action.payload.productId);
                        newList.push(action.payload);
                        newCartState.itemsInCart = newList;
                        localStorage.setItem("itemsInCart", JSON.stringify(newCartState.itemsInCart));
                        break;
                  }
                  newCartState.itemsInCart.push(action.payload);
                  localStorage.setItem("itemsInCart", JSON.stringify(newCartState.itemsInCart));
                  break;

            case ShoppingCartActionType.DeleteFromCart:
                  const newList = newCartState.itemsInCart.filter(i => i.productId !== action.payload);
                  newCartState.itemsInCart = newList;
                  localStorage.setItem("itemsInCart", JSON.stringify(newCartState.itemsInCart));
                  break;

            case ShoppingCartActionType.Logout:
                  newCartState.shoppingCart = null;
                  newCartState.itemsInCart = [];
                  localStorage.removeItem("shoppingCart");
                  localStorage.removeItem("itemsInCart");
                  break;
      }

      return newCartState;

}