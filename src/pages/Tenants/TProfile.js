import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { toast } from 'react-toastify';
import { UseSessionStorage } from '../../constants/SessionStorage';

const TProfile = () => {

  const [id, setId] = useState();
  const [userIn, setUserIn] = UseSessionStorage('userInfo', '');

  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user)
  }

  useEffect(() => {
    if (userIn) {
      setId(userIn.id);
      axios.get(`http://localhost:57614/api/User/${userIn.id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id])

  const handleSubmit = () => {
    axios.put(`http://localhost:57614/api/User/${id}`, user)
      .then((res) => {
        if (res.data)
          toast.success("Done")
      })
      .catch((err) => {
        toast.error('Something went wrong');
        console.log(err);
      })
  }

  return (
    <>
      <Container>
        <Card className="Form m-5">
          <Card.Header>
            <h3 ><span style={{"color":"#322965"}}>{user.username.toLocaleUpperCase()}'S </span> <span className="text-muted">profile</span></h3>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-muted">Update your personal information here.</Card.Title>

            <hr />
            <Form>
              <Row>
                <Col xs="6" sm="6" md="6" lg="6">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange} />
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange} />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs="6" sm="6" md="6" lg="6">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    value={user.email}
                    onChange={handleChange} />
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <Form.Label>Mobile No</Form.Label>
                  <Form.Control
                    name="mobileNo"
                    value={user.mobileNo}
                    onChange={handleChange} />
                </Col>
              </Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px", // Space between buttons
                  marginTop: "20px", // Optional margin for spacing
                }}
              >
                <Button style={{ backgroundColor: "#322965", border: "none", color: "white" }} onClick={handleSubmit}>
                  Save
                </Button>
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "grey",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default TProfile