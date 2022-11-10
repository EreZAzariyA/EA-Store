import { useState, useMemo } from "react";
import { Container, Row } from "react-bootstrap"
import CategoryModel from "../../Models/Category-Model";
import productsServices from "../../Services/Products-Services";
import Footer from "./Footer";
import MyNavbar from "./Navbar"
import Routing from "./Routing";
import "./Style.css";

const Layout = () => {
      const [categories, setCategories] = useState<CategoryModel[]>();
      const [windowSize, setWindowSize] = useState<number>();
      
      // Set size
      const handleWindowResize = () => {
            setWindowSize(window.innerWidth);
      }
      useMemo(() => {
            setWindowSize(window.innerWidth);
            window.addEventListener('resize', handleWindowResize);
            return () => {
                  window.removeEventListener('resize', handleWindowResize);
            };
      }, [windowSize]);
      // Get all categories
      useMemo(async () => {
            const categories = await productsServices.getAllCategories();
            setCategories(categories);
      }, []);

      return (
            <Container fluid className="Layout">
                  <Row>
                        <MyNavbar bodyWidth={windowSize} categories={categories} />
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