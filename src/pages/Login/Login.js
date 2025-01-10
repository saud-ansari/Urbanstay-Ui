import axios from "axios";
import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../../constants/apiConstant";

const Login = ({ setNav , setTnav, setAnav , setnavLord,setIsBell}) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (user.username && user.password) {
      axios
        .post(`${apiBaseUrl}/auth/login`, user)
        .then((res) => {
          if (res.data) {
            setNav(true);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            if (res.data.userRole === "Super Admin") {
              setAnav(true);
              navigate(`/admin/dashboard`);
            } else if (res.data.userRole === "Landlords") {
              setnavLord(true);
              setIsBell(false);
              navigate(`/landlord/profile`);
            } else if(res.data.userRole === "Tenants"){
              setTnav(true);
              setIsBell(true);
              navigate(`/tenants/profile`);
            }
            else {
              navigate("/home");
            }
            toast.success("Logged In");
          } else {
            setMessage("Invalid Username or Password.");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setMessage("Username and Password Required!");
    }
  };

  return (
    <Container className="container mt-5 d-block justify-content-center">
      <div className="card login-card">
        <div className="row g-0">
          <div className="col-md-6 left-side d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
              <h2 className="welcome-title">Hello, welcome to!</h2>
              <h2 className="welcome-title">Urbanstay</h2>
            </div>
          </div>
          <div className="col-md-6 right-side">
            <div className="card-body p-4">
              <h5 className="card-title">LogIn</h5>
              <form onSubmit={handleSubmit} noValidate>
                {message && (
                  <Alert variant="danger" className="my-2">
                    {message}
                  </Alert>
                )}
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <div className="text-center mt-3">
                  <Link to={`/register`} className="sign-in-link">
                    Already have an account? Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Login;
