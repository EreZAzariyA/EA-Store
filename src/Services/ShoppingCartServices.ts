import axios from "axios";
import { ItemInCartModel } from "../Models/item-in-cart-model";
import { ShoppingCartModel } from "../Models/shopping-cart-model";
import { fetchUserCartAction, fetchAllItemsFromCart, addItemIntoCartAction, deleteItemFromCartAction } from "../Redux/ShoppingCartState";
import { shoppingCartStore } from "../Redux/Store";
import config from "../Utils/Config";

class CartServices {

      async createNewShoppingCart(userId: string): Promise<ShoppingCartModel> {
            const response = await axios.post<ShoppingCartModel>(config.urls.shoppingCart.post.createNewShoppingCartUrl + userId);
            const shoppingCart = response.data;
            shoppingCartStore.dispatch(fetchUserCartAction(shoppingCart));
            return shoppingCart;
      }

      async getUserCartByUserId(userId: string): Promise<ShoppingCartModel> {
            if (!shoppingCartStore.getState().shoppingCart) {
                  const response = await axios.get<ShoppingCartModel>(config.urls.shoppingCart.get.userCartByUserIdUrl + userId);
                  const userCart = response.data;
                  shoppingCartStore.dispatch(fetchUserCartAction(userCart));
                  return userCart;
            } else {
                  const shoppingCart = shoppingCartStore.getState().shoppingCart;
                  return shoppingCart;
            }
      };

      async getAllItemsFromUserCartByUserId(userId: string): Promise<ItemInCartModel[]> {
            if (shoppingCartStore.getState().itemsInCart?.length === 0) {
                  const response = await axios.get<ItemInCartModel[]>(config.urls.shoppingCart.get.allItemsInCartByUserIdUrl + userId);
                  const items = response.data;
                  shoppingCartStore.dispatch(fetchAllItemsFromCart(items));
                  return items;
            }
            const items = shoppingCartStore.getState().itemsInCart
            return items;
      };

      async addItemIntoCart(itemToAdd: ItemInCartModel): Promise<void> {
            await axios.post<ItemInCartModel>(config.urls.shoppingCart.post.addItemIntoCartUrl, itemToAdd);
            shoppingCartStore.dispatch(addItemIntoCartAction(itemToAdd));
      }

      async deleteItemFromCart(itemIdToDelete: string, userCartId: string): Promise<void> {
            await axios.delete<ItemInCartModel>(config.urls.shoppingCart.delete.deleteItemFromCartUrl + itemIdToDelete + "/" + userCartId);
            shoppingCartStore.dispatch(deleteItemFromCartAction(itemIdToDelete));
      }

}
const shoppingCartServices = new CartServices();
export default shoppingCartServices;