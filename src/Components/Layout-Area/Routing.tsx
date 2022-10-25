import { Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home-Page";

const Routing = () => {
      return (
            <Container>
                  <Row>
                        <Routes>
                              <Route path="/" element={<HomePage />} />
                        </Routes>
                  </Row>
            </Container>
      )
}

export default Routing;