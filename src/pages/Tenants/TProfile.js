import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { toast } from 'react-toastify';

const TProfile = ({id}) => {

  const navigate = useNavigate();
  
  const [user,setUser] = useState({
    firstName : '',
    lastName : '',
    email : '',
    mobileNo : ''
  });

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value});
    console.log(user)
  }


    useEffect(()=>{
      axios.get(`http://localhost:57614/api/User/${id}`)
      .then((res)=>{
        setUser(res.data);
      })
      .catch((err)=>{
        console.log(err);
      });
    },[id])

    const handleSubmit = () =>{
      axios.put(`http://localhost:57614/api/User/${id}`,user)
      .then((res)=>{
        if (res.data)
        toast.success("Done")
      })
      .catch((err)=>{
        toast.error('Something went wrong');
        console.log(err);
      })
    }

  return (
    <>
    <Container>
        <div className="Form m-5">
          <Form>
            <Row>
              <Col xs="6" sm="6" md="6" lg="6">
              <Form.Label>First Name</Form.Label>
                <Form.Control 
                name="firstName"
                value={user.firstName}
                onChange={handleChange}/>
              </Col>
              <Col xs="6" sm="6" md="6" lg="6">
              <Form.Label>Last Name</Form.Label>
                <Form.Control 
                name="lastName"
                value={user.lastName}
                onChange={handleChange}/>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs="6" sm="6" md="6" lg="6">
              <Form.Label>Email address</Form.Label>
                <Form.Control 
                name="email"
                value={user.email}
                onChange={handleChange}/>
              </Col>
              <Col xs="6" sm="6" md="6" lg="6">
              <Form.Label>Mobile No</Form.Label>
                <Form.Control 
                name="mobileNo"
                value={user.mobileNo}
                onChange={handleChange}/>
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
              <Button style={{ backgroundColor: "#7952b3", color: "white" }} onClick={handleSubmit}>
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
        </div>
      </Container>
    </>
  )
}

export default TProfile