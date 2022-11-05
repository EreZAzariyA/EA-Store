import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import CategoryModel from "../../Models/Category-Model";
import { useCallback, useEffect, useState } from "react"
import SubCategoryModel from "../../Models/sub-category-model";
import productsServices from "../../Services/Products-Services";
import { IoMdArrowDropdown } from "react-icons/io"
import { UndefinedNav } from "./Sub-Navbar";

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
            <Container fluid='true' style={{ overflow: 'auto' }}>
                  <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Categories</Offcanvas.Title>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                        {props.categories &&
                              <Nav variant="tabs" className="flex-column">
                                    {props.categories?.map(category =>
                                          <Navbar expand='xs' key={category.categoryId} className="justify-content-around">
                                                <Navbar.Toggle value={category.categoryId} style={{ borderRadius: '0' }}>
                                                      {category.category}
                                                      <IoMdArrowDropdown />
                                                </Navbar.Toggle>


                                                <Navbar.Collapse>
                                                      <Nav>
                                                            <Nav.Item>
                                                                  {getSubCategoriesByCategoryId(category.categoryId)}
                                                            </Nav.Item>
                                                      </Nav>
                                                </Navbar.Collapse>
                                          </Navbar>
                                    )}
                              </Nav>
                        }

                        {props.categories === undefined &&
                              <Nav variant="tabs" className="flex-column">

                                    <UndefinedNav length={6} colWidth={8} />
                              </Nav>
                              // <>
                              //       <Nav.Item>
                              //             <Nav.Link>
                              //                   <span className="placeholder placeholder-wave col-6"></span>
                              //             </Nav.Link>
                              //       </Nav.Item>
                              //       <Nav.Item>
                              //             <Nav.Link>
                              //                   <span className="placeholder placeholder-wave col-6"></span>
                              //             </Nav.Link>
                              //       </Nav.Item>
                              //       <Nav.Item>
                              //             <Nav.Link>
                              //                   <span className="placeholder placeholder-wave col-6"></span>
                              //             </Nav.Link>
                              //       </Nav.Item>
                              //       <Nav.Item>
                              //             <Nav.Link>
                              //                   <span className="placeholder placeholder-wave col-6"></span>
                              //             </Nav.Link>
                              //       </Nav.Item>
                              // </>
                        }
                  </Offcanvas.Body>
            </Container>
      )
}
export default SideNav;