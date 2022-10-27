import { useState, useMemo } from "react";
import { Button, Card, Carousel, Col, Container, Image, Row } from "react-bootstrap"
import { numberWithCommas } from "../..";
import ProductModel from "../../Models/Product-Model"
import { productsStore } from "../../Redux/Store";
import { BsCartPlus } from "react-icons/bs";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
      product: ProductModel;
}

const ProductCard = (props: ProductCardProps) => {
      const [size, setSize] = useState(0);
      useMemo(() => {
            const size = document.body.offsetWidth
            document.body.onresize = () => {
                  const size = document.body.offsetWidth;
                  setSize(size);
            }
            setSize(size);

      }, [size]);

      const getCategoryById = (categoryId: string) => {
            const category = productsStore.getState().categories?.find(c => c?.categoryId === categoryId);
            return category?.category;
      }
      const getSubCategoryById = (subCategoryId: string) => {
            const subCategory = productsStore.getState().subCategories?.find(subC => subC?.subCategoryId === subCategoryId);
            return subCategory?.subCategory;
      }

      return (
            <>
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

                                          <Button>
                                                Add to cart
                                                <BsCartPlus className="m-1" />
                                          </Button>

                                    </Card.Footer>




                                    {/* <Button variant="success">
                                          In-Cart
                                          <BsCartCheck className="m-1" />
                                    </Button> */}

                              </Card>

                        </Col>
                  }

                  {size < 768 &&
                        <Col xxs='6' sm='4'>
                              <Card className="d-inline-block m-auto mt-2" >

                                    {/* Product card images */}
                                    <Carousel variant="dark">
                                          <Carousel.Item style={{ height: '200px' }}>
                                                <NavLink to={`/product/${props.product.productId}`}>
                                                      <Image src={props.product.productImage} alt="" className="w-100 h-100" />
                                                </NavLink>
                                          </Carousel.Item>
                                          <Carousel.Item style={{ height: '200px' }}>
                                                <NavLink to={`/product/${props.product.productId}`}>
                                                      <Image src={props.product.productImage} alt="" className="w-100 h-100" />
                                                </NavLink>
                                          </Carousel.Item>
                                          <Carousel.Item style={{ height: '200px' }}>
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

                                          <Button>
                                                Add to cart
                                                <BsCartPlus className="m-1" />
                                          </Button>

                                    </Card.Footer>




                                    {/* <Button variant="success">
                                          In-Cart
                                          <BsCartCheck className="m-1" />
                                    </Button> */}

                              </Card>
                        </Col>
                  }

            </>
      )
}

export default ProductCard