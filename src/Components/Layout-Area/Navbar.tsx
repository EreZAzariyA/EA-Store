import { useCallback, useState, useEffect } from "react";
import { Navbar, Container, Row, Col, Button, Offcanvas, Form, InputGroup } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { FiMenu } from "react-icons/fi";
import SideNav from "./Side-Nav";
import CategoryModel from "../../Models/Category-Model";
import SubNavbar from "./Sub-Navbar";
import SubCategoryModel from "../../Models/sub-category-model";
import productsServices from "../../Services/Products-Services";


interface MyNavbarProps {
      bodyWidth: number;
      categories: CategoryModel[];
}

const MyNavbar = (props: MyNavbarProps) => {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const [subCategories, setSubCategories] = useState<SubCategoryModel[]>();

      const getAllSubCategories = useCallback(async () => {
            const subCategories = await productsServices.getAllSubCategories();
            setSubCategories(subCategories);
      }, []);

      useEffect(() => {
            getAllSubCategories()
      })

      return (
            <Container className="mt-1">

                  {props.bodyWidth >= 768 &&
                        <Container>
                              <Row className="mb-2">
                                    <Col md='3' lg='2' xxl='2'>
                                          <InputGroup size="sm">
                                                <Button variant="secondary">
                                                      <AiOutlineSearch />
                                                </Button>
                                                <Form.Control
                                                      placeholder="Search"
                                                />
                                          </InputGroup>
                                    </Col>

                                    <Col md='6' lg='8' xxl='8'>
                                          <Navbar.Brand as={NavLink} to="/">
                                                <h3>

                                                      EA<strong>Store</strong>
                                                </h3>
                                          </Navbar.Brand>
                                    </Col>

                                    <Col md='3' lg='2' xxl='2'>
                                          <Row>
                                                <Col md='6' xl='6' xxl='6'></Col>

                                                <Col md='6' xl='6' xxl='6'>
                                                      <Row>
                                                            <Col sm='6' xs='6' xxs='6'>
                                                                  <NavLink to={"/"}>
                                                                        <AiOutlineShoppingCart size='1.5rem' />
                                                                  </NavLink>
                                                            </Col>
                                                            <Col sm='6' xs='6' xxs='6'>
                                                                  <NavLink to={"/"}>
                                                                        <VscAccount size='1.5rem' />
                                                                  </NavLink>
                                                            </Col>
                                                      </Row>
                                                </Col>
                                          </Row>
                                    </Col>
                              </Row>

                              <Row>
                                    <SubNavbar bodyWidth={props.bodyWidth} subCategories={subCategories} />
                              </Row>
                        </Container>
                  }

                  {props.bodyWidth < 768 &&
                        <Container fluid>
                              <Row className="mb-2">
                                    <Col sm='2' xs='2' xxs='3'>
                                          <Row>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      <NavLink to={"/"}>
                                                            <AiOutlineShoppingCart size='1.5rem' />
                                                      </NavLink>
                                                </Col>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      <NavLink to={"/"}>
                                                            <VscAccount size='1.5rem' />
                                                      </NavLink>
                                                </Col>
                                          </Row>
                                    </Col>


                                    <Col sm='8' xs='8' xxs='6'>
                                          <Row>
                                                <Col sm='12' xs='12' xxs='12'>
                                                      <Navbar.Brand as={NavLink} to="/">EA<strong>Store</strong></Navbar.Brand>
                                                </Col >
                                          </Row >
                                    </Col >


                                    <Col sm='2' xs='2' xxs='3'>
                                          <Row>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      <NavLink to="/">
                                                            <AiOutlineSearch size='1.5rem' />
                                                      </NavLink>
                                                </Col>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      <FiMenu size='1.5rem' onClick={handleShow} />
                                                </Col>
                                          </Row>
                                    </Col>
                              </Row >
                        </Container>
                  }


                  <Offcanvas show={show} onHide={handleClose} placement='end' style={{ width: '20rem' }} className="d-md-none">
                        <SideNav categories={props.categories} />
                  </Offcanvas>
            </Container >
      )
}

export default MyNavbar