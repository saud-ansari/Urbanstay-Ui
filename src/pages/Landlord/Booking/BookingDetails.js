import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../constants/apiConstant";
import { Container, Table } from "react-bootstrap";
import { format } from "date-fns";
import './Booking.css';
import { toast } from "react-toastify";
//import { UseLocalStorage } from "../../../constants/localstorage";
import { useParams } from "react-router-dom";


const BookingDetails = ({setNotiMssge}) => {
  const [booking, setBooking] = useState([]);
  // const [value, setValue] = UseLocalStorage("userInfo",'');
  // const id = value?.id;

  const {id} = useParams();

  useEffect(() => {
    if(id){
      handleAction();
    }
  }, [id]);

  const handleAction = () =>{
    axios
      .get(`${apiBaseUrl}/Booking/byId/${id}`)
      .then((res) => {
        setBooking(res.data);
      })
      .catch((err) => console.log(err)); 
  };

  const handleConfirm = (book) => {
    axios
      .post(`${apiBaseUrl}/Booking/${book.bookingId}/Confirmed`)
      .then((res) => {
        if (res.data) {
          setNotiMssge(res.data);
          toast.success("Booking Confirmed Successfully");
          handleAction();
        } else {
          toast.error(res.data.message || "Something went wrong!");
          console.error("API error:", res.data);
        }
      })
      .catch((err) => console.error("Error confirming booking:", err));
  };
  
  const handleCancel = (book) => {
    axios
      .post(`${apiBaseUrl}/Booking/${book.bookingId}/Cancelled`)
      .then((res) => {
        if (res.data) {
          setNotiMssge(res.data);
          toast.info("Booking Cancelled Successfully");
          handleAction();
        } else {
          toast.error(res.data.message || "Something went wrong!");
          console.error("API error:", res.data);
        }
      })
      .catch((err) => console.error("Error canceling booking:", err));
  };
  

  return (
    
      <>
        <h2 className="text-center my-5">Booking Details</h2>
        <Container>
          <Table bordered hover responsive="sm" size="lg" className="custom-table">
            {booking.length > 0 &&
              booking.map((book, index) => (
                <tbody key={index}>
                  {/* User Details Section */}
                  <tr>
                    <td colSpan="4" className="text-center section-header">
                      User Details
                    </td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{book.guestName}</td>
                    <th>Username</th>
                    <td>{book.username}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{book.email}</td>
                    <th>Contact No</th>
                    <td>{book.mobileNo}</td>
                  </tr>
  
                  {/* Booking Details Section */}
                  <tr>
                    <td colSpan="4" className="text-center section-header">
                      Booking Details
                    </td>
                  </tr>
                  <tr>
                    <th>Booking ID</th>
                    <td>00{book.bookingId}</td>
                    <th>Property Name</th>
                    <td>{book.propertyName}</td>
                  </tr>
                  <tr>
                    <th>Check-in Date</th>
                    <td>
                      {book.checkInDate
                        ? format(new Date(book.checkInDate), "dd-MM-yyyy")
                        : "N/A"}
                    </td>
                    <th>Check-out Date</th>
                    <td>
                      {book.checkOutDate
                        ? format(new Date(book.checkOutDate), "dd-MM-yyyy")
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th>Booking Date</th>
                    <td>
                      {book.createdAt
                        ? format(new Date(book.createdAt), "dd-MM-yyyy")
                        : "N/A"}
                    </td>
                    <th>Total Price</th>
                    <td>{book.totalPrice}</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td colSpan="3">
                      {book.payment?.map((pays, index) => (
                        <span
                          key={index}
                          style={{
                            color:
                              pays.paymentStatus === "pending" ? "red" : "green",
                          }}
                        >
                          {pays.paymentStatus || "N/A"}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th>Amount Paid</th>
                    <td>
                      {book.payment
                        ? book.payment.map((p) => p.amount).join(", ")
                        : "N/A"}
                    </td>
                    <th>Transaction ID</th>
                    <td>
                      {book.payment
                        ? book.payment.map((p) => p.transactionId).join(", ")
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th>Booking Status</th>
                    <td
                      colSpan="3"
                      style={{
                        color:
                          book.status === "pending" || book.status === "Cancelled"
                            ? "red"
                            : "green",
                      }}
                    >
                      {book.status === "pending" || book.status === "Cancelled"
                        ? "Not Confirmed"
                        : "Confirmed"}
                    </td>
                  </tr>
                </tbody>
              ))}
          </Table>
  
          {/* Confirm and Cancel Buttons */}
          {booking.length > 0 &&
            booking.map((book, index) => (
              <div className="text-center" key={index}>
                <button
                  className="action-button reject-button"
                  onClick={() => handleCancel(book)}
                >
                  Reject
                </button>
                <button
                  className="action-button confirm-button"
                  onClick={() => handleConfirm(book)}
                >
                  Confirm
                </button>
              </div>
            ))}
        </Container>
      </>
  );
};

export default BookingDetails;
