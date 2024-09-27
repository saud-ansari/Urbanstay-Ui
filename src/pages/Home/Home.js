
import React from "react";
import Poster from "../../components/Poster/Poster";
import { Container } from "react-bootstrap";

import './Home.css';
import ReviewSliderComp from "../../components/ReviewSlider/ReviewSliderComp";
import PopularProperties from "../../components/PropertyCard/PopularProperties";


const Home = () => {


  return (
    <>
      <Poster />
      <Container className="mt-5">
        <PopularProperties/>

        <ReviewSliderComp />
      </Container>
    </>
  );
};

export default Home;
