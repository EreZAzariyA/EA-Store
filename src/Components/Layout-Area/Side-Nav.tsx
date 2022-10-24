import { Container, DropdownButton, Nav, Navbar, Offcanvas } from "react-bootstrap";
import CategoryModel from "../../Models/Category-Model";
import { useCallback, useEffect, useState } from "react"
import SubCategoryModel from "../../Models/sub-category-model";
import productsServices from "../../Services/Products-Services";
import { IoMdArrowDropdown } from "react-icons/io"

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
                        <Nav.Link key={subC.subCategoryId}>{subC.subCategory}</Nav.Link>
                  )
            );
      }

      return (
            <Container>
                  <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                        <Nav className="flex-column">
                              {props.categories?.map(category =>
                                    <Navbar expand='xxs' key={category.categoryId} className="justify-content-center">
                                          <Navbar.Toggle value={category.categoryId}>
                                                {category.category} <IoMdArrowDropdown />
                                          </Navbar.Toggle>

                                          <Navbar.Collapse key={category.category}>
                                                <Nav key={category.category}>
                                                      <Nav.Item key={category.categoryId}>
                                                            {getSubCategoriesByCategoryId(category.categoryId)}
                                                      </Nav.Item>

                                                </Nav>
                                          </Navbar.Collapse>
                                    </Navbar>
                              )}


                        </Nav>
                  </Offcanvas.Body>
            </Container>
      )
}
export default SideNav;