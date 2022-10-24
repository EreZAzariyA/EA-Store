import { useState, useCallback, useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap"
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
            <Container>
                  <Row>
                        <Image src={photo} alt="" style={{ height: '35%', width: '100%' }} />
                  </Row>

                  <Container>
                        {products?.map(product =>
                              <ProductCard key={product.productId} product={product} />
                        )}
                  </Container>
            </Container>
      )
}

export default HomePage;