import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";
import { Alert, Container } from "react-bootstrap";

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
  });
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      user.mobileNo
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
        <div className="card login-card">
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
                <form onSubmit={handleSubmit} noValidate>
                  {message && (
                    <Alert variant="danger" className="my-2">
                      {message}
                    </Alert>
                  )}
                  <div className="form-group mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      maxLength={20}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      maxLength={20}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={user.username}
                      onChange={handleChange}
                      maxLength={20}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      maxLength={20}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      maxLength={50}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label>Mobile No</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobileNo"
                      value={user.mobileNo}
                      onChange={handleChange}
                      maxLength={10}
                    />
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Register;
