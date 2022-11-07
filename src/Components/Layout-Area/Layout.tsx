import { useState, useEffect, useCallback } from "react";
import { Container, Row } from "react-bootstrap"
import CategoryModel from "../../Models/Category-Model";
import productsServices from "../../Services/Products-Services";
import Footer from "./Footer";
import MyNavbar from "./Navbar"
import Routing from "./Routing";
import "./Style.css";

const Layout = () => {
      // Size
      const [size, setSize] = useState<number>();
      const getSize = useCallback(() => {
            const size = document.body.offsetWidth
            setSize(size);

            document.body.onresize = () => {
                  setSize(document.body.offsetWidth);
            }
      }, []);

      const [categories, setCategories] = useState<CategoryModel[]>();
      const getAllCategories = useCallback(async () => {
            const categories = await productsServices.getAllCategories();
            setCategories(categories);
      }, []);

      useEffect(() => {
            getSize();
            getAllCategories();
      });


      return (
            <Container fluid className="Layout">
                  <Row>
                        <MyNavbar bodyWidth={size} categories={categories} />
                  </Row>

                  <Row>
                        <Container fluid>
                              <Routing />
                        </Container>
                  </Row>

                  <Row className="footer">
                        <Footer />
                  </Row>

            </Container>
      )
}

export default Layout