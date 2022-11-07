import { useState, useMemo, useCallback } from "react";
import { Button, ButtonGroup, Card, Carousel, CarouselItem, Col, Container, Image, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { ItemInCartModel } from "../../Models/item-in-cart-model";
import ProductModel from "../../Models/Product-Model";
import { removeItemFromGuestCartAction } from "../../Redux/GuestState";
import { authStore, guestStore, shoppingCartStore } from "../../Redux/Store";
import notifyService from "../../Services/NotifyService";
import productsServices from "../../Services/Products-Services";
import shoppingCartServices from "../../Services/ShoppingCartServices";

const OneProduct = () => {
      const params = useParams();
      const [product, setProduct] = useState<ProductModel>();
      const [stock, setStock] = useState(1);
      const [inCart, setInCart] = useState<boolean>(false);


      useMemo(async () => {
            const productId = params.productId;
            const product = await productsServices.getOneProduct(productId);
            setProduct(product);
      }, [params.productId]);


      const check = useCallback((items: ItemInCartModel[]) => {
            if (items?.find(i => i.productId === product?.productId)) {
                  setInCart(true);
            } else {
                  setInCart(false);
            }
      }, [product])

      useMemo(() => {
            if (authStore.getState().user) {
                  const items = shoppingCartStore.getState().itemsInCart;
                  check(items);
            } else {
                  const items = guestStore.getState().itemsInGuestCart;
                  check(items);
            }

            const userSubscribe = shoppingCartStore.subscribe(() => {
                  const items = shoppingCartStore.getState().itemsInCart;
                  check(items);
            })
            const guestSubscribe = guestStore.subscribe(() => {
                  const items = guestStore.getState().itemsInGuestCart;
                  check(items);
            })

            return () => {
                  userSubscribe();
                  guestSubscribe();
            }
      }, [check]);


      const plus = () => {
            setStock(stock + 1);
      };
      const minus = () => {
            if (stock === 1) {
                  return;
            } else {
                  setStock(stock - 1);
            }
      };

      const addToCart = async () => {
            const itemToAdd = new ItemInCartModel();
            itemToAdd.productId = product?.productId;
            itemToAdd.stock = stock;
            itemToAdd.totalPrice = stock * product?.productPrice;
            itemToAdd.userCartId = shoppingCartStore.getState().shoppingCart?.userCartId;

            try {
                  await shoppingCartServices.addItemIntoCart(itemToAdd);
                  notifyService.success("Added successfully...")
            } catch (err: any) {
                  notifyService.error(err);
            }
      }

      const removeFromCart = async () => {
            if (authStore.getState().user) {
                  try {
                        await shoppingCartServices.deleteItemFromCart(product?.productId, shoppingCartStore
                              .getState().shoppingCart.userCartId);
                  } catch (err: any) {
                        notifyService.error(err.message);
                  }
            } else {
                  guestStore.dispatch(removeItemFromGuestCartAction(product?.productId));
                  notifyService.error('Removed from cart');
                  setInCart(false)
            }
      }

      const test = () => {

      }
      return (
            <Container className="mt-3">
                  <Row>
                        <Col md='6' sm='12' xs='12' xxs='12' >
                              <Card className="text-center m-auto">
                                    <Card.Header>
                                          <Card.Title>
                                                {product?.productName}
                                          </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                          <Card.Text>
                                                {product?.productDescription}
                                          </Card.Text>

                                          <Row >
                                                <ButtonGroup className="w-50 m-auto" onChange={test}>

                                                      <Button onClick={plus}>
                                                            +
                                                      </Button>

                                                      <Button as="div" variant="light" disabled>
                                                            {stock}
                                                      </Button>

                                                      <Button onClick={minus}>
                                                            -
                                                      </Button>
                                                </ButtonGroup>
                                          </Row>
                                    </Card.Body>
                                    <Card.Footer>
                                          {!inCart &&
                                                <Button className="w-100 m-1" onClick={addToCart}>Add To Cart</Button>
                                          }
                                          {inCart &&
                                                <Button className="w-100 m-1" variant="danger" onClick={removeFromCart}>Remove From Cart</Button>

                                          }

                                          <Button className="w-100 m-1" variant="dark">Buy Now</Button>
                                    </Card.Footer>
                              </Card>
                        </Col>
                        <Col md='6' sm='12' xs='12' xxs='12'>
                              <Carousel variant="dark">
                                    <CarouselItem>
                                          <Image src={product?.productImage} alt='' width='350px' height='350px' />
                                          <Carousel.Caption>
                                                <h5>First Image</h5>
                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                          </Carousel.Caption>
                                    </CarouselItem>
                                    <CarouselItem>
                                          <Image src={product?.productImage} alt='' width='350px' height='350px' />
                                          <Carousel.Caption>
                                                <h5>Seconde Image</h5>
                                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                          </Carousel.Caption>
                                    </CarouselItem>
                              </Carousel>
                        </Col>
                  </Row>
            </Container>
      )
}

export default OneProduct;