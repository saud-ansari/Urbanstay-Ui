import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'


const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
      if (!localStorage.getItem("userInfo")) {
          navigate("/login?from=admin");
      }
  },[navigate]);

  const logout = () => {
      localStorage.removeItem("userInfo");
      localStorage.clear();
  }

return (
  <Container fluid>
      <Row>
          <Col md={2} style={{ background: '#7952b3', height: '100vh', color: 'white' }}>
              <aside className='mt-2'>
                  <ul>
                      <li className='p-2'>
                          <NavLink to='/admin/dashboard' className='text-white nav-link'>Dashboard</NavLink>
                      </li>
                      <li className='p-2'>
                          <NavLink to='/admin/users' className='text-white nav-link'>Users</NavLink>
                      </li>
                      <li className='p-2'>
                          <NavLink to='/home' className='text-white nav-link' onClick={logout}>Logout</NavLink>
                      </li>
                  </ul>
              </aside>
          </Col>
          <Col md={10}>
              <Outlet />
          </Col>
      </Row>
  </Container>
)
}

export default AdminLayout