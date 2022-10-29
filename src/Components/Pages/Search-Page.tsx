import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Container, FloatingLabel, Form, Row } from "react-bootstrap"
import ProductModel from "../../Models/Product-Model";
import { productsStore } from "../../Redux/Store";
import productsServices from "../../Services/Products-Services";
import ProductCard from "../Products-Area/Product-Card";

export const SearchPage = () => {

      const [products, setProducts] = useState<ProductModel[]>();

      const getAllProducts = useCallback(async () => {
            const products = await productsServices.getAllProducts();
            setProducts(products);
      }, []);

      useEffect(() => {
            getAllProducts();
      }, []);

      const handleChange = (e: SyntheticEvent) => {
            const searchInputValue = (e.target as HTMLInputElement).value;
            if (searchInputValue) {
                  setProducts(products.filter(p => p.productName.startsWith(searchInputValue[0].toLocaleUpperCase())));
            } else {

                  setProducts(productsStore.getState().products);
            }
      }
      return (
            <Container>
                  <FloatingLabel label="Search Products" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" onChange={handleChange} />
                  </FloatingLabel>

                  <Row>

                        {products?.map(p =>
                              <ProductCard key={p?.productId} product={p} />
                        )}
                  </Row>
            </Container>
      )
}