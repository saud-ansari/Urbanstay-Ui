import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { apiBaseUrl } from "../../constants/apiConstant";
import { toast } from "react-toastify";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    bookingId: id,
    amount: "",
    paymentMethod: "",
    transactionId: "",
  });

  // Fetch data from API
  useEffect(() => {
    axios.get(`${apiBaseUrl}/Booking/byId/${id}`)
      .then((res) => {
        if (res.data) {
          setData((prevData) => ({
            ...prevData,
            amount: res.data[0].totalPrice, // Adjust key based on actual response
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
      });
  }, [id]);
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
        axios.post(`${apiBaseUrl}/Payment`, data)
        .then((res) => {
            navigate(`/tenants/mybooking`);
            toast.success("Payment Successful");
        })
        .catch((error) => {
            console.error("Error making payment:", error);
            toast.error("Payment Failed");
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <h1 className="my-5 d-flex justify-content-center">Payment Details</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="my-5">
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Booking ID</Form.Label>
            <Form.Control
              required
              type="number"
              name="bookingId"
              value={data.bookingId}
              onChange={handleChange}
              disabled
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter Amount"
              name="amount"
              value={data.amount}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustomUsername">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select
              type="text"
              placeholder="Choose"
              aria-describedby="inputGroupPrepend"
              required
              name="paymentMethod"
              value={data.paymentMethod}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="UPI">UPI</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please choose a payment method.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Transaction ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Transaction ID"
              required
              name="transactionId"
              value={data.transactionId}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-center m-5">
          <button
            style={{
              backgroundColor: "#7953B3",
              color: "white",
              padding: "10px 30px",
              border: "none",
            }}
            type="submit"
          >
            Pay Rs {data.amount || 0}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default PaymentDetails;
