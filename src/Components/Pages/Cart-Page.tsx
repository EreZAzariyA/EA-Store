import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { ItemInCartModel } from "../../Models/item-in-cart-model";
import { ShoppingCartModel } from "../../Models/shopping-cart-model";
import UserModel from "../../Models/user-model"
import { authStore, shoppingCartStore } from "../../Redux/Store";
import shoppingCartServices from "../../Services/ShoppingCartServices";
import ProductCard from "../Products-Area/Product-Card";
import SideNavItem from "../Products-Area/SideNavItem";

export const CartPage = () => {

      const [user, setUser] = useState<UserModel>();
      const [shoppingCart, setShoppingCart] = useState<ShoppingCartModel>();
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();

      // const getShoppingCartByUserId = useCallback(async (userId: string) => {
      //       const shoppingCart = await shoppingCartServices.getUserCartByUserId(userId);
      //       setShoppingCart(shoppingCart);
      // }, []);

      // const getItemsFromCart = useCallback(async (userId: string) => {
      //       const itemsInCart = await shoppingCartServices.getAllItemsFromUserCartByUserId(userId);
      //       setItemsInCart(itemsInCart);
      // }, []);

      useEffect(() => {
            const user = authStore.getState().user;
            setUser(user);
            if (user) {
                  // getShoppingCartByUserId(user?.userId);
                  // getItemsFromCart(user?.userId);
                  setItemsInCart(shoppingCartStore.getState().itemsInCart);
                  setShoppingCart(shoppingCartStore.getState().shoppingCart);
            }

            const unsubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });
            const unsubscribeMeToo = shoppingCartStore.subscribe(() => {
                  setItemsInCart(shoppingCartStore.getState().itemsInCart);
                  setShoppingCart(shoppingCartStore.getState().shoppingCart);
            })

            return () => {
                  unsubscribe()
                  unsubscribeMeToo();
            }
      });

      return (
            <Container>
                  Cart-Page
                  {itemsInCart?.map(i =>
                        <SideNavItem item={i} key={i.productId} />
                  )}
            </Container>
      )
}