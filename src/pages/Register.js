import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: 0,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        mobileNo: '',
    });
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage();

        if (user.firstName
            && user.lastName
            && user.username
            && user.password
            && user.email
            && user.mobileNo) {
            axios.post("http://localhost:57614/api/user", user)
                .then((res) => {
                    if (res) {
                        toast.success("User Register successfully.");
                        navigate('/home');
                    }
                }).catch((err) => console.log(err))
        } else {
            setMessage("All * Marks Fields Required!");
            toast.error("All * Marks Fields Required!");
        }
    }

    return (
        <>            
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Register Form</h5>
                                <hr />
                                <form onSubmit={handleSubmit} noValidate>
                                    {message &&
                                        <div className="alert alert-danger" role="alert">
                                            {message}
                                        </div>
                                    }
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label">First Name:*</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                name="firstName"
                                                value={user.firstName}
                                                onChange={handleChange}
                                                maxLength={20} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label">Last Name:*</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                name="lastName"
                                                value={user.lastName}
                                                onChange={handleChange}
                                                maxLength={20} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label">Username:*</label>
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
                                        <label className="col-sm-3 col-form-label">Password:*</label>
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
                                        <label className="col-sm-3 col-form-label">Email:*</label>
                                        <div className="col-sm-9">
                                            <input type="email"
                                                className="form-control"
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}
                                                maxLength={50} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label">Mobile No:*</label>
                                        <div className="col-sm-9">
                                            <input type="text"
                                                className="form-control"
                                                name="mobileNo"
                                                value={user.mobileNo}
                                                onChange={handleChange}
                                                maxLength={10} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-9 offset-sm-3">
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;
