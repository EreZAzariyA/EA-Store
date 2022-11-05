import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import CategoryModel from "../../Models/Category-Model";
import { useCallback, useEffect, useState } from "react"
import SubCategoryModel from "../../Models/sub-category-model";
import productsServices from "../../Services/Products-Services";
import { UndefinedNav } from "./Sub-Navbar";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { NavLink } from "react-router-dom";

interface SideNavProps {
      categories: CategoryModel[];
}

const SideNav = (props: SideNavProps) => {
      const [subCategories, setSubCategories] = useState<SubCategoryModel[]>();

      const getAllSubCategories = useCallback(async () => {
            const subCategories = await productsServices.getAllSubCategories();
            setSubCategories(subCategories);
      }, [])

      useEffect(() => {
            getAllSubCategories();
      })

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
            <Container fluid='true'>
                  <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Categories</Offcanvas.Title>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                        {props.categories &&

                              <Navbar collapseOnSelect expand='xs' className="justify-content-center">

                                    {props.categories?.map(category =>
                                          <Nav key={category?.categoryId}>

                                                <NavDropdown
                                                      title={category?.category}
                                                      className="justify-content-center">
                                                      {getSubCategoriesByCategoryId(category?.categoryId)}
                                                </NavDropdown>
                                          </Nav>
                                    )}
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