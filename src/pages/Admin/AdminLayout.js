import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UseSessionStorage } from '../../constants/SessionStorage';


const AdminLayout = () => {
  const navigate = useNavigate();
  const [user] = UseSessionStorage('userInfo','')


  useEffect(() => {
      if (!user) {
          navigate("/login?from=admin");
      }
  },[navigate]);

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