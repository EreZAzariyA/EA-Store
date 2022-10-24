import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
      return (
            <Container style={{ fontFamily: 'fantasy', textDecoration: 'underline' }}>
                  <Row style={{ height: '100px', backgroundColor: 'lightgray' }}>
                        <Col sm='4' md='4' xl='4' xxl='4'>
                              Terms
                        </Col>
                        <Col sm='4' md='4' xl='4' xxl='4'>
                              Contact Us
                        </Col>
                        <Col sm='4' md='4' xl='4' xxl='4'>
                              Information
                        </Col>
                  </Row>
            </Container>
      )
}
export default Footer