import { useState, useCallback, useEffect } from "react";
import { Carousel, CarouselItem, Col, Container, Image, Row } from "react-bootstrap"
import photo from "../../Assets/e-commerce photo.png";
import ProductModel from "../../Models/Product-Model";
import productsServices from "../../Services/Products-Services";
import ProductCard from "../Products-Area/Product-Card";

const HomePage = () => {
      const [products, setProducts] = useState<ProductModel[]>();

      const getAllProducts = useCallback(async () => {
            const products = await productsServices.getAllProducts();
            setProducts(products);
      }, []);

      useEffect(() => {
            getAllProducts();
      })


      return (
            <Container >
                  <Row>
                        <Carousel fade variant="dark">
                              <CarouselItem>
                                    <Image src={photo} alt="" style={{ width: '100%', height: '40%' }} />
                                    <Carousel.Caption>
                                          <h5>Welcome</h5>
                                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </Carousel.Caption>
                              </CarouselItem>
                              <CarouselItem>
                                    <Image src={photo} alt="" style={{ width: '100%', height: '40%' }} />
                                    <Carousel.Caption>
                                          <h5>New UI</h5>
                                          <p>optio fuga beatae amet dolorum provident omnis.</p>
                                    </Carousel.Caption>
                              </CarouselItem>

                        </Carousel>
                  </Row>
                  <Row>
                        <Col lg='6'>
                              <select>

                              </select>
                        </Col>
                  </Row>

                  <Container fluid>
                        <Row>
                              {products?.map(product =>
                                    <ProductCard key={product.productId} product={product} />
                              )}
                        </Row>
                  </Container>
            </Container>
      )
}

export default HomePage;