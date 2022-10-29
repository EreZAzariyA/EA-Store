import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../Models/user-model";
import { authServices } from "../../Services/AuthServices";
import notifyService from "../../Services/NotifyService";
import "./Auth-Style.css";


function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function submit(user: UserModel) {
        try {
            await authServices.register(user);
            notifyService.success("registered...");
            navigate("/");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <h1>Register page</h1>
            </Row>
            <Row>

                <Container>
                    <Form className="form" onSubmit={handleSubmit(submit)}>
                        <Form.FloatingLabel
                            label="First name"
                            className="mb-3">
                            <Form.Control
                                type="text"
                                required
                                placeholder="First name"
                                autoFocus
                                {...register("firstName")}>
                            </Form.Control>
                        </Form.FloatingLabel>

                        <Form.FloatingLabel
                            label="Last name"
                            className="mb-3">
                            <Form.Control
                                type="text"
                                required
                                placeholder="Last name"
                                {...register("lastName")}>
                            </Form.Control>
                        </Form.FloatingLabel>

                        <Form.FloatingLabel
                            label="Email address"
                            className="mb-3">
                            <Form.Control
                                type="email"
                                required
                                placeholder="Email"
                                {...register("email")}>
                            </Form.Control>
                        </Form.FloatingLabel>

                        <Form.FloatingLabel
                            label="Password"
                            className="mb-3">
                            <Form.Control
                                type="password"
                                required
                                placeholder="******"
                                {...register("password")}>
                            </Form.Control>
                        </Form.FloatingLabel>

                        <Button variant="success" type="submit">Register</Button>
                    </Form>
                    <Form.Text>
                        <span>Already have account? </span>
                        <NavLink to={"/auth/login"}>
                            Login
                        </NavLink>
                    </Form.Text>
                </Container>
            </Row>

        </Container>
    );
}

export default Register;
