import { Col, Container, Row } from "react-bootstrap"

const titleStyle = {
      color: 'white'
}

const Footer = () => {
      return (
            <Container>
                  <Row>
                        <hr />
                  </Row>
                  <Row>
                        <Col sm='4'>
                              <title style={titleStyle}>
                                    Terms
                              </title>
                        </Col>
                        <Col sm='4'>
                              Contact Us
                        </Col>
                        <Col sm='4'>
                              Information
                        </Col>
                  </Row>
            </Container>
      )
}
export default Footer