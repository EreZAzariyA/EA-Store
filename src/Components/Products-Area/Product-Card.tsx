import { useState, useMemo, useCallback, useEffect } from "react";
import { Button, Card, Carousel, Col, Container, Image, Modal, Row } from "react-bootstrap"
import { numberWithCommas } from "../..";
import ProductModel from "../../Models/Product-Model"
import { authStore, productsStore } from "../../Redux/Store";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { ItemInCartModel } from "../../Models/item-in-cart-model";
import shoppingCartServices from "../../Services/ShoppingCartServices";
import MyModal from "./Modal";

interface ProductCardProps {
      product: ProductModel;
}

const ProductCard = (props: ProductCardProps) => {
      const [show, setShow] = useState(false);
      const handleShow = () => setShow(true);
      const handleClose = () => setShow(false);

      const [size, setSize] = useState(0);
      useMemo(() => {
            const size = document.body.offsetWidth
            document.body.onresize = () => {
                  const size = document.body.offsetWidth;
                  setSize(size);
            }
            setSize(size);

      }, []);

      const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
      const getItemsFromUserCartByUserId = useCallback(async () => {
            const user = authStore.getState().user;
            const itemsInCart = await shoppingCartServices.getAllItemsFromUserCartByUserId(user?.userId);
            setItemsInCart(itemsInCart);
      }, []);

      const [inCart, setInCart] = useState<boolean>(false);
      const checkItems = useCallback(async (items: ItemInCartModel[]) => {
            if (items?.find(item => item.productId === props.product.productId)) {
                  setInCart(true);
            } else {
                  setInCart(false);
            }
      }, [props.product.productId]);

      useEffect(() => {
            getItemsFromUserCartByUserId();
            checkItems(itemsInCart);
      });

      const getCategoryById = (categoryId: string) => {
            const category = productsStore.getState().categories?.find(c => c?.categoryId === categoryId);
            return category?.category;
      };
      const getSubCategoryById = (subCategoryId: string) => {
            const subCategory = productsStore.getState().subCategories?.find(subC => subC?.subCategoryId === subCategoryId);
            return subCategory?.subCategory;
      };

      return (
            <>
                  {/* For Desktop */}
                  {size >= 768 &&
                        <Col md='4' lg='3' xxl='2'>
                              <Card className="d-inline-block m-1">

                                    {/* Product card images */}
                                    <Carousel variant="dark">
                                          <Carousel.Item style={{ height: '200px', width: '100%' }}>
                                                <NavLink to={`/product/${props.product.productId}`}>
                                                      <Image src={props.product.productImage} alt="" className="w-100 h-100" />
                                                </NavLink>
                                          </Carousel.Item>
                                          <Carousel.Item style={{ height: '200px', width: '100%' }}>
                                                <NavLink to={`/product/${props.product.productId}`}>
                                                      <Image src={props.product.productImage} alt="" className="w-100 h-100" />
                                                </NavLink>
                                          </Carousel.Item>
                                          <Carousel.Item style={{ height: '200px', width: '100%' }}>
                                                <NavLink to={`/product/${props.product.productId}`}>
                                                      <Image src={props.product.productImage} alt="" className="w-100 h-100" />
                                                </NavLink>
                                          </Carousel.Item>
                                    </Carousel>

                                    <Card.Body className='p-2'>

                                          <Card.Title style={{ overflow: "hidden", height: "50px" }}>
                                                {props.product.productName}
                                          </Card.Title>

                                          <Container className="me-auto text-muted" style={{ overflow: "hidden", height: "100px" }}>

                                                <Row>
                                                      <Card.Subtitle>
                                                            {getCategoryById(props.product.categoryId)}
                                                      </Card.Subtitle>
                                                </Row>
                                                <Row>
                                                      <p>
                                                            {getSubCategoryById(props.product.subCategoryId)}
                                                      </p >

                                                </Row>
                                          </Container>

                                          <h6>
                                                {numberWithCommas(props.product.productPrice) + '$'}
                                          </h6>


                                    </Card.Body>

                                    <Card.Footer>

                                          {!inCart &&
                                                <Button onClick={handleShow}>
                                                      Add To Cart
                                                      <BsCartPlus className="m-1" />
                                                </Button>
                                          }
                                          {inCart &&
                                                <Button variant="success">
                                                      In Cart
                                                      <BsCartCheck className="m-1" />
                                                </Button>
                                          }


                                    </Card.Footer>




                                    {/* <Button variant="success">
                                          In-Cart
                                          <BsCartCheck className="m-1" />
                                    </Button> */}

                              </Card>

                        </Col>
                  }
                  {/* For Mobile */}
                  {size < 768 &&
                        <Col xxs='12' sm='4'>
                              <Card className="d-inline-block m-auto mt-2 w-75">

                                    {/* Product card images */}
                                    <Carousel variant="dark">
                                          <Carousel.Item>
                                                <NavLink to={`/product/${props.product.productId}`}>
                                                      <Image src={props.product.productImage} alt="" className="w-100 h-100" />
                                                </NavLink>
                                          </Carousel.Item>
                                          <Carousel.Item>
                                                <NavLink to={`/product/${props.product.productId}`}>
                                                      <Image src={props.product.productImage} alt="" className="w-100 h-100" />
                                                </NavLink>
                                          </Carousel.Item>
                                          <Carousel.Item>
                                                <NavLink to={`/product/${props.product.productId}`}>
                                                      <Image src={props.product.productImage} alt="" className="w-100 h-100" />
                                                </NavLink>
                                          </Carousel.Item>
                                    </Carousel>

                                    <Card.Body className='p-2'>

                                          <Card.Title style={{ overflow: "hidden", height: "50px" }}>
                                                {props.product.productName}
                                          </Card.Title>

                                          <Container className="me-auto text-muted" style={{ overflow: "hidden", height: "100px" }}>

                                                <Row>
                                                      <Card.Subtitle>
                                                            {getCategoryById(props.product.categoryId)}
                                                      </Card.Subtitle>
                                                </Row>
                                                <Row>
                                                      <p>
                                                            {getSubCategoryById(props.product.subCategoryId)}
                                                      </p >

                                                </Row>
                                          </Container>

                                          <h6>
                                                {numberWithCommas(props.product.productPrice) + '$'}
                                          </h6>


                                    </Card.Body>

                                    <Card.Footer>
                                          {!inCart &&
                                                <Button onClick={handleShow}>
                                                      Add To Cart
                                                      <BsCartPlus className="m-1" />
                                                </Button>
                                          }
                                          {inCart &&
                                                <Button variant="success">
                                                      In Cart
                                                      <BsCartCheck className="m-1" />
                                                </Button>
                                          }
                                    </Card.Footer>




                                    {/* <Button variant="success">
                                          In-Cart
                                          <BsCartCheck className="m-1" />
                                    </Button> */}

                              </Card>
                        </Col>
                  }


                  <Modal show={show} size='sm'>
                        <MyModal product={props.product} close={handleClose} />
                  </Modal>
            </>
      )
}

export default ProductCard