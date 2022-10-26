import { Container, FloatingLabel, Form } from "react-bootstrap"

export const SearchPage = () => {
      return (
            <Container>
                  <FloatingLabel
                        controlId="floatingInput"
                        label="Search products"
                        className="mb-3"
                  >
                        <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
            </Container>
      )
}