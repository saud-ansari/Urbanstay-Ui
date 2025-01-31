import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseSessionStorage } from '../../../constants/SessionStorage';
import { Card, Col, Row } from 'react-bootstrap';
import './Dashboard.css'
import PropertyBarChart from '../../../components/Charts/AdminCharts/PropertyBarChart';
import axios from 'axios';

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

  const tenantCount = () =>{
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
      <h3>Dashboard</h3>
      <h1>Welcome {user.userName}</h1>

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
        <Col xs={12} lg={6} className='Summary-chart'>
          <Card>
            <Card.Body>
              <PropertyBarChart />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6} className='Summary-chart'>
          <Card>
            <Card.Body>3
              {/* <PieChart/> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>


    </>
  )
}

export default Dashboard
