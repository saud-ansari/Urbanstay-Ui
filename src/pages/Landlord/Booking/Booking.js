import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../constants/apiConstant";
import { format } from "date-fns";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UseSessionStorage } from "../../../constants/SessionStorage";

const Booking = () => {
  const [booking, setBooking] = useState([]);
  const [value ,setValue] = UseSessionStorage("userInfo", '');
  const navigate = useNavigate();
  const id = value?.id;

  useEffect(() => {
    if (id) { 
      axios
        .get(`${apiBaseUrl}/Booking/${id}`)
        .then((res) => {
          setBooking(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);
  

  return (
    <>
      <h2 className="text-center my-5">Booking Details</h2>
      <Table striped bordered hover responsive='sm'>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Name</th>
            <th>Property Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {booking &&
        booking.map((book, index) => (
          <tr key={index}>
            <td>##{book.bookingId}</td>
            <td>{book.guestName}</td>
            <td>{book.propertyName}</td>
            <td>{(book.checkInDate && format(book.checkInDate, "dd-MM-yyyy")) || "N/A"}</td>
            <td>{(book.checkOutDate && format(book.checkOutDate,"dd-MM-yyyy")) || "N/A"}</td>
            <td>{book.totalPrice}</td>
            <td style={{ color: book.status === 'Cancelled' || book.status === 'pending' ? 'red' : 'green'}}>{book.status}</td>
            <td onClick={()=>navigate(`/landlord/bookingdetails/${book.bookingId}`)} style={{color:'blue', textDecoration:'underline',cursor:'pointer'}}>View</td>
            </tr>
        ))}
        </tbody>
      </Table>      
    </>
  );
};

export default Booking;
