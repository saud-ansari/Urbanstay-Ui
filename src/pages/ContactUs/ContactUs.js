import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap'
import { ChatLeftDotsFill, EnvelopeFill, GeoAltFill, TelephoneFill } from 'react-bootstrap-icons';
import "./ContactUs.css";
import axios from 'axios';
import { apiBaseUrl } from '../../constants/apiConstant';
import { toast } from 'react-toastify';

const ContactUs = () => {

  const [validated, setValidated] = useState(false);
  const [data,setData] = useState({
    name: "",
    email: "",
    message:""
  })

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setData({...data,[name]:value});
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.currentTarget;
  
    // Validate the form fields
    if (form.checkValidity() === false) {
      event.stopPropagation(); 
      toast.error("Please fill in all required fields."); 
      if (data.name && data.email && data.message) {
        axios.post(`${apiBaseUrl}/ContactUs`, data)
          .then((res) => {
            toast.success("Message Sent Successfully");            
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong while sending the message."); 
          });
      } else {
        toast.error("All fields are required.");
      }
    }
  
    setValidated(true);
  };
  


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
                          name='name'
                          value={data.name}
                          onChange={handleChange}
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
                          name='email'
                          value={data.email}
                          onChange={handleChange}
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
                          name='message'
                          value={data.message}
                          onChange={handleChange}
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
