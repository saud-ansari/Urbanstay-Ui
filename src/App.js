import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UserList from './pages/Admin/User/UserList';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import UserForm from './pages/Admin/User/UserForm';
import { apiBaseImage } from './constants/apiConstant';

const App=() =>{

  const [nav,setNav] = useState(false);
  const [imageProfile,setImageProfile] = useState(null);
  const navigate = useNavigate();

  const user = localStorage.getItem('userInfo');

  useEffect(() => {
    if (user) {
      try {
        const userInfo = JSON.parse(user); // Safely parse user data
        setNav(true);
        setImageProfile(userInfo.profilePic || null);
      } catch (error) {
        console.error("Invalid JSON in userInfo:", error);
        localStorage.removeItem('userInfo'); // Clear invalid data
        setNav(false);
        setImageProfile(null);
      }
    } else {
      setNav(false);
      setImageProfile(null);
    }
  }, [user]);
  
  const handlelogout = () => {
    localStorage.removeItem('userInfo');
    setNav(false);
    setImageProfile(null); // Clear profile image on logout
    navigate(`/home`);
  }

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" expand="lg">
        <Container>
          {/* Centered brand logo for small screens */}
          <div className="d-lg-none m-1">
            <Navbar.Brand as={Link} to='/' >
              <img
                src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}  // Adjusted path
                width="100%"
                height="30"
                className="d-inline-block align-top"
                alt="Company Logo"
              />
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="navbarScroll" className='ms-auto p-2 border-0 bg-transparent'
           style={{ boxShadow: 'none' }}
          />

          <Navbar.Collapse id="navbarScroll" className='my-2'>
            <hr />
            {/* Left-aligned links */}
            <Nav className="me-auto" navbarScroll>
              <Nav.Link as={Link} to='/home' aria-label="Home">Home</Nav.Link>
              <Nav.Link as={Link} to='/about' aria-label="About Us">About Us</Nav.Link>
              <Nav.Link as={Link} to='/contact' aria-label="Contact Us">Contact Us</Nav.Link>
            </Nav>

            {/* Centered brand logo for large screens */}
            <Navbar.Brand as={Link} to='/' className="mx-auto d-none d-lg-block">
              <img
                src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}  // Adjusted path
                width="100%"
                height="30"
                className="d-inline-block align-top"
                alt="Company Logo"
              />
            </Navbar.Brand>

            {/* Right-aligned links */}
            <Nav className="ms-auto">

            {
              nav ? (
                  <>
                  <Nav.Link  aria-label="home" onClick={handlelogout}>
                  Sign Out
                  </Nav.Link>
                  <Image src={`${apiBaseImage}ProfilePic/${imageProfile}`} width={50} height={50}/>
                  </>
              ) : (
                <>
                <Nav.Link as={Link} to='/login' aria-label="Login">Login</Nav.Link>
                <Nav.Link as={Link} to='/register' aria-label="Register">Register</Nav.Link>
                </>
              )
            }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      <Routes>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='about' element={<AboutUs />} />
        <Route path='contact' element={<ContactUs />} />
        <Route path='login' element={<Login setNav={setNav}/>} />
        <Route path='register' element={<Register />} />
        {/* Admin */}
        <Route path='admin' element={<AdminLayout />}>
          <Route index element={<Navigate to='dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<UserList />} />
          <Route path='user/:id?' element={<UserForm />} />
        </Route>
      </Routes>

      <ToastContainer theme="colored" />

    </>
  );
}

export default App;
