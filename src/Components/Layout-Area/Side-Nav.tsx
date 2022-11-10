import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import CategoryModel from "../../Models/Category-Model";
import { useEffect, useState } from "react"
import SubCategoryModel from "../../Models/sub-category-model";
import productsServices from "../../Services/Products-Services";
import { UndefinedNav } from "./Sub-Navbar";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { NavLink } from "react-router-dom";
import { productsStore } from "../../Redux/Store";

interface SideNavProps {
      categories: CategoryModel[];
}

const SideNav = (props: SideNavProps) => {
      const [subCategories, setSubCategories] = useState<SubCategoryModel[]>();

      const getAllSubCategories = async () => {
            const subCategories = await productsServices.getAllSubCategories();
            setSubCategories(subCategories);
      };

      useEffect(() => {
            const subCategories = productsStore.getState().subCategories;
            if (subCategories.length === 0) {
                  getAllSubCategories();
            } else {
                  setSubCategories(subCategories);
            }
      }, [])


      const getSubCategoriesByCategoryId = (categoryId: string) => {
            const subCategory = subCategories?.filter(subCategory => subCategory.categoryId === categoryId);
            return (
                  subCategory?.map(subC =>
                        <DropdownItem as={NavLink} to={'/category/' + subC.categoryId + '/sub-category/' + subC.subCategoryId} key={subC.subCategoryId} >
                              {subC.subCategory}
                        </DropdownItem>
                  )
            );
      }

      return (
            <Container>
                  <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Categories</Offcanvas.Title>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                        {props.categories &&

                              <Navbar collapseOnSelect expand='xs' className="justify-content-center">
                                    <Nav>

                                          <Nav.Link as={NavLink} to="/">
                                                Home-Page
                                          </Nav.Link>
                                          {props.categories?.map(category =>

                                                <NavDropdown
                                                      key={category?.categoryId}
                                                      title={category?.category}
                                                      className="justify-content-center">
                                                      {getSubCategoriesByCategoryId(category?.categoryId)}
                                                </NavDropdown>
                                          )}
                                    </Nav>
                              </Navbar>

                        }

                        {props.categories === undefined &&
                              <Nav variant="tabs" className="flex-column">
                                    <UndefinedNav length={6} colWidth={8} />
                              </Nav>
                        }
                  </Offcanvas.Body>
            </Container>
      )
}
export default SideNav;