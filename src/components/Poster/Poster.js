import React, { useEffect, useState } from 'react';
import Banner1 from '../../assets/img/banner1.jpg';
import Banner2 from '../../assets/img/banner2.jpg';
import Banner3 from '../../assets/img/banner3.jpg';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import './Poster.css';
import axios from 'axios';

const Poster = ({ Searchproperty, setSearchProperty }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);

  const banners = [Banner1, Banner2, Banner3];
  const labels = [
    { title: 'Stay At Hawaii', subtitle: 'Join Us for a weekend getaway' },
    { title: 'Explore Bali', subtitle: 'Discover the beauty of Bali' },
    { title: 'Vacation in Maldives', subtitle: 'Relax at the tropical paradise' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
        setFade(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      Searchproperty.city &&
      Searchproperty.checkInDate &&
      Searchproperty.checkOutDate
    ) {
      const url = `http://localhost:57614/api/Property/SearchByDateAndCity?checkInDate=${Searchproperty.checkInDate}&checkOutDate=${Searchproperty.checkOutDate}&city=${encodeURIComponent(Searchproperty.city)}`;

      axios
        .get(url)
        .then((res) => {
          if (res.data) {
            setSearchProperty(res.data); // Update search results
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="poster-container">
      <div className={`poster-img ${fade ? 'fade-out' : 'fade-in'}`}>
        <img src={banners[currentSlide]} alt="Poster" className="w-100 h-100" />
        <div className="img-label">
          <h1 className="Carousel-title">{labels[currentSlide].title}</h1>
          <p className="Carousel-Subtitle">{labels[currentSlide].subtitle}</p>
        </div>
      </div>

      {/* Search-destination component */}
      <div className="card-container">
        <Card className="custom-card">
          <Card.Body>
            <Form className="search-bar">
              <Row className="m-2">
                <Col xs={12} lg={4}>
                  <Form.Group controlId="searchDestination">
                    <Form.Label className="form-label">Where</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search Destination"
                      name="city"
                      value={Searchproperty.city || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} lg={2} className="input-field">
                  <Form.Group controlId="checkIn">
                    <Form.Label>Check In</Form.Label>
                    <Form.Control
                      type="date"
                      name="checkInDate"
                      value={Searchproperty.checkInDate || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} lg={2} className="input-field">
                  <Form.Group controlId="checkOut">
                    <Form.Label>Check Out</Form.Label>
                    <Form.Control
                      type="date"
                      name="checkOutDate"
                      value={Searchproperty.checkOutDate || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} lg={2} className="input-field">
                  <Form.Group controlId="guests">
                    <Form.Label>Guest</Form.Label>
                    <Form.Control type="text" placeholder="Add Guest" />
                  </Form.Group>
                </Col>

                <Col xs={6} lg={2} className="mt-2 btn-container">
                  <Button className="w-100 check-btn" onClick={handleSubmit}>
                    Check Availability
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Poster;
