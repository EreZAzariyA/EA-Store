import { useCallback, useState, useEffect } from "react";
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


      const getProductByParams = useCallback(async () => {
            const productId = params.productId;
            const product = await productsServices.getOneProduct(productId);
            setProduct(product);
      }, [params.productId]);


      const checkItem = useCallback(async (productIdToCheck: string) => {

            if (authStore.getState().user) {
                  const itemsInUserCart = shoppingCartStore.getState().itemsInCart;
                  if (itemsInUserCart.find(item => item?.productId === productIdToCheck)) {
                        setInCart(true)
                  } else {
                        setInCart(false);
                  }
            } else if (guestStore.getState().itemsInGuestCart.length > 0) {
                  const itemsInGuestCart = guestStore.getState().itemsInGuestCart;
                  if (itemsInGuestCart.find(item => item?.productId === productIdToCheck)) {
                        setInCart(true)
                  } else {
                        setInCart(false);
                  }
            }

      }, [product?.productId]);

      useEffect(() => {
            getProductByParams();
            checkItem(product?.productId);


            const userSubscribe = shoppingCartStore.subscribe(() => {
                  checkItem(product?.productId);
            })
            const guestSubscribe = guestStore.subscribe(() => {
                  checkItem(product?.productId);
            })

            return () => {
                  userSubscribe();
                  guestSubscribe();
            }
      });


      const plus = () => {
            setStock(stock + 1);
      };
      const minus = () => {
            if (stock === 0) {
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