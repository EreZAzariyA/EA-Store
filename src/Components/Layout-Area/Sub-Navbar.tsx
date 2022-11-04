import { Nav, Placeholder } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SubCategoryModel from "../../Models/sub-category-model";

interface SubNavbarProps {
      bodyWidth: number;
      subCategories: SubCategoryModel[];
}


const SubNavbar = (props: SubNavbarProps) => {
      return (
            <>
                  <Nav fill variant="tabs">
                        {props.subCategories?.map(subCategory =>
                              <Nav.Item key={subCategory.subCategoryId}>
                                    <Nav.Link as={NavLink} to={'/category/' + subCategory.categoryId + '/sub-category/' + subCategory.subCategoryId} style={{ color: 'black', border: '1px solid lightGray' }}>
                                          {subCategory.subCategory}
                                    </Nav.Link>
                              </Nav.Item>
                        )}

                        {props.subCategories === undefined &&
                              <UndefinedNav length={6} />
                        }
                  </Nav>
            </>
      )
}

export default SubNavbar;


interface UndefinedNavProps {
      length: number
}

export const UndefinedNav = (props: UndefinedNavProps) => {

      const arr: JSX.Element[] = [];

      while (arr.length < props.length) {
            const nav =
                  <Placeholder key={arr.length} style={{ width: '5rem' }} className='placeholder-wave m-auto' />

            arr.push(nav);
      }

      return (
            <>
                  {arr}
            </>
      )
}