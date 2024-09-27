import React from 'react';
import img from '../../assets/img/banner.png';  // Update this path to your banner image
import img2 from '../../assets/img/list/p-4.png';  // Update this path to your content image
import './AboutUs.css';
import { Col, Container, Row } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <>
      <section className='about'>
        {/* Banner Section */}
        <div className='back'>
          <Container>
            <h1>About Us - Who We Are?</h1>
          </Container>
          <img src={img} alt='Banner' className="img-fluid" />
        </div>

        {/* Content Section */}
        <Container className="mt-5">
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <h1 className='conetnt-section'>Our Agency Story</h1>
              <p className="subtitle">Check out our company story and work process</p>

              <p>At UrbanStay, we strive to provide a seamless and comfortable living experience for both short and long-term guests. Our modern, fully-furnished accommodations are designed to offer a perfect blend of comfort, style, and convenience. </p>
              <p>Whether you're traveling for work, leisure, or a long-term stay, UrbanStay offers flexible solutions in prime city locations, ensuring a home-like atmosphere with all the amenities you need. </p>
              <button className='btn2'>More About Us</button>
            </Col>

            {/* Image Section */}
            <Col lg={6} md={12}>
              <img src={img2} alt='Our Agency Story' className="img-fluid about-img" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;
