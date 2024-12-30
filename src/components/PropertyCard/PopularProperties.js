import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseImage, apiBaseUrl } from "../../constants/apiConstant";
import { Col, Row, Button, Card, Container, Modal, CardBody, Form, FormLabel } from "react-bootstrap";
import "./PopularProperties.css";
import { GeoAltFill } from "react-bootstrap-icons";
import "./BookingCard.css";

const PopularProperties = ({ Searchproperty }) => {
  const [properties, setProperties] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [propertModal, setPropertyModal] = useState(null);



  useEffect(() => {
    if (Array.isArray(Searchproperty)) {
      setProperties(Searchproperty);
    } else {
      axios
        .get(`${apiBaseUrl}/Property`)
        .then((res) => {
          setProperties(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [Searchproperty]);

  const handleBook = (property) => {
    setModalShow(true);
    setPropertyModal(property);
  };
  const handleClose = () => setModalShow(false);

  // Property Booking Form Validation
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

    <Container className="popular-properties">
      <h2 className="text-center">Popular Properties</h2>
      <Row className="property-cards mt-4">
        {properties.slice(0, 8).map((property) => (
          <Col xs={12} sm={6} md={4} lg={3} key={property.id} className="mb-4">
            <Card className="property-card h-100">
              <Card.Img
                variant="top"
                src={`${apiBaseImage}/PropertyImg/${property.imagePath}`}
              />
              <Card.Body>
                <Card.Title className="title-ellipsis">
                  {property.title}
                </Card.Title>
                <Row>
                  <Col lg={6} xs={6} className="text-start">
                    <Card.Text>
                      <span className="text-muted">
                        /{property.propertyType}
                      </span>
                    </Card.Text>
                  </Col>
                  <Col lg={6} xs={6} className="text-end">
                    <span className="text-muted">
                      <GeoAltFill />
                      {property.city}
                    </span>
                  </Col>
                </Row>
                <h5 className="price">₨ {property.pricePerNight}</h5>
                <Button
                  variant="primary"
                  className="book-btn"
                  onClick={() => handleBook(property)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={modalShow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            propertModal &&
            <>
              <Container>
                <h3 className="title-ellipsis">{propertModal.title}</h3>
                <Row>
                  <Col className="bg-danger">1</Col>
                  <Col>
                    <Row>
                      <Col className="bg-warning">1</Col>
                      <Col className="bg-secondary">2</Col>
                    </Row>
                    <Row>
                      <Col className="bg-secondary">3</Col>
                      <Col className="bg-warning">4</Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col xs={12} md={6} className="bg-secondary">
                    <Card className="booking-card mx-auto p-3">
                      <Card.Body>
                        <h5 className="price">₹{propertModal.pricePerNight}<span className="night">/ night</span></h5>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                          <Row className="mt-3">
                            <Col md={6} xs={12}>
                              <Form.Group controlId="checkin-date">
                                <Form.Label>Check-in</Form.Label>
                                <Form.Control required type="date"/>
                                <Form.Control.Feedback type="invalid">Enter Check In Date</Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={6} xs={12}>
                              <Form.Group controlId="checkout-date">
                                <Form.Label>Check-out</Form.Label>
                                <Form.Control required type="date" />
                                <Form.Control.Feedback type="invalid">Enter Check Out Date</Form.Control.Feedback> 
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mt-3" controlId="guests">
                            <Form.Label>Guests</Form.Label>
                            <Form.Control required type="number" placeholder="Number of Guests"></Form.Control>
                            <Form.Control.Feedback type="invalid">Enter No. Guests</Form.Control.Feedback> 
                          </Form.Group>

                          <div className="my-3 text-center text-muted">
                            You won't be charged yet
                          </div>
                          <Button type="submit" className="reserve-btn my-1" variant="danger" size="lg" block>
                            Reserve
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>


                    <>
                      {/* <Card>
                      <CardBody>
                        <Container>
                          <p>{propertModal.pricePerNight}/Night</p>
                          <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="bg-warning">
                              <Col className="bg-secondary ">
                              1
                                 <Form.Group as={Col} md="6" controlId="validationCustom01">
                                 <FormLabel>Check IN</FormLabel>
                                 <Form.Control
                                    required
                                    type="date"
                                    placeholder="Date"
                                  />
                                    <Form.Control.Feedback type="invalid">Enter Check In Date</Form.Control.Feedback>
                                </Form.Group> 
                              </Col>
                              <Col>
                                 <Form.Group as={Col} md="6" controlId="validationCustom02">
                                  <FormLabel>Check Out</FormLabel>
                                  <Form.Control
                                    required
                                    type="date"
                                    placeholder="Date"
                                  />
                                  <Form.Control.Feedback type="invalid">Enter Check Out Date</Form.Control.Feedback> 
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button type="submit">Reserve</Button>
                          </Form>
                        </Container>
                      </CardBody>
                    </Card> */}
                    </>
                  </Col>
                  <Col xs={12} md={6} >2</Col>
                </Row>

              </Container>

              {/* <img
                  src={`${apiBaseImage}/PropertyImg/${propertModal.imagePath}`}
                  alt=""
                  className="w-100"
                /> */}
            </>
          }

        </Modal.Body>

      </Modal>
    </Container>
  );
};

export default PopularProperties;
