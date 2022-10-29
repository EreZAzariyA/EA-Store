import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../Models/credentials-model";
import { authStore } from "../../Redux/Store";
import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";
import "./Auth-Style.css";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const user = authStore.getState().user;
    //     if (user) {
    //         notifyService.error("Your already logged-in.");
    //         navigate("/");
    //     }
    // }, []);

    async function submit(credentials: CredentialsModel) {
        try {
            await authServices.login(credentials);
            notifyService.success("Your in...");
            navigate("/");

        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <h1>Login page</h1>
            </Row>

            <Row>
                <Container>

                    <Form onSubmit={handleSubmit(submit)} className="form">
                        <Form.FloatingLabel label="Email"
                            className="mb-3">
                            <Form.Control type="email" placeholder="example@gmail.com" required {...register("email")}></Form.Control>
                        </Form.FloatingLabel>

                        <Form.FloatingLabel label="Password"
                            className="mb-3">
                            <Form.Control type="password" placeholder="******" required {...register("password")}></Form.Control>
                        </Form.FloatingLabel>

                        <Button variant="success" type="submit">Login</Button>

                    </Form>
                    <Row style={{ color: 'black' }}>
                        <Col xs='5'>
                            <span>Don`t have account? </span>
                            <NavLink to={"/auth/register"}>
                                Register
                            </NavLink>
                        </Col>
                        <Col xs='2'>
                            <strong>Or</strong>
                        </Col>
                        <Col xs='5'>
                            <span>Continue as a guest </span>
                            <NavLink to={"/auth/register"}>
                                Continue
                            </NavLink>
                        </Col>
                    </Row>
                </Container>
            </Row>

        </Container >

    )
}

export default Login;
