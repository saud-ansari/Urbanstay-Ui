import React, { useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const TenantPanel = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userinfo = localStorage.getItem("userInfo");
    if (userinfo) {
      const user = JSON.parse(userinfo);
      if (user.userRole !== "Tenants") {
        navigate(`/home`);
      }
    }
  });

  return (
    <>
     <Container fluid>
        <Row>
          <Col
            md={2}
            style={{ background: "#7952b3", height: "100vh", color: "white" }}
          >
            <aside className="mt-2">
              <ul>
                <li className="p-2">
                  <NavLink
                    to="/tenants/profile"
                    className="text-white nav-link"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="p-2">
                  <NavLink
                    to="/tenants/mybooking"
                    className="text-white nav-link"
                  >
                    My Booking
                  </NavLink>
                </li>
              </ul>
            </aside>
          </Col>
          <Col md={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TenantPanel