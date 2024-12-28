import React, { useState } from "react";
import Poster from "../../components/Poster/Poster";
import { Container } from "react-bootstrap";
import './Home.css';
import ReviewSliderComp from "../../components/ReviewSlider/ReviewSliderComp";
import PopularProperties from "../../components/PropertyCard/PopularProperties";


const Home = ({ userIn }) => {

  const [Searchproperty, setSearchProperty] = useState({
    city: '',
    checkInDate: '',
    checkOutDate: ''
  });

  return (
    <>
      <Poster  Searchproperty={Searchproperty} setSearchProperty={setSearchProperty}/>
      <Container className="mt-5">
        <PopularProperties userIn={userIn} Searchproperty={Searchproperty}/>
        <ReviewSliderComp />
      </Container>
    </>
  );
};

export default Home;
