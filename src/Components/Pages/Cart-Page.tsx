import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { ItemInCartModel } from "../../Models/item-in-cart-model";
import { ShoppingCartModel } from "../../Models/shopping-cart-model";
import UserModel from "../../Models/user-model"
import { authStore, guestStore, shoppingCartStore } from "../../Redux/Store";
import ItemInCart from "../Products-Area/Item-In-Cart";

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
            } else if (localStorage.getItem('itemsInGuestCart')) {
                  const itemsInGuestCart = JSON.parse(localStorage.getItem('itemsInGuestCart'));

                  setItemsInCart(itemsInGuestCart);
            }

            const unsubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });
            const unsubscribeMeToo = shoppingCartStore.subscribe(() => {
                  setItemsInCart(shoppingCartStore.getState().itemsInCart);
                  setShoppingCart(shoppingCartStore.getState().shoppingCart);
            });
            const guestSubscribe = guestStore.subscribe(() => {
                  setItemsInCart(guestStore.getState().itemsInGuestCart);
            })

            return () => {
                  unsubscribe()
                  unsubscribeMeToo();
                  guestSubscribe();
            }
      }, [user]);

      return (
            <Container>
                  <h3>
                        Cart-Page
                  </h3>
                  {itemsInCart?.length === 0 &&
                        <p>No Items yet</p>
                  }

                  <Row>
                        <Col sm="6">

                              {itemsInCart?.map(i =>
                                    <ItemInCart item={i} key={i.productId} />
                              )}
                        </Col>
                        <Col sm="6"></Col>
                  </Row>
            </Container>
      )
}