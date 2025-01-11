import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Table } from "react-bootstrap";
import { apiBaseImage, apiBaseUrl } from "../../constants/apiConstant";
import { UseSessionStorage } from "../../constants/SessionStorage";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Mybooking = () => {
  const [booking, setBooking] = useState([]);
  const [value, setValue] = UseSessionStorage("userInfo", "");
  const id = value?.id;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/Booking/guest/${id}`)
      .then((res) => {
        setBooking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Container className="my-4">
        <Card>
          <Card.Body>
            <Card.Title>My Booking</Card.Title>
            <Card.Text className="text-muted">
              Here you can see all your booking details and payment status.
            </Card.Text>

            {booking &&
              booking.map((book, index) => (
                <Card className="my-3" >
                  <Card.Body key={index} className="my-2">
                                   
                      <h2 style={{ color: "red", fontWeight: "800" }}>
                        Booking No : #{book.bookingId}
                      </h2>
                      <Row className="my-3">
                        <Col md={2}>
                          <Image
                            src={`${apiBaseImage}/propertyImg/${book.imagePath}`}
                            style={{ width: "150px", height: "100px" }}
                            alt={book.imagePath}
                          />
                        </Col>
                        <Col md={6}>
                          <h4>
                            <b>{book.propertyName}</b>
                          </h4>{" "}
                          <br />
                          <p>
                            {" "}
                            <b>From : </b>{" "}
                            {book.checkInDate &&
                              format(new Date(book.checkInDate), "dd/MM/yyyy")}{" "}
                            <b> To : </b>{" "}
                            {book.checkOutDate &&
                              format(new Date(book.checkOutDate), "dd/MM/yyyy")}{" "}
                          </p>
                        </Col>
                        <Col md={4}>
                          <button
                            style={{
                              backgroundColor:
                                book.status === "pending" || book.status === "Cancelled"
                                  ? "red"
                                  : "green",
                              color: "white",
                              padding: "10px 30px",
                              fontWeight: "600",
                              border: "none",
                            }}
                          >
                            {book.status}
                          </button>

                          {book.status === "Confirmed" &&
                            (!book.payment ||
                              book.payment.every(
                                (pay) => pay.paymentStatus !== "SuccessFull"
                              )) && (
                              <button
                                onClick={() =>
                                  navigate(`/tenants/payment/${book.bookingId}`)
                                }
                                style={{
                                  backgroundColor: "blue",
                                  color: "white",
                                  padding: "10px 30px",
                                  fontWeight: "600",
                                  border: "none",
                                  marginLeft: "10px",
                                }}
                              >
                                Pay Now
                              </button>
                            )}

                          {book.payment &&
                            book.payment.some(
                              (pay) => pay.paymentStatus === "SuccessFull"
                            ) && (
                              <button
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  padding: "10px 30px",
                                  fontWeight: "600",
                                  border: "none",
                                  marginLeft: "10px",
                                }}
                              >
                                Paid
                              </button>
                            )}
                        </Col>
                      </Row>

                      <div >
                        <h4 style={{ color: "blue", fontWeight: "700" }}>Invoice</h4>
                        <Table bordered hover responsive="sm" size="sm">
                          <thead>
                            <tr style={{ backgroundColor: "lightgrey" }}>
                              <th>Property-Name</th>
                              <th>From</th>
                              <th>To</th>
                              <th>No of Guest</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody >
                            <tr >
                              <td className="text-muted">{book.propertyName}</td>
                              <td className="text-muted">
                                {book.checkInDate &&
                                  format(new Date(book.checkInDate), "dd/MM/yyyy")}
                              </td>
                              <td className="text-muted">
                                {book.checkOutDate &&
                                  format(new Date(book.checkOutDate), "dd/MM/yyyy")}
                              </td>
                              <td className="text-muted">{book.numberOfGuests}</td>
                              <td className="text-muted">{book.totalPrice}</td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="text-center">
                                <b>Total</b>
                              </td>
                              <td>{book.totalPrice}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                  
                  </Card.Body>
                </Card>
              ))}

          </Card.Body>
        </Card>


      </Container>
    </>
  );
};

export default Mybooking;
