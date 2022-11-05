import { useState, useCallback, useEffect } from "react";
import { Carousel, CarouselItem, Container, Image, Row } from "react-bootstrap"
import photo from "../../Assets/e-commerce photo.png";
import ProductModel from "../../Models/Product-Model";
import { productsStore } from "../../Redux/Store";
import productsServices from "../../Services/Products-Services";
import ProductCard from "../Products-Area/Product-Card";
import UndefineCard from "../Products-Area/undefineCard/undefineCard";

const HomePage = () => {
      const [products, setProducts] = useState<ProductModel[]>();

      const getAllProducts = useCallback(async () => {
            if (productsStore.getState().products.length === 0) {
                  const products = await productsServices.getAllProducts();
                  setProducts(products);
            }
            const products = productsStore.getState().products;
            setProducts(products);

            const unsubscribe = productsStore.subscribe(() => {
                  const products = productsStore.getState().products;
                  setProducts(products);
            })

            return () => unsubscribe();
      }, []);

      useEffect(() => {
            getAllProducts();
      }, [getAllProducts])


      return (
            <Container fluid>
                  <Row>
                        <Carousel fade variant="dark">
                              <CarouselItem>
                                    <Image src={photo} alt="" width={'100%'} height={'40%'} />
                                    <Carousel.Caption>
                                          <h3>Welcome</h3>
                                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </Carousel.Caption>
                              </CarouselItem>
                              <CarouselItem>
                                    <Image src={photo} alt="" width={'100%'} height={'40%'} />
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