import { useCallback, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ProductModel from "../../Models/Product-Model";
import productsServices from "../../Services/Products-Services";
import ProductCard from "../Products-Area/Product-Card";

export const CategoriesPages = () => {
      const params = useParams();
      const [products, setProducts] = useState<ProductModel[]>();

      const getProductsBySubCategoryId = useCallback(async (subCategoryId: string) => {
            const products = await productsServices.getProductsBySubCategoryId(subCategoryId);
            setProducts(products);
      }, []);

      useEffect(() => {
            getProductsBySubCategoryId(params.subCategoryId);
      }, [params.subCategoryId, getProductsBySubCategoryId]);

      return (
            <Container>
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