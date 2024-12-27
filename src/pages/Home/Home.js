import React from "react";
import Poster from "../../components/Poster/Poster";
import { Container } from "react-bootstrap";
import './Home.css';
import ReviewSliderComp from "../../components/ReviewSlider/ReviewSliderComp";
import PopularProperties from "../../components/PropertyCard/PopularProperties";


const Home = ({ userIn }) => {
  return (
    <>
      <Poster />
      <Container className="mt-5">
        <PopularProperties userIn={userIn}/>

        <ReviewSliderComp />
      </Container>
    </>
  );
};

export default Home;
