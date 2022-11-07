import { useState, useEffect, useCallback } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap"
import { ItemInCartModel } from "../../Models/item-in-cart-model";
import ProductModel from "../../Models/Product-Model";
import { shoppingCartStore } from "../../Redux/Store";
import notifyService from "../../Services/NotifyService";
import shoppingCartServices from "../../Services/ShoppingCartServices";

interface MyModalProps {
      product: ProductModel;
      close: any
}

const MyModal = (props: MyModalProps) => {
      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
      const [item, setItem] = useState<ItemInCartModel>();
      const [stock, setStock] = useState(1);

      const getItem = useCallback((productId: string) => {
            const item = itemsInCart?.find(i => i.productId === productId);
            setItem(item);
      }, [itemsInCart]);

      useEffect(() => {
            setItemsInCart(shoppingCartStore.getState().itemsInCart);
            getItem(props.product.productId);
            if (item?.stock) {
                  setStock(item?.stock)
            }

            const unsubscribe = shoppingCartStore.subscribe(() => {
                  setItemsInCart(shoppingCartStore.getState().itemsInCart);
            });

            return () => unsubscribe();
      },[getItem,item?.stock,props.product.productId]);

      const handleClose = () => {
            props.close();
      }
      const saveChanges = async () => {
            const itemToAdd = new ItemInCartModel();
            itemToAdd.productId = props.product.productId;
            itemToAdd.stock = stock;
            itemToAdd.totalPrice = stock * props.product.productPrice;
            itemToAdd.userCartId = shoppingCartStore.getState().shoppingCart?.userCartId;

            try {
                  await shoppingCartServices.addItemIntoCart(itemToAdd);
                  notifyService.success("Added successfully...")
            } catch (err: any) {
                  notifyService.error(err);
            }
            props.close();
      }


      const plus = () => {
            setStock(stock + 1)
      }
      const minus = () => {
            if (stock === 1) {
                  return;
            }
            setStock(stock - 1)
      }

      return (
            <>
                  <Modal.Header closeButton>
                        <Modal.Title>
                              {props.product.productName}
                        </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <p>Set stock to order</p>

                        <ButtonGroup style={{ marginRight: '10px' }}>
                              <Button variant="success" onClick={plus}>+</Button>
                              <h3>{stock}</h3>
                              <Button variant="danger" onClick={minus}>-</Button>
                        </ButtonGroup>
                  </Modal.Body>

                  <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                              Close
                        </Button>

                        <Button variant="primary" onClick={saveChanges}>
                              Save changes
                        </Button>
                  </Modal.Footer>
            </>
      )
}

export default MyModal;