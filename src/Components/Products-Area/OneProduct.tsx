import { useCallback, useState, useEffect } from "react";
import { Button, ButtonGroup, Card, Carousel, CarouselItem, Col, Container, Image, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { ItemInCartModel } from "../../Models/item-in-cart-model";
import ProductModel from "../../Models/Product-Model";
import { authStore, shoppingCartStore } from "../../Redux/Store";
import notifyService from "../../Services/NotifyService";
import productsServices from "../../Services/Products-Services";
import shoppingCartServices from "../../Services/ShoppingCartServices";
import ItemInCart from "./Item-In-Cart";

const OneProduct = () => {
      const params = useParams();
      const [product, setProduct] = useState<ProductModel>();
      const [stock, setStock] = useState(1);
      const [inCart, setInCart] = useState<boolean>(false);

      const checkItem = useCallback(async (item: ProductModel) => {
            if (item?.productId === product?.productId) {
                  setInCart(true);
            } else {
                  setInCart(false);
            }
      }, []);

      const getProductByParams = useCallback(async () => {
            const productId = params.productId;
            const product = await productsServices.getOneProduct(productId);
            setProduct(product);
      }, [params.productId]);

      // const getCategoryNameById = (categoryId: string) => {
      //       const category = productsStore.getState().categories?.find(c => c.categoryId === categoryId);
      //       return category?.category
      // };

      // const getSubCategoryNameById = (subCategoryId: string) => {
      //       const subCategory = productsStore.getState().subCategories?.find(c => c.subCategoryId === subCategoryId);
      //       return subCategory?.subCategory;
      // };

      const getProductFromCart = useCallback(async () => {
            const productId = params.productId;
            if (authStore.getState().user) {
                  const product = shoppingCartStore.getState().itemsInCart.find(p => p.productId === productId);
                  if (product) {
                        setStock(product.stock);
                  }
            }
      }, [params.productId]);

      useEffect(() => {
            getProductByParams();
            // If there is a user:
            getProductFromCart();
            checkItem(product);
            
      }, [product,checkItem]);

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

      const removeFromCart = () => {

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
                                                <ButtonGroup className="w-50 m-auto">

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