import { useCallback, useState, useEffect } from "react";
import { Breadcrumb, Button, ButtonGroup, Card, Col, Container, Form, Image, NavLink, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom";
import ProductModel from "../../Models/Product-Model";
import { productsStore } from "../../Redux/Store";
import productsServices from "../../Services/Products-Services";

const OneProduct = () => {
      const params = useParams();
      const [product, setProduct] = useState<ProductModel>();

      const getProductById = useCallback(async () => {
            const productId = params.productId;
            const product = await productsServices.getOneProduct(productId);
            setProduct(product);
      }, [params.productId]);

      const getCategoryNameById = (categoryId: string) => {
            const category = productsStore.getState().categories?.find(c => c.categoryId === categoryId);
            return category?.category
      };


      const getSubCategoryNameById = ((subCategoryId: string) => {
            const subCategory = productsStore.getState().subCategories?.find(c => c.subCategoryId === subCategoryId);
            return subCategory?.subCategory;
      })

      useEffect(() => {
            getProductById();
      }, [])


      return (
            <Container fluid>
                  {/* <Row>
                        <Breadcrumb>
                              <NavLink as={Link} to="/" className="breadcrumb-item">
                                    Home
                              </NavLink>

                              <NavLink as={Link} to={"/category/" + product?.categoryId} className="breadcrumb-item">
                                    {getCategoryNameById(product?.categoryId)}
                              </NavLink>

                              <NavLink as={Link} to={"/category/" + product?.categoryId + "/sub-category/" + product?.subCategoryId} className="breadcrumb-item">
                                    {product?.categoryId}
                              </NavLink>
                        </Breadcrumb>
                  </Row> */}

                  <Container fluid >
                        <Row>
                              <Col md='6' sm='12' xs='12' xxs='12'>
                                    <Image src={product?.productImage} alt='' width='auto' height='400px' />
                              </Col>
                              <Col md='6' sm='12' xs='12' xxs='12' style={{ marginTop: '5px' }}>
                                    <Card border="light" className="text-center">
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

                                                            <Button>
                                                                  +
                                                            </Button>

                                                            <Button as="div" variant="light">
                                                                  stock
                                                            </Button>

                                                            <Button>
                                                                  -
                                                            </Button>
                                                      </ButtonGroup>
                                                </Row>
                                          </Card.Body>
                                    </Card>
                              </Col>
                        </Row>
                  </Container>
            </Container >
      )
}

export default OneProduct;