import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UseSessionStorage } from "../../../constants/SessionStorage";

const LordPanel = () => {
  const navigate = useNavigate();

  const [user, setUser] = UseSessionStorage("userInfo", "");

  useEffect(() => {
    setUser(user); //optional
    if (user.userRole !== "Landlords") {
      navigate(`/home`);
    }
  }, []);

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
                    to="/landlord/Profile"
                    className="text-white nav-link"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="p-2">
                  <NavLink
                    to="/landlord/listing"
                    className="text-white nav-link"
                  >
                    Listing
                  </NavLink>
                </li>
                <li className="p-2">
                  <NavLink
                    to="/landlord/booking"
                    className="text-white nav-link"
                  >
                    Booking
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
  );
};

export default LordPanel;
