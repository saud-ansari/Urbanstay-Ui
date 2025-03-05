import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { apiBaseUrl } from "../../constants/apiConstant";
import Footer from "../../components/Footer/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    mobileNo: "",
    roleId: '',
    profilePic: '',
  });
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage();

    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password &&
      user.email &&
      user.mobileNo &&
      user.roleId &&
      user.profilePic
    ) {
      axios
        .post("http://localhost:57614/api/user", user)
        .then((res) => {
          if (res) {
            toast.success("User Register successfully.");
            navigate("/home");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setMessage("All * Marks Fields Required!");
      toast.error("All * Marks Fields Required!");
    }
  };

  return (
    <>
      <Container className="container my-5 d-block justify-content-center">
        <div data-aos="flip-right" className="card login-card">
          <div className="row g-0">
            {/* <!-- Left Side --> */}
            <div className="col-md-6 left-side d-flex flex-column justify-content-center align-items-center">
              <div className="text-center">
                <h2 className="welcome-title">Hello, welcome to!</h2>
                <h2 className="welcome-title">Urbanstay</h2>
                {/* <p className="brand-name">
                <img
                src={Logo}  // Adjusted path
                width="60%"
                height="40"
                className="d-inline-block align-top"
                alt="Company Logo"
              />
                </p> */}
              </div>
            </div>
            {/* <!-- Right Side --> */}
            <div className="col-md-6 right-side">
              <div className="card-body p-4">
                <h5 className="card-title">Create your account</h5>
                <Form onSubmit={handleSubmit} noValidate>
                  {message && (
                    <Alert variant="danger" className="my-2">
                      {message}
                    </Alert>
                  )}
                  <Row>
                    <Col>
                      <div className="form-group mb-3">
                        <label>First Name <span>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={user.firstName}
                          onChange={handleChange}
                          maxLength={20}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group mb-3">
                        <label>Last Name <span>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={user.lastName}
                          onChange={handleChange}
                          maxLength={20}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group mb-3">
                        <label>Username <span>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={user.username}
                          onChange={handleChange}
                          maxLength={20}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group mb-3">
                        <label>Password <span>*</span></label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          maxLength={20}
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="form-group mb-3">
                    <label>Email <span>*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      maxLength={50}
                    />
                  </div>
                  <Row>
                    <Col>
                      <div className="form-group mb-4">
                        <label>Mobile No <span>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          name="mobileNo"
                          value={user.mobileNo}
                          onChange={handleChange}
                          maxLength={10}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group mt-4">
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="3">
                            Role:*
                          </Form.Label>
                          <Col sm="9">
                            <Form.Select
                              value={user.roleId}
                              onChange={handleChange}
                              name="roleId"
                            >
                              <option>Select Role</option>
                              <option value="3">Landlord</option>
                              <option value="4">Tenant</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>

                  <div className="form-group mb-3">
                    <Row>
                      <Col>
                        <Form.Label>ProfilePic *</Form.Label>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Label>ProfilePic Path</Form.Label>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Control type="text" name='profilePic'
                            value={user.profilePic}
                            disabled />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>


                  <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <Link to={`/login`} className="sign-in-link">
                      Already have an account? Login
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default Register;
