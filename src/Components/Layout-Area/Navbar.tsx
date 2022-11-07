import { useCallback, useState, useEffect, SyntheticEvent } from "react";
import { Navbar, Container, Row, Col, Offcanvas, Form, Dropdown, Button, Nav, FloatingLabel } from "react-bootstrap"
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
import { authStore, productsStore } from "../../Redux/Store";
import UserModel from "../../Models/user-model";
import { fetchAllProductsAction } from "../../Redux/Products-state";
import axios from "axios";
import ProductModel from "../../Models/Product-Model";
import config from "../../Utils/Config";
import Role from "../../Models/role";

interface MyNavbarProps {
      bodyWidth: number;
      categories: CategoryModel[];
}

const MyNavbar = (props: MyNavbarProps) => {
      // For mobile side Nav
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
      }, [getAllSubCategories]);

      const search = async (e: SyntheticEvent) => {
            const searchValue = (e.target as HTMLInputElement).value;
            // First latter to upper case
            const searchValueFirstLetterUpperCase = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

            if (searchValue.length >= 0) {

                  const products = productsStore.getState().products;

                  // Get products by search value: ["Search","SEARCH","search"]
                  const productsBySearchValue = products.filter(product => product.productName.startsWith(searchValueFirstLetterUpperCase));

                  // Set products global state by search value
                  productsStore.dispatch(fetchAllProductsAction(productsBySearchValue));

            }
            // If the search field is empty, Get the full list from server (not from store. {store filtered by search field, and can not get the full list of products})
            if (searchValue.length === 0) {
                  const response = await axios.get<ProductModel[]>(config.urls.products.products.allProductsUrl);
                  const products = response.data;
                  // Fetch the full list of products to products store. (Global state)
                  productsStore.dispatch(fetchAllProductsAction(products));
            }
      }

      return (
            <Container className="mt-2 p-0">
                  {/* For Desktop */}
                  {props.bodyWidth >= 768 &&
                        <Container>
                              {/* Header buttons */}
                              <Row>
                                    <Col md='3' lg='3' xxl='2'>

                                          <FloatingLabel label='Search' className="m-1">
                                                <Form.Control onChange={search}
                                                      placeholder="Search"
                                                />
                                          </FloatingLabel>
                                    </Col>

                                    <Col md='6' lg='7' xxl='8'>
                                          <Navbar.Brand>
                                                <h1>
                                                      <Nav.Link as={NavLink} to="/">
                                                            EA<strong style={{ color: "lightblue" }}>Store</strong>
                                                      </Nav.Link>
                                                </h1>
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
                                                                        <AiOutlineShoppingCart size='2rem' />
                                                                  </NavLink>
                                                            </Col>
                                                            <Col sm='6' xs='6' xxs='6'>
                                                                  {!user &&
                                                                        <NavLink to={'/auth/login'}>
                                                                              <VscAccount size='2rem' />
                                                                        </NavLink>
                                                                  }

                                                                  {user?.roleId === Role.User &&
                                                                        <Dropdown>
                                                                              <DropdownToggle as={NavLink} to={null}>
                                                                                    <VscAccount size='2rem' />
                                                                              </DropdownToggle>

                                                                              <DropdownMenu>
                                                                                    <Dropdown.Header>
                                                                                          Hello {user?.firstName + " " + user?.lastName}
                                                                                    </Dropdown.Header>

                                                                                    <Dropdown.Divider />

                                                                                    <Dropdown.ItemText>
                                                                                          <NavLink to="auth/logout">
                                                                                                <Button variant="danger">
                                                                                                      Logout
                                                                                                </Button>
                                                                                          </NavLink>
                                                                                    </Dropdown.ItemText>

                                                                              </DropdownMenu>
                                                                        </Dropdown>
                                                                  }
                                                                  {user?.roleId === Role.Admin &&
                                                                        <Dropdown>
                                                                              <DropdownToggle as={NavLink} to={null}>
                                                                                    <VscAccount size='2rem' />
                                                                              </DropdownToggle>

                                                                              <DropdownMenu>
                                                                                    <Dropdown.Header>
                                                                                          Hello Admin
                                                                                    </Dropdown.Header>

                                                                                    <Dropdown.Divider />

                                                                                    <Dropdown.ItemText>
                                                                                          <Nav.Link as={NavLink} to="/add-product">
                                                                                                Add Product
                                                                                          </Nav.Link>
                                                                                    </Dropdown.ItemText>

                                                                                    <Dropdown.ItemText>
                                                                                          <NavLink to="auth/logout">
                                                                                                <Button variant="danger">
                                                                                                      Logout
                                                                                                </Button>
                                                                                          </NavLink>
                                                                                    </Dropdown.ItemText>
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
                        <Container fluid className="p-3">
                              <Row>
                                    <Col sm='2' xs='2' xxs='3'>
                                          <Row>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      <NavLink to={"/your-cart"}>
                                                            <AiOutlineShoppingCart size='1.8rem' />
                                                      </NavLink>
                                                </Col>
                                                <Col sm='6' xs='6' xxs='6'>
                                                      {!user &&
                                                            <NavLink to={'/auth/login'}>
                                                                  <VscAccount size='1.8rem' />
                                                            </NavLink>
                                                      }

                                                      {user?.roleId === Role.User &&
                                                            <Dropdown>
                                                                  <DropdownToggle as={NavLink} to={null}>
                                                                        <VscAccount size='1.8rem' />
                                                                  </DropdownToggle>

                                                                  <DropdownMenu>
                                                                        <Dropdown.Header>
                                                                              Hello {user?.firstName + " " + user?.lastName}
                                                                        </Dropdown.Header>

                                                                        <Dropdown.Divider />

                                                                        <Dropdown.ItemText>
                                                                              <NavLink to="auth/logout">
                                                                                    <Button variant="danger">
                                                                                          Logout
                                                                                    </Button>
                                                                              </NavLink>
                                                                        </Dropdown.ItemText>

                                                                  </DropdownMenu>
                                                            </Dropdown>
                                                      }
                                                      {user?.roleId === Role.Admin &&
                                                            <Dropdown>
                                                                  <DropdownToggle as={NavLink} to={null}>
                                                                        <VscAccount size='1.8rem' />
                                                                  </DropdownToggle>

                                                                  <DropdownMenu>
                                                                        <Dropdown.Header>
                                                                              Hello Admin
                                                                        </Dropdown.Header>

                                                                        <Dropdown.Divider />

                                                                        <Dropdown.ItemText>
                                                                              <Nav.Link as={NavLink} to="/add-product">
                                                                                    Add Product
                                                                              </Nav.Link>
                                                                        </Dropdown.ItemText>

                                                                        <Dropdown.ItemText>
                                                                              <NavLink to="auth/logout">
                                                                                    <Button variant="danger">
                                                                                          Logout
                                                                                    </Button>
                                                                              </NavLink>
                                                                        </Dropdown.ItemText>
                                                                  </DropdownMenu>
                                                            </Dropdown>
                                                      }

                                                </Col>
                                          </Row>
                                    </Col>


                                    <Col sm='8' xs='8' xxs='6'>
                                          <Row>
                                                <Col sm='12' xs='12' xxs='12'>
                                                      <Navbar.Brand>
                                                            <h3>
                                                                  <Nav.Link as={NavLink} to="/">
                                                                        EA<strong style={{ color: "lightblue" }}>Store</strong>
                                                                  </Nav.Link>
                                                            </h3>
                                                      </Navbar.Brand>
                                                </Col>
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