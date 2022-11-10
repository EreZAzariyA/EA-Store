import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../Models/user-model";
import { authStore } from "../../Redux/Store";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { Button, Col, Container, Dropdown, Nav, Row } from "react-bootstrap";

import Logout from "./Logout";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState()?.user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Container>

            {/* If there is no user */}
            {!user &&
                <Row>
                    <Col lg="12">
                        Hello Guest
                    </Col>
                    <Col lg="12">
                        <NavLink to="auth/login">
                            <Button size="sm">

                                Login
                                <BiLogIn size='25px' />
                            </Button>
                        </NavLink>
                    </Col>
                </Row>
            }

            {/* If there is a user */}
            {user &&
                <Row>
                    <Col lg="12">
                        Hello {user.firstName + " " + user.lastName}
                    </Col>

                    <Col lg="12">
                        <Button variant="outline-danger" onClick={Logout} size='sm'>
                            <BiLogOut size='25px' />
                            Logout
                        </Button>
                    </Col>
                </Row>
            }
        </Container >
    );
}

export default AuthMenu;
