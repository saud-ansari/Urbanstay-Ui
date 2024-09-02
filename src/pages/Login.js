import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../constants/apiConstant";
import { toast } from "react-toastify";

const Login = ({setNav}) => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        if (user.username && user.password) {
            axios.post(`${apiBaseUrl}/auth/login`, user).then((res) => {
                if (res.data) {
                    setNav(true);
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                    if (res.data.userRole === "Admin") {
                        navigate(`/admin/dashboard`);
                      } else {
                        navigate("/home");
                      }
                    toast.success('Logged In');
                    
                } else {
                    setMessage("Invalid Username or Password.");
                }
            }).catch((err) => console.log(err));
        } else {
            setMessage("Username and Password Required!");
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><Person /> Login Form</h5>
                            <hr />
                            <form onSubmit={handleSubmit} noValidate>
                                {message &&
                                    <div className="row">
                                        <Alert variant='danger' style={{padding: '5px 10px'}}>
                                            {message}
                                        </Alert>
                                    </div>
                                }
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label">Username:</label>
                                    <div className="col-sm-9">
                                        <input type="text"
                                            className="form-control"
                                            name="username"
                                            value={user.username}
                                            onChange={handleChange}
                                            maxLength={20} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label">Password:</label>
                                    <div className="col-sm-9">
                                        <input type="password"
                                            className="form-control"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            maxLength={20} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-9 offset-sm-3">
                                        <button type="submit" className="btn btn-primary">
                                           Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
