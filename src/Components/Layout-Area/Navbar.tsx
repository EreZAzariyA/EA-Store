import { useCallback, useState, useEffect } from "react";
import { Navbar, Container, Row, Col, Button, Offcanvas, Form, InputGroup, Dropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { FiMenu } from "react-icons/fi";
import SideNav from "./Side-Nav";
import CategoryModel from "../../Models/Category-Model";
import SubNavbar from "./Sub-Navbar";
import SubCategoryModel from "../../Models/sub-category-model";
import productsServices from "../../Services/Products-Services";
import "./Style.css";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import AuthMenu from "../Auth-Area/AuthMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { authStore } from "../../Redux/Store";
import UserModel from "../../Models/user-model";

interface MyNavbarProps {
      bodyWidth: number;
      categories: CategoryModel[];
}

const MyNavbar = (props: MyNavbarProps) => {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const [user, setUser] = useState<UserModel>();

      const [subCategories, setSubCategories] = useState<SubCategoryModel[]>();
      const getAllSubCategories = useCallback(async () => {
            const subCategories = await productsServices.getAllSubCategories();
            setSubCategories(subCategories);
      }, []);

      useEffect(() => {
            setUser(authStore.getState().user);
            getAllSubCategories();

            const unsubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });
            return () => unsubscribe();
      });

      return (
            <Container className="mt-2 p-0">
                  {/* For Desktop */}
                  {props.bodyWidth >= 768 &&
                        <Container>
                              <Row>
                                    <Col md='3' lg='3' xxl='2'>
                                          <InputGroup size="sm">
                                                <Button variant="secondary">
                                                      <AiOutlineSearch />
                                                </Button>
                                                <Form.Control
                                                      placeholder="Search"
                                                />
                                          </InputGroup>
                                    </Col>

                                    <Col md='6' lg='7' xxl='8'>
                                          <Navbar.Brand as={NavLink} to="/">
                                                <h3>

                                                      EA<strong>Store</strong>
                                                </h3>
                                          </Navbar.Brand>
                                    </Col>

                                    <Col md='3' lg='2' xxl='2'>
                                          <Row>
                                                {/* Empty col */}
                                                <Col md='6' xl='6' xxl='6'></Col>

                                                <Col md='6' xl='6' xxl='6'>
                                                      <Row>
                                                            <Col sm='6' xs='6' xxs='6'>
                                                                  <NavLink to={"/your-cart"}>
                                                                        <AiOutlineShoppingCart size='1.5rem' />
                                                                  </NavLink>
                                                            </Col>
                                                            <Col sm='6' xs='6' xxs='6'>
                                                                  {!user &&
                                                                        <NavLink to={"/your-profile"}>
                                                                              <VscAccount size='1.5rem' />
                                                                        </NavLink>
                                                                  }
                                                                  {user &&
                                                                        <Dropdown>
                                                                              <DropdownToggle as={NavLink} to={null}>
                                                                                    <VscAccount size='1.5rem' />
                                                                              </DropdownToggle>

                                                                              <DropdownMenu>
                                                                                    <DropdownItem eventKey={1} as={'div'}>
                                                                                          <AuthMenu />
                                                                                    </DropdownItem>
                                                                              </DropdownMenu>
                                                                        </Dropdown>
                                                                  }
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
                  {/* For Mobile */}
                  {props.bodyWidth < 768 &&
                        <Container fluid className="miniNav p-3">
                              <Row>
                                    <Col sm='2' xs='2' xxs='3'>
                                          <Row>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      <NavLink to={"/your-cart"}>
                                                            <AiOutlineShoppingCart size='1.8rem' />
                                                      </NavLink>
                                                </Col>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      <Dropdown>
                                                            <DropdownToggle as={NavLink} to={null}>
                                                                  <VscAccount size='1.8rem' />
                                                            </DropdownToggle>

                                                            <DropdownMenu>
                                                                  <DropdownItem eventKey={1} as={'div'}>
                                                                        <AuthMenu />
                                                                  </DropdownItem>
                                                            </DropdownMenu>
                                                      </Dropdown>
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
                                                      <NavLink to="/search">
                                                            <AiOutlineSearch size='1.8rem' />
                                                      </NavLink>
                                                </Col>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      <NavLink to={null}>
                                                            <FiMenu onClick={handleShow} size='1.8rem' />
                                                      </NavLink>
                                                </Col>
                                          </Row>
                                    </Col>
                              </Row >
                        </Container>
                  }

                  <Offcanvas show={show} onHide={handleClose} placement='end' style={{ width: '20rem' }} className="d-md-none">
                        <SideNav categories={props.categories} />
                  </Offcanvas>
            </ Container>
      )
}

export default MyNavbar