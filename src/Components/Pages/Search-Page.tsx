import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Container, FloatingLabel, Form, Row } from "react-bootstrap"
import ProductModel from "../../Models/Product-Model";
import { productsStore } from "../../Redux/Store";
import productsServices from "../../Services/Products-Services";
import ProductCard from "../Products-Area/Product-Card/Product-Card";

export const SearchPage = () => {

      const [products, setProducts] = useState<ProductModel[]>();

      const getAllProducts = useCallback(async () => {
            const products = await productsServices.getAllProducts();
            setProducts(products);
      }, []);

      useEffect(() => {
            getAllProducts();
      }, []);

      const handleChange = async (e: SyntheticEvent) => {
            const searchValue = (e.target as HTMLInputElement).value;
            // First latter to upper case
            const searchValueFirstLetterUpperCase = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

            if (searchValue.length >= 1) {

                  if (productsStore.getState().products.length === 0) {
                        const products = await productsServices.getAllProducts();
                        // Get products by search value: ["Search","SEARCH","search"]
                        const productsBySearchValue = products.filter(product => product.productName.startsWith(searchValueFirstLetterUpperCase) || product.productName.includes(searchValue) || product.productName.includes(searchValue.toUpperCase()));

                        // Set products global state by search value
                        setProducts(productsBySearchValue)


                  } else {
                        // If the products on the store (It will load faster)
                        const products = productsStore.getState().products;

                        // Get products by search value: ["Search","SEARCH","search"]
                        const productsBySearchValue = products.filter(product => product.productName.startsWith(searchValueFirstLetterUpperCase) || product.productName.includes(searchValue) || product.productName.includes(searchValue.toUpperCase()));

                        // Set products by search value
                        setProducts(productsBySearchValue)
                  }
            }

            else if (searchValue.length === 0) {
                  const products = await productsServices.getAllProducts();
                  setProducts(products);
            }

            console.log(searchValue);

      }
      return (
            <Container>
                  <FloatingLabel label="Search Products" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" onChange={handleChange} />
                  </FloatingLabel>

                  <Row>
                        <Container>

                              {products?.map(p =>
                                    <ProductCard key={p?.productId} product={p} />
                              )}

                              {products?.length === 0 &&
                                    <p>Not found</p>
                              }
                        </Container>
                  </Row>
            </Container>
      )
}