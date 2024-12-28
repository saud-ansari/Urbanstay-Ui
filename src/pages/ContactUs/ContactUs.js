import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap'
import { ChatLeftDotsFill, EnvelopeFill, GeoAltFill, TelephoneFill } from 'react-bootstrap-icons';
import "./ContactUs.css";

const ContactUs = () => {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

  }


  return (
    <>
      <Container className='my-5'>
        <Row>
          <Col sm={6}>
            <Row>
              <Col xs={12} md={6} >
                <Card className="text-center m-3 mx-auto Tiles-Card ">
                  <CardBody className='Tiles-Card-Body'>
                    <ChatLeftDotsFill size={50} />
                    <Card.Text >
                      "Have a question? Reach out to us anytime"
                    </Card.Text>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={6} >
                <Card className="text-center m-3 mx-auto Tiles-Card">
                  <CardBody className='Tiles-Card-Body'>
                    <TelephoneFill size={50} />
                    <Card.Text className="my-1">
                      +91 1234567890 <br />
                      +91 9087654321<br />
                      (Toll free)
                    </Card.Text>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} >
                <Card className="text-center m-3 mx-auto Tiles-Card">
                  <CardBody className='Tiles-Card-Body'>
                    <EnvelopeFill size={50} />
                    <Card.Text>
                      (Drop your query on mail) <br />
                      urbanstay@gmail.com
                    </Card.Text>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={6} >
                <Card className="text-center m-3 mx-auto Tiles-Card">
                  <CardBody className='Tiles-Card-Body'>
                    <GeoAltFill size={50} />
                    <Card.Text className="my-1">
                      Urbanstay Office, S.V. road, Malad west, Mumbai -400095.
                    </Card.Text>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col sm={6}>
            <Card className="text-center my-2 py-3" >
              <Container>
                <Card.Title className="my-3">
                  <h1 >Contact Us</h1>
                  </Card.Title>
                <Card.Body>

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter your Name"
                        />
                        <Form.Control.Feedback type="invalid">Please enter your Name</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="validationCustom02">
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Email Id"
                        />
                        <Form.Control.Feedback type="invalid">Please enter your a Valid Email ID</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Control
                          required
                          as="textarea"
                          placeholder="Message"
                          rows={3}
                        />
                        <Form.Control.Feedback type="invalid">Please enter your Message</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Button type="submit">Submit form</Button>
                  </Form>

                </Card.Body>
              </Container>
            </Card>


          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ContactUs
