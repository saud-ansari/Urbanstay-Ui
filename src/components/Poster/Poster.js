import React from 'react';
import './Poster.css';
import Banner from '../../assets/img/banner1.jpg';
import { Card, Image } from 'react-bootstrap';

const Poster = () => {
  return (
    <div className="poster-container">
      <div className="poster-img">
        <Image src={Banner} alt="Poster" className="w-100 h-100" />
        <div className="img-label">
          <h1>Stay At Hawai</h1>
          <p>Join Us for a weekend gateway</p>
        </div>
      </div>
      <div className="card-container">
        <Card className="custom-card">
          <Card.Body>Data</Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Poster;
