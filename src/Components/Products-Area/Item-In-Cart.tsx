import { useEffect, useState, useCallback } from "react";
import { Badge, Button, Card, Col, Placeholder, Row } from "react-bootstrap"
import { numberWithCommas } from "../..";
import { ItemInCartModel } from "../../Models/item-in-cart-model"
import ProductModel from "../../Models/Product-Model";
import notifyService from "../../Services/NotifyService";
import productsServices from "../../Services/Products-Services";
import shoppingCartServices from "../../Services/ShoppingCartServices";
import { BsTrashFill } from "react-icons/bs"
import { authStore, guestStore, shoppingCartStore } from "../../Redux/Store";
import { removeItemFromGuestCartAction } from "../../Redux/GuestState";

interface ItemInCartProps {
      item: ItemInCartModel;
}

const ItemInCart = (props: ItemInCartProps) => {

      const [product, setProduct] = useState<ProductModel>();

      const getProduct = useCallback(async () => {
            const product = await productsServices.getOneProduct(props.item.productId);
            setProduct(product);
      }, [props.item.productId]);

      useEffect(() => {
            getProduct();
      })

      const deleteItem = (async () => {
            const answer = window.confirm("Are you sure?");
            if (answer) {
                  try {
                        if (authStore.getState().user) {
                              await shoppingCartServices.deleteItemFromCart(props.item.productId, shoppingCartStore.getState().shoppingCart.userCartId);

                              notifyService.error("Removed from cart...");
                        } else {
                              guestStore.dispatch(removeItemFromGuestCartAction(props.item.productId));
                        }
                  } catch (err: any) {
                        notifyService.error(err);
                  }
            }
      });

      return (
            <>
                  {product &&
                        <Card style={{ width: '25rem' }} className="d-inline-block">
                              <Card.Header>
                                    <Row>
                                          <Col xxs='2'>
                                                <Badge bg='danger'>
                                                      {props.item.stock}
                                                </Badge>
                                          </Col>
                                          <Col xxs='8'>
                                                <Card.Title style={{ width: 'auto', overflow: "hidden", height: "25px" }}>
                                                      {product?.productName}
                                                </Card.Title>
                                          </Col>
                                          <Col xxs='2'>

                                                <Button variant="outline-danger" size="sm" style={{ position: 'static', float: 'right', top: '0', right: '0' }} onClick={deleteItem}>
                                                      <BsTrashFill />
                                                </Button>
                                          </Col>

                                    </Row>
                              </Card.Header>

                              <Card.Body>
                                    <Row>
                                          <Col xxs='6'>
                                                <Card.Img src={product?.productImage} style={{ height: '100%', width: '100%' }} />
                                          </Col>
                                          <Col xxs='6'>
                                                <p>{product?.productName}</p>

                                                <p>Price: {numberWithCommas(product?.productPrice) + '$'}</p>
                                          </Col>
                                    </Row>
                              </Card.Body>
                        </Card>
                  }

                  {product === undefined &&
                        <Card style={{ width: '25rem' }}>
                              <Card.Header>
                                    <Placeholder as={Card.Title} animation="wave">
                                          <Placeholder xxs={7} />
                                    </Placeholder>
                              </Card.Header>
                              <Card.Body>
                                    <Row>
                                          <Col xxs='6'>
                                                <Placeholder>
                                                      <svg width="100" height="100">
                                                      </svg>
                                                </Placeholder>
                                          </Col>

                                          <Col xxs='6'>
                                                <Placeholder as={Col} animation="wave">
                                                      <Placeholder xxs={7} />
                                                      <Placeholder xxs={9} />
                                                </Placeholder>
                                          </Col>
                                    </Row>
                              </Card.Body>
                        </Card>
                  }
            </>
      )
}
export default ItemInCart