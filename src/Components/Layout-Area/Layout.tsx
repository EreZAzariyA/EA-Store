import { useState, useEffect, useMemo, useCallback } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap"
import CategoryModel from "../../Models/Category-Model";
import productsServices from "../../Services/Products-Services";
import Footer from "./Footer";
import MyNavbar from "./Navbar"
import Routing from "./Routing";
import SideNav from "./Side-Nav";
import "./Style.css";

const Layout = () => {
      // Size
      const [size, setSize] = useState(0);
      useMemo(() => {
            const size = document.body.offsetWidth
            document.body.onresize = () => {
                  const size = document.body.offsetWidth
                  setSize(size);
            }
            return setSize(size);
      }, [size]);

      const [categories, setCategories] = useState<CategoryModel[]>();
      const getAllCategories = useCallback(async () => {
            const categories = await productsServices.getAllCategories();
            setCategories(categories);
      }, []);

      useEffect(() => {
            getAllCategories();
      });

      
      return (
            <Container fluid className="Layout">

                  <Row>
                        <MyNavbar bodyWidth={size} categories={categories}/>
                  </Row>

                  <Row>
                        <Routing />
                  </Row>

                  <Row>
                        <Footer />
                  </Row>

            </Container>
      )
}

export default Layout