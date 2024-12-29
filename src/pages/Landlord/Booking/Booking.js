import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../constants/apiConstant";
import { Accordion } from "react-bootstrap";
import { format } from "date-fns";

const Booking = ({ id }) => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/Booking/${id}`)
      .then((res) => {
        setBooking(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <h2 className="text-center my-5">Booking Details</h2>
      {booking &&
        booking.map((book, index) => (
          <Accordion defaultActiveKey="0" className="mx-5" key={index}>
            <Accordion.Item eventKey={index.toString()}>
              <Accordion.Header>
                {/* Flex container to space out the header content */}
                <div className="d-flex w-100 justify-content-between align-items-center">
                  {/* Property Name */}
                  <h4>{book.propertyName}</h4>

                  {/* Status Button */}
                  <button
                    style={{
                      color: book.status === "pending" ? "red" : "green",
                      border: "1px solid black",
                      backgroundColor: "transparent",
                      margin: "0 20px",
                      padding: "10px 15px",
                    }}
                  >
                    {book.status && book.status === "pending"
                      ? "Not Confirmed"
                      : "Confirmed"}
                  </button>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <strong>Name : </strong> {book.guestName} <br />
                <strong>In Date : </strong> {(book.checkInDate && format(book.checkInDate, "dd-MM-yyyy")) || "N/A"} <br />
                <strong> Out Date : </strong> {(book.checkOutDate && format(book.checkOutDate,"dd-MM-yyyy")) || "N/A"} <br />
                <strong>No Of Guests : </strong> {book.numberOfGuests} <br />
                <strong>Amount : </strong> {book.totalPrice} <br />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </>
  );
};

export default Booking;
