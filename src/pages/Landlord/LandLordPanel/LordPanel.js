import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { UseSessionStorage } from "../../../constants/SessionStorage";
import { FaBars, FaCog, FaHome, FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";

const LordPanel = () => {
  const navigate = useNavigate();

  const [user, setUser] = UseSessionStorage("userInfo", "");

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setUser(user); //optional
    if (user.userRole !== "Landlord") {
      navigate(`/home`);
    }
  }, []);

  return (
    <>
      <Container fluid>

        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className="sidebar-menu">
            <li>
              <NavLink to='/landlord/Profile' >
              <FaUser /><span className={isOpen ? "show" : "hide"}>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/landlord/listing'>
              <FaHome /> <span className={isOpen ? "show" : "hide"}>Listing</span>
              </NavLink>
            </li>
            <li>
              <Link to="/landlord/booking">
                <FaCog /> <span className={isOpen ? "show" : "hide"}>
                  Bookings
                </span>
              </Link>
            </li>
            {/* <li>
              <Link to="/logout">
                <FaSignOutAlt /> <span className={isOpen ? "show" : "hide"}>Logout</span>
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="content" style={{ position: 'absolute' }}>
          <div className="container">
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  );
};

export default LordPanel;
