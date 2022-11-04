import { useCallback, useState, useEffect } from "react";
import { Button, ButtonGroup, Card, Col, Container, Image, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import ProductModel from "../../Models/Product-Model";
import { authStore, shoppingCartStore } from "../../Redux/Store";
import productsServices from "../../Services/Products-Services";

const OneProduct = () => {
      const params = useParams();
      const [product, setProduct] = useState<ProductModel>();
      const [stock, setStock] = useState(0);

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
      },[]);

      const plus = () => {
            setStock(stock + 1);
      }
      const minus = () => {
            if (stock === 0) {
                  return;
            } else {
                  setStock(stock - 1);
            }
      }

      return (
            <Container>
                  <Row>
                        <Col md='6' sm='12' xs='12' xxs='12'>
                              <Image src={product?.productImage} alt='' width='100%' height='100%' />
                        </Col>

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
                              </Card>
                        </Col>
                  </Row>
            </Container>
      )
}

export default OneProduct;