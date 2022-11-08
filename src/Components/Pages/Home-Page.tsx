import { useState, useMemo } from "react";
import { Carousel, CarouselItem, Container, Image, Row } from "react-bootstrap"
import photo from "../../Assets/e-commerce photo.png";
import ProductModel from "../../Models/Product-Model";
import productsServices from "../../Services/Products-Services";
import ProductCard from "../Products-Area/Product-Card";
import UndefineCard from "../Products-Area/undefineCard/undefineCard";

const HomePage = () => {
      const [products, setProducts] = useState<ProductModel[]>();

      useMemo(async () => {
            const products = await productsServices.getAllProducts();
            setProducts(products);
      }, []);


      return (
            <Container fluid='xs'>
                  <Row>
                        <Carousel fade variant="dark">
                              <CarouselItem>
                                    <Image src={photo} alt="" width={'100%'} />
                                    <Carousel.Caption>
                                          <h3>Welcome</h3>
                                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </Carousel.Caption>
                              </CarouselItem>
                              <CarouselItem>
                                    <Image src={photo} alt="" width={'100%'} />
                                    <Carousel.Caption>
                                          <h3>New UI</h3>
                                          <p>optio fuga beatae amet dolorum provident omnis.</p>
                                    </Carousel.Caption>
                              </CarouselItem>

                        </Carousel>
                  </Row>

                  <Container>
                        <h3 className="text-decoration-underline">
                              Home-Page
                        </h3>
                        {products === undefined &&
                              <Row className="justify-content-center">
                                    <UndefineCard />
                                    <UndefineCard />
                                    <UndefineCard />
                                    <UndefineCard />
                                    <UndefineCard />
                                    <UndefineCard />
                              </Row>
                        }
                        <Row className="justify-content-center">
                              {products?.map(product =>
                                    <ProductCard key={product.productId} product={product} />
                              )}
                        </Row>
                  </Container>

            </Container>
      )
}

export default HomePage;