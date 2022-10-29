import { useEffect, useState, useCallback } from "react";
import { Badge, Button, Card, Col, Placeholder, Row } from "react-bootstrap"
import { numberWithCommas } from "../..";
import { ItemInCartModel } from "../../Models/item-in-cart-model"
import ProductModel from "../../Models/Product-Model";
import { ShoppingCartModel } from "../../Models/shopping-cart-model";
import UserModel from "../../Models/user-model";
import notifyService from "../../Services/NotifyService";
import productsServices from "../../Services/Products-Services";
import shoppingCartServices from "../../Services/ShoppingCartServices";
import { BsTrashFill } from "react-icons/bs"
import { shoppingCartStore } from "../../Redux/Store";

interface SideNavItemProps {
      item: ItemInCartModel;
}

const SideNavItem = (props: SideNavItemProps) => {

      const [product, setProduct] = useState<ProductModel>();

      const getProduct = useCallback(async () => {
            const product = await productsServices.getOneProduct(props.item.productId);
            setProduct(product);
      }, [props.item.productId]);

      useEffect(() => {
            getProduct();
      }, [])

      const deleteItem = (async () => {
            const answer = window.confirm("Are you sure?");
            if (answer) {
                  try {
                        await shoppingCartServices.deleteItemFromCart(props.item.productId, shoppingCartStore.getState().shoppingCart.userCartId);

                        notifyService.error("Removed from cart...")
                  } catch (err: any) {
                        notifyService.error(err);
                  }
            }
      });

      return (
            <Card>
                  {product &&
                        <>
                              <Card.Header>
                                    <Row>
                                          {props.item.stock > 1 &&
                                                <>
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
                                                </>
                                          }
                                          {props.item.stock === 1 &&
                                                <>
                                                      <Col xxs='10'>
                                                            <Card.Title style={{ width: 'auto', overflow: "hidden", height: "25px" }}>
                                                                  {product?.productName}
                                                            </Card.Title>
                                                      </Col>
                                                      <Col xxs='2'>

                                                            <Button variant="outline-danger" size="sm" style={{ position: 'static', float: 'right', top: '0', right: '0' }} onClick={deleteItem}>
                                                                  <BsTrashFill />
                                                            </Button>
                                                      </Col>
                                                </>
                                          }

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
                        </>
                  }

                  {product === undefined &&
                        <>
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
                        </>
                  }
            </Card>
      )
}
export default SideNavItem