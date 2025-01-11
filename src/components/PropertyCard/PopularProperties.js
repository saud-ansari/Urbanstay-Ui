import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseImageProperty, apiBaseUrl } from "../../constants/apiConstant";
import { Col, Row, Button, Card, Container, Modal, Form, Image, Table } from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";
import { UseSessionStorage } from "../../constants/SessionStorage";
import "./PopularProperties.css";
import "./BookingCard.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PopularProperties = ({ Searchproperty }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [propertyModal, setPropertyModal] = useState(null);
  // const [propertyId, setPropertyId] = useState("");
  // const [GuestId, setGuestId] = useState("");
  // const [hostId, setHostId] = useState("");
  // const [totalPrice,setTotalPrice] = useState("");

  const [userIn] = UseSessionStorage("userInfo", "");
  const id = userIn?.id;

  const [booking, setBooking] = useState({
    propertyId: "",
    guestId: "",
    hostId: "",
    checkInDate: "",
    checkOutDate: "",
    numberofGuests: "",
    totalPrice: ""
  });

  const [daysDifference, setDaysDifference] = useState(null); // Add state for date difference

  // Update booking state when propertyId, guestId, or hostId changes
  useEffect(() => {
    if (propertyModal) {
      setBooking((prevBooking) => ({
        ...prevBooking,
        propertyId: propertyModal.propertyId, // Ensure the key matches your API response
        hostId: propertyModal.hostId, // Ensure the key matches your API response
        guestId: id,
        totalPrice: propertyModal.pricePerNight, // Ensure the key matches your API response
      }));
    }
  }, [propertyModal, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
    console.log(booking);

    // Calculate date difference if both dates are present
    if (name === "checkInDate" || name === "checkOutDate") {
      const checkInDate = name === "checkInDate" ? value : booking.checkInDate;
      const checkOutDate = name === "checkOutDate" ? value : booking.checkOutDate;

      if (checkInDate && checkOutDate) {
        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const differenceInTime = end - start;

        if (differenceInTime < 0) {
          setDaysDifference("Check-out date should be after check-in date!");
        } else {
          const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
          setDaysDifference(differenceInDays);
        }
      }
    }
  };

  // Fetch properties data
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
    event.preventDefault();
    if (form.checkValidity() === false && !userIn) {
      event.stopPropagation();
      toast.error("Login Required")
      navigate("/login");
      return;
    } else {
      axios
        .post(`${apiBaseUrl}/Booking`, booking)
        .then((res) => {
          navigate(`/tenants/mybooking`);
          toast.success("Booking Successful");
          handleClose();
        })
        .catch((err) => {
          if (err.status === 400) {
            toast.error("Date already reserved");
          }
          console.log(err);
          toast.error("Booking Failed");
        });
    }
    setValidated(true);



  };

  return (
    <Container className="popular-properties">
      <h2 className="text-center">Popular Properties</h2>
      <Row className="property-cards mt-4">
        {properties.slice(0, 8).map((property) => (
          <Col xs={12} sm={6} md={4} lg={3} key={property.id} className="mb-4">
            <Card className="property-card h-100">
              <Card.Img variant="top" src={`${apiBaseImageProperty}${property.imagePath}`} />
              <Card.Body>
                <Card.Title className="title-ellipsis">{property.title}</Card.Title>
                <Row>
                  <Col lg={6} xs={6} className="text-start">
                    <Card.Text>
                      <span className="text-muted">{property.propertyType}</span>
                    </Card.Text>
                  </Col>
                  <Col lg={6} xs={6} className="text-end">
                    <span className="text-muted">
                      <GeoAltFill /> {property.city}
                    </span>
                  </Col>
                </Row>
                <h5 className="price">₨ {property.pricePerNight}</h5>
                <Button variant="primary" className="book-btn" onClick={() => handleBook(property)}>
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
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {propertyModal && (
            <Container>
              <h3 className="title-ellipsis">{propertyModal.title}</h3>
              <Row>
                <Col sm={12} md={6} lg={6}>
                  <img
                    src={`${apiBaseImageProperty}${propertyModal.imagePath}`}
                    alt=""
                    className="main-image"
                  />
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <Row>
                    {[2, 3, 4, 5].map((index) => {
                      const imagePath = propertyModal[`imagePath${index}`];
                      return (
                        imagePath && (
                          <Col key={index} xs={6} lg={6} className="small-image-container">
                            <Image
                              src={`${apiBaseImageProperty}${imagePath}`}
                              alt=""
                              className="small-image"
                            />
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </Col>
              </Row>

              <Row className="my-3">
                <Col xs={12} md={6}>
                  <Table className="sm">
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          <strong>Description:</strong>{" "}
                          <span className="text-muted">{propertyModal.description}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <strong>Address:</strong>{" "}
                          <span className="text-muted">{propertyModal.address}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>City:</strong>{" "}
                          <span className="text-muted">{propertyModal.city}</span>
                        </td>
                        <td>
                          <strong>Code:</strong>{" "}
                          <span className="text-muted">{propertyModal.zipCode}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Country:</strong>{" "}
                          <span className="text-muted">{propertyModal.country}</span>
                        </td>
                        <td>
                          <strong>Property Type:</strong>{" "}
                          <span className="text-muted">{propertyModal.propertyType}</span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs={12} md={6}>
                  <Card className="booking-card mx-auto p-3">
                    <Card.Body>

                      <h5 className="price">
                        ₹{propertyModal.pricePerNight}
                        <span className="night">/ night</span>
                      </h5>

                      <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mt-3">
                          <Col md={6} xs={12}>
                            <Form.Group controlId="checkin-date">
                              <Form.Label>Check-in</Form.Label>
                              <Form.Control
                                required
                                type="date"
                                name="checkInDate"
                                value={booking.checkInDate}
                                onChange={handleChange}
                              />
                              <Form.Control.Feedback type="invalid">
                                Enter Check-In Date
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6} xs={12}>
                            <Form.Group controlId="checkout-date">
                              <Form.Label>Check-out</Form.Label>
                              <Form.Control
                                required
                                type="date"
                                name="checkOutDate"
                                value={booking.checkOutDate}
                                onChange={handleChange}
                              />
                              <Form.Control.Feedback type="invalid">
                                Enter Check-Out Date
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mt-3" controlId="guests">
                          <Form.Label>Guests</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            placeholder="Number of Guests"
                            name="numberofGuests"
                            value={booking.numberofGuests}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Enter Number of Guests
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="mt-3">
                          <Col>
                            <Form.Group controlId="total-price">
                              <Form.Label>Stay Duration</Form.Label>
                              <Form.Control
                                type="text"
                                value={daysDifference}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group controlId="total-price">
                              <Form.Label>Total Price</Form.Label>
                              <Form.Control
                                type="text"
                                value={booking.totalPrice * daysDifference}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className="my-3 text-center text-muted">
                          You won't be charged yet
                        </div>
                        <Button
                          type="submit"
                          className="reserve-btn my-1 w-100"
                          variant="danger"
                          size="lg"
                        >
                          Reserve
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PopularProperties;
