import React, { useEffect, useState } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UserList from './pages/Admin/User/UserList';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import UserForm from './pages/Admin/User/UserForm';
import { apiBaseImage } from './constants/apiConstant';
import Logo from './assets/img/Logo-icon.png'
import './App.css';
import Profile from './pages/Landlord/Profile/Profile';
import LordPanel from './pages/Landlord/LandLordPanel/LordPanel';
import Listing from './pages/Landlord/Listing/Listing';
import Property from './pages/Landlord/AddProperty/Property';
import TenantPanel from './pages/Tenants/TenantPanel';
import TProfile from './pages/Tenants/TProfile';
import Dropdown from 'react-bootstrap/Dropdown';
import { BoxArrowRight } from 'react-bootstrap-icons';
import Booking from './pages/Landlord/Booking/Booking';

const App = () => {

  const [nav, setNav] = useState(false);
  const [imageProfile, setImageProfile] = useState(null);
  const [navLord, setnavLord] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [Tnav, setTnav] = useState(false);
  const [Anav, setAnav] = useState(false);
  const [userIn, setuserIn] = useState(null);


  const user = localStorage.getItem('userInfo');

  useEffect(() => {
    const userinlocal = localStorage.getItem('userInfo')
    if (userinlocal) {
      setuserIn(userinlocal);
    }
  }, [userIn]);

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


  useEffect(() => {
    if (user) {
      const userInfo = JSON.parse(user);
      const UserID = userInfo.userRole;
      if (UserID === 'Landlords')
        setnavLord(true);
      else if (UserID === 'Tenants')
        setTnav(true);
      else if (UserID === 'Super Admin')
        setAnav(true);
    }
  }, [user])

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      setId(parsedInfo.id); // Extract and store `id`
    }
  }, [id]);


  const handlelogout = () => {
    localStorage.removeItem('userInfo');
    setNav(false);
    setnavLord(false);
    setImageProfile(null); // Clear profile image on logout
    navigate(`/home`);
    setTnav(false)
    setAnav(false)
  }

  return (
    <>
      <Navbar className='Navbar' expand="lg">
        <Container>
          {/* Centered brand logo for small screens */}
          <div className="d-lg-none m-1">
            <Navbar.Brand as={Link} to='/'>
              <img
                src={Logo}
                className="d-inline-block align-top logo-img"
                alt="Company Logo"
                style={{ height: '60px', width: 'auto', display: 'block' }} // Add width:auto and block
              />
            </Navbar.Brand>
          </div>


          <Navbar.Toggle aria-controls="navbarScroll" className='ms-auto p-2 border-0 bg-transparent'
            style={{ boxShadow: 'none' }}
          />

          <Navbar.Collapse id="navbarScroll" className='my-2'>
            <hr />
            {/* Left-aligned links */}
            <Nav className="me-auto" navbarScroll >
              <Nav.Link as={Link} to='/home' aria-label="Home" className='Nav-Text'>Home</Nav.Link>
              <Nav.Link as={Link} to='/about' aria-label="About Us" className='Nav-Text'>About Us</Nav.Link>
              <Nav.Link as={Link} to='/contact' aria-label="Contact Us" className='Nav-Text'>Contact Us</Nav.Link>
            </Nav>

            {/* Centered brand logo for large screens */}
            <Navbar.Brand as={Link} to='/' className="mx-auto d-none d-lg-block">
              <img
                src={Logo}  // Adjusted path
                width="100%"
                height="30"
                className="d-inline-block align-top"
                alt="Company Logo"
              />
            </Navbar.Brand>



            <Nav className="ms-auto">

              {
                nav ? (
                  <>

                    {
                      navLord &&
                      <p className='Navbar' style={{ cursor: 'pointer', margin:'15px 15px' }}
                        onClick={() => navigate(`landlord/AddProperty`)}>
                        Add Listing
                      </p>
                    } 

                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <Image src={`${apiBaseImage}ProfilePic/${imageProfile}`} width={50} height={50} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {
                          Anav &&
                          <>
                            <Dropdown.Item>
                              <Nav.Link as={Link} to='/admin/dashboard' aria-label="admin" className='Nav-Text'>Manage Admin</Nav.Link>
                            </Dropdown.Item>
                          </>
                        }

                        {
                          Tnav &&
                          <>
                            <Dropdown.Item>
                              <Nav.Link as={Link} to='/tenants/profile' aria-label="tenants" className='Nav-Text'>Manage Tenant</Nav.Link>
                            </Dropdown.Item>
                          </>

                        }

                        {
                          navLord &&
                            <>                              
                              <Dropdown.Item>
                                <Nav.Link as={Link} to='/landlord/profile' aria-label="lords" className='Nav-Text'>Manage Landlord</Nav.Link>
                              </Dropdown.Item>
                            </>
                           
                        }
                        <Dropdown.Divider />
                        <Dropdown.Item >
                          <Nav.Link aria-label="home" onClick={handlelogout} style={{ color:'red'}}>                            
                          <BoxArrowRight color='red' size='20' style={{marginRight:'10px'}}/>
                            Sign Out                            
                          </Nav.Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to='/login' aria-label="Login" className='Nav-Text'>Login</Nav.Link>
                    <Nav.Link as={Link} to='/register' aria-label="Register" className='Nav-Text'>Register</Nav.Link>
                  </>
                )
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      <Routes>
        <Route index element={<Home />} />
        <Route path='home' element={<Home userIn={userIn} />} />
        <Route path='about' element={<AboutUs />} />
        <Route path='contact' element={<ContactUs />} />
        <Route path='login' element={<Login setNav={setNav} Tnav={Tnav} setTnav={setTnav} Anav={Anav} setAnav={setAnav} />} />
        <Route path='register' element={<Register />} />
        {/* Landlord */}
        <Route path='landlord' element={<LordPanel />}>
          <Route path='Profile' element={<Profile />} />
          <Route path='listing' element={<Listing id={id} />} />
          <Route path='AddProperty/:id?' element={<Property iid={id} />} />
          <Route path='booking' element={<Booking id={id} />} />
        </Route>
        {/* Tenants */}
        <Route path='tenants' element={<TenantPanel />}>
          <Route path='profile' element={<TProfile id={id} />} />
        </Route>
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
