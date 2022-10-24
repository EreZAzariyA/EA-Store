import { useState, useMemo, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { numberWithCommas } from "../..";
import ProductModel from "../../Models/Product-Model"
import { productsStore } from "../../Redux/Store";
import { BsCartPlus } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";

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
                        <Card>
                              <p>{props.product.productPrice}</p>

                        </Card>
                  }

                  {size < 768 &&

                        <Card className="mt-3 m-1 d-inline-block" as={Col} xxs='12' sm='5'>
                              <Card.Header className="text-muted text-decoration-underline">
                                    {getSubCategoryById(props.product.subCategoryId)}

                              </Card.Header>

                              <Container fluid>
                                    <Card.Img src={props.product.productImage} height='250' className="mt-2" />

                                    <Row>
                                          <Card.Body>

                                                <Card.Title style={{ overflow: "hidden", height: "25px" }}>
                                                      {props.product.productName}
                                                </Card.Title>


                                                <Row className="mt-3">
                                                      <Col xxs='8'>
                                                            <Card.Subtitle className="text-muted">
                                                                  {getCategoryById(props.product.categoryId)}
                                                            </Card.Subtitle>
                                                      </Col>

                                                      <Col xxs='4'>
                                                            <h6>
                                                                  {numberWithCommas(props.product.productPrice) + '$'}
                                                            </h6>
                                                      </Col>

                                                </Row>


                                          </Card.Body>

                                    </Row>


                                    {/* <p style={{ width: 'auto', overflow: "hidden", height: "50px" }}>{props.product.productName}</p> */}
                              </Container>
                              <Card.Footer>
                                    <Button>
                                          Add to cart
                                          <BsCartPlus className="m-1" />
                                    </Button>

                                    {/* <Button variant="success">
                                          In-Cart
                                          <BsCartCheck className="m-1" />
                                    </Button> */}
                              </Card.Footer>

                        </Card>

                  }

            </>
      )
}

export default ProductCard