import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { apiBaseUrl } from '../../../constants/apiConstant';
import { toast } from 'react-toastify';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Person, Plus, X } from 'react-bootstrap-icons';
import './UserForm.css'

const UserForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    mobileNo: '',
    roleId: '',
    profilePic: '',
    isActive: true
  });
  const [message, setMessage] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id && id > 0) {
      axios.get(`http://localhost:57614/api/user/${id}`).then((res) => {
        setUser(res.data);
      }).catch((err) => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setUser((prevState) => ({
      ...prevState, [name]: (type === 'checkbox' ? checked : value)
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage();

    if (user.firstName
      && user.lastName
      && user.username
      && (id ? true : user.password)
      && user.email
      && user.mobileNo
      && user.roleId) {

      if (id) {
        axios.put(`${apiBaseUrl}/user/${id}`, user)
          .then((res) => {
            if (res.data) {
              toast.success("User updated successfully.");
              navigate('../users');
            }
          }).catch((err) => console.log(err))
      } else {
        axios.post(`${apiBaseUrl}/user`, user)
          .then((res) => {
            if (res.data === true) {
              toast.success("User added successfully.");
              navigate('../users');
            } else {
              toast.error("Username already exists.");
            }
          }).catch((err) => console.log(err))
      }
    } else {
      setMessage("All * Marks Fields Required!");
      toast.error("All * Marks Fields Required!");
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleUpload(file);
  };

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`${apiBaseUrl}/User/upload`, formData)
      .then((res) => {
        if (res.data) {
          setUser({ ...user, profilePic: res.data.imagePath });
          toast.success('Image Added');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to upload image');
      })
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Body className="p-4">
              <Card.Header className="bg-light">
                <Card.Title>
                  <Person size={24} />
                  {id ? "Edit" : "New"} User
                </Card.Title>
              </Card.Header>

              <Form onSubmit={handleSubmit} noValidate>
                {message && <p className="text-danger my-2">{message}</p>}
                <Row className="my-3">
                  <Col lg={4}>
                    <Form.Group className="mb-3">                      
                      <Form.Label>
                        First Name:*
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={user.firstName}
                        onChange={handleChange}
                        name="firstName"
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Last Name:*
                      </Form.Label>

                      <Form.Control
                        type="text"
                        value={user.lastName}
                        onChange={handleChange}
                        name="lastName"
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group className="mb-3">
                      <Form.Label >
                        Username:*
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={user.username}
                        onChange={handleChange}
                        name="username"
                        disabled={id}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    {!id && (
                      <Form.Group className="mb-3">
                        <Form.Label >
                          Password:*
                        </Form.Label>

                        <Form.Control
                          type="password"
                          value={user.password}
                          onChange={handleChange}
                          name="password"
                        />

                      </Form.Group>
                    )}
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Email:*
                      </Form.Label>

                      <Form.Control
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                      />

                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-3">
                      <Form.Label >
                        Mobile No:*
                      </Form.Label>

                      <Form.Control
                        type="text"
                        value={user.mobileNo}
                        onChange={handleChange}
                        name="mobileNo"
                      />

                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Role:*
                      </Form.Label>

                      <Form.Select
                        value={user.roleId}
                        onChange={handleChange}
                        name="roleId"
                      >
                        <option></option>
                        <option value="1">SuperAdmin</option>
                        <option value="2">Admin</option>
                        <option value="3">Landlord</option>
                        <option value="4">Tenant</option>
                      </Form.Select>

                    </Form.Group>
                  </Col>


                  {id && (
                    <Col lg={4}>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label>
                          Active
                        </Form.Label>

                        <Form.Check
                          checked={user.isActive}
                          onChange={handleChange}
                          name="isActive"
                        />

                      </Form.Group>
                    </Col>
                  )}

                  <Col lg={4}>
                    <Form.Label>ProfilePic File*</Form.Label>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Label>ProfilePic Path</Form.Label>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Control type="text" name='profilePic'
                        value={user.profilePic}
                        disabled />
                    </Form.Group>
                  </Col>

                  <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 9, offset: 3 }}>
                      <Button
                        type="submit"
                        style={{ width: "110px", color: "white", backgroundColor: "#322965", borderColor: "#322965" }}
                        className="me-2"
                      >
                        <Plus size={24} /> {id ? "Update" : "Add"}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        style={{ width: "100px" }}
                        onClick={() => navigate("../users")}
                      >
                        <X size={22} /> Cancel
                      </Button>
                    </Col>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserForm;