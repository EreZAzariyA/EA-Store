import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SubCategoryModel from "../../Models/sub-category-model";

interface SubNavbarProps {
      bodyWidth: number;
      subCategories: SubCategoryModel[];
}


const SubNavbar = (props: SubNavbarProps) => {
      return (
            <Nav fill variant="tabs">
                  {props.subCategories?.map(subCategory =>
                        <Nav.Item key={subCategory.subCategoryId}>
                              <Nav.Link as={NavLink} to="/">
                                    {subCategory.subCategory}
                              </Nav.Link>
                        </Nav.Item>
                  )}
            </Nav>
      )
}

export default SubNavbar;