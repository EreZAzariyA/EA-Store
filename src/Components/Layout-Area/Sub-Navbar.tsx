import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SubCategoryModel from "../../Models/sub-category-model";

interface SubNavbarProps {
      bodyWidth: number;
      subCategories: SubCategoryModel[];
}


const SubNavbar = (props: SubNavbarProps) => {
      return (
            <>
                  {props.subCategories &&
                        <Nav fill variant="tabs">
                              {props.subCategories?.map(subCategory =>
                                    <Nav.Item key={subCategory.subCategoryId}>
                                          <Nav.Link as={NavLink} to={'/category/' + subCategory.categoryId + '/sub-category/' + subCategory.subCategoryId} style={{ color: 'black', border: '1px solid lightGray' }}>
                                                {subCategory.subCategory}
                                          </Nav.Link>
                                    </Nav.Item>
                              )}
                        </Nav>
                  }

                  {props.subCategories === undefined &&
                        <Nav fill variant="tabs">
                              <UndefinedNav length={6} colWidth={12} />
                        </Nav>
                  }

            </>
      )
}

export default SubNavbar;


interface UndefinedNavProps {
      length: number;
      colWidth: number;
}

export const UndefinedNav = (props: UndefinedNavProps) => {

      const arr: JSX.Element[] = [];

      while (arr.length < props.length) {
            const myCostumeNavItem =
                  <Nav.Item key={arr.length}>
                        <Nav.Link>
                              <span className={`placeholder placeholder-wave col-` + props.colWidth} />
                        </Nav.Link>
                  </Nav.Item>

            arr.push(myCostumeNavItem);
      }

      return (
            <>
                  {arr}
            </>
      )
}