import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { UseSessionStorage } from '../../constants/SessionStorage';
import { FaBars, FaHome, FaTimes, FaUser } from 'react-icons/fa';

const TenantPanel = () => {

  const [user] = UseSessionStorage('userInfo');
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);


  useEffect(() => {
    if (user) {
      if (user.userRole !== "Tenant") {
        navigate(`/home`);
      }
    }
  });

  return (
    <>
      <Container fluid>

        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className="sidebar-menu">
            <li>
              <NavLink to='/tenants/profile' >
                <FaUser /> <span className={isOpen ? "show" : "hide"}>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/tenants/mybooking'>
                <FaHome /> <span className={isOpen ? "show" : "hide"}>My Bookings</span>
              </NavLink>
            </li>
            {/* <li>
                        <Link to="/settings">
                            <FaCog /> <span className={isOpen ? "show" : "hide"}>
                                Settings
                                </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout">
                            <FaSignOutAlt /> <span className={isOpen ? "show" : "hide"}>Logout</span>
                        </Link>
                    </li>  */}
          </ul>
        </div>
        <div className="content" style={{ position: 'absolute' }}>
          <div className="container">
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  )
}

export default TenantPanel