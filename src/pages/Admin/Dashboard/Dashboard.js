import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseSessionStorage } from '../../../constants/SessionStorage';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import './Dashboard.css'
import PropertyBarChart from '../../../components/Charts/AdminCharts/PropertyBarChart';
import axios from 'axios';
import { GraphUpArrow } from 'react-bootstrap-icons';

const Dashboard = () => {

  const [user] = UseSessionStorage('userInfo', '')
  const navigate = useNavigate();
  const [totalTenants, setTotalTenants] = useState('');
  const [totalLandlords, setTotalLandlords] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {

    if (!user) {
      navigate('/login?=admin')
    }
  }, [navigate, user])

  const tenantCount = () => {
    axios.get('http://localhost:57614/tenant')
      .then((response) => {
        if (response.data) {
          setTotalTenants(response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  };

  useEffect(() => {
    tenantCount();
  }, [totalTenants, totalLandlords, totalProperties])

  return (
    <>

      <h4 className='mt-2 float-end'>
        <Badge bg='light' style={{ color: 'rgb(121, 82, 179)' }}>
          <GraphUpArrow className='me-1' /> Dashboard
        </Badge>
      </h4>
      <h3 className='my-3'>Welcome,
        <span className='text-capitalize fs-1 fw-bolder ' style={{ color: 'rgb(121, 82, 179)' }}>
          {user.userName}
        </span>
      </h3>

      <Row>
        <Col>
          <Card className='summary-card' style={{ background: "linear-gradient(to right, #FFBA94, #FF8296)" }}>
            <Card.Body className="text-center">
              <Card.Title>Total Registerd Tenants</Card.Title>
              <Card.Text>
                <h1>{totalTenants}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='summary-card' style={{ background: "linear-gradient(to right, #87C6F8, #218FE4)" }}>
            <Card.Body className="text-center">
              <Card.Title>Total Registerd Landlords</Card.Title>
              <Card.Text>
                <h1>10</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='summary-card' style={{ background: "linear-gradient(to right, #7DD8D0, #22D0B6)" }}>
            <Card.Body className="text-center">
              <Card.Title>Total Registerd Properties</Card.Title>
              <Card.Text>
                <h1>30</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12} lg={12} className='Summary-chart'>
          <Card className='my-3'>
            <Card.Body>
              <PropertyBarChart />
            </Card.Body>
          </Card>
        </Col>        
      </Row>


    </>
  )
}

export default Dashboard
