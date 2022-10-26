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

                        <Card style={{ width: '12rem' }} className="d-inline-block m-auto mt-2">

                              <Card.Img variant="top" src={props.product.productImage} />
                              <Card.Body>

                                    {/* <Card.Title>
                                          {props.product.productName}
                                    </Card.Title> */}
                                    <Card.Title style={{ overflow: "hidden", height: "50px" }}>
                                          {props.product.productName}
                                    </Card.Title>

                                    <Container className="m-auto text-muted">

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
                                    <Row>
                                          <h6>
                                                {numberWithCommas(props.product.productPrice) + '$'}
                                          </h6>
                                    </Row>


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

                  }

            </>
      )
}

export default ProductCard