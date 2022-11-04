import { useState, useCallback, useEffect } from "react";
import { Carousel, CarouselItem, Container, Image, Row } from "react-bootstrap"
import photo from "../../Assets/e-commerce photo.png";
import morePhoto from "../../Assets/new.jpeg";
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
                                    <Image src={photo} alt="" height={'350rem'} width='100%' />
                                    <Carousel.Caption>
                                          <h3>Welcome</h3>
                                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </Carousel.Caption>
                              </CarouselItem>
                              <CarouselItem>
                                    <Image src={morePhoto} alt="" height={'350rem'} width='100%' />
                                    <Carousel.Caption>
                                          <h3>Welcome</h3>
                                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </Carousel.Caption>
                              </CarouselItem>
                        </Carousel>
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