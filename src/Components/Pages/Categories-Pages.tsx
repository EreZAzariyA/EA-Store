import { useCallback, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ProductModel from "../../Models/Product-Model";
import { productsStore } from "../../Redux/Store";
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

      const getSubCategoryNameById = (subCategoryId: string) => {
            const subCategories = productsStore.getState().subCategories;
            return subCategories.find(subC => subC.subCategoryId === subCategoryId)?.subCategory;
      }

      return (
            <Container>
                  <Container fluid>
                        <h3>{getSubCategoryNameById(params.subCategoryId)}</h3>
                        <Row className="justify-content-center">
                              {products?.map(product =>
                                    <ProductCard key={product.productId} product={product} />
                              )}
                        </Row>
                  </Container>
            </Container>
      )
}