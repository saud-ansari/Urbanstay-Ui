import React, { useEffect, useState } from "react";
import Poster from "../components/Poster/Poster";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import { apiBaseImage, apiBaseUrl } from "../constants/apiConstant";
import Slider from "react-slick";

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/Property`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
  };

  return (
    <>
      <Poster />

      <Container className="mt-5">
        <h3
          style={{ fontWeight: "600" }}
          className="text-muted d-flex justify-content-center"
        >
          Popular Properties
        </h3>

        <div className="Product-List mt-5">
          <Row className="m-5">
            {product &&
              product.map((item) => {
                return (
                  <Col
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    key={item.id}
                    className="Product-List-Item mb-3"
                  >
                    <Image
                      src={`${apiBaseImage}/PropertyImg/${item.imagePath}`}
                      width={290}
                      height={230}
                    />
                    <div className="description mt-3">
                      <h5>
                        {item.title}{" "}
                        <span className="text-muted" style={{fontSize:'16px'}}>({item.city})</span>
                      </h5>
                    </div>

                    <p className="text-muted">{item.propertyType}</p>
                    <h5 style={{ fontWeight: "700" }}>
                      ₨ {item.pricePerNight}
                    </h5>
                    <button className="btn-Book btn-purple">Book Now</button>
                  </Col>
                );
              })}
          </Row>
        </div>

        <Slider {...settings} className="my-5">
          <Card className="carousel-slide shadow">
            <h5 className="d-flex justify-content-center">What our recent traveler say</h5>
            <p>
              ojdofjewf pefjejfpejfweo foejfpoefjeo foefjeofjeofjoepf
              eofjpoewjfpoefjeofjeofpjefoje ofjeofj lhwdhwdiwjdiwjdwdjwdj djepo
              djopdjpoed
            </p>
            <h5 className="text-muted d-flex justify-content-center">
              Sayyed Faizan
            </h5>{" "}
          </Card>
          <Card className="carousel-slide shadow">
            <h5 className="d-flex justify-content-center">What our recent traveler say</h5>
            <p>
              ojdofjewf pefjejfpejfweo foejfpoefjeo foefjeofjeofjoepf
              eofjpoewjfpoefjeofjeofpjefoje ofjeofj lhwdhwdiwjdiwjdwdjwdj djepo
              djopdjpoed
            </p>
            <h5 className="text-muted d-flex justify-content-center">
              Sayyed Faizan
            </h5>{" "}
          </Card>
          <Card className="carousel-slide shadow">
            <h5 className="d-flex justify-content-center">What our recent traveler say</h5>
            <p>
              ojdofjewf pefjejfpejfweo foejfpoefjeo foefjeofjeofjoepf
              eofjpoewjfpoefjeofjeofpjefoje ofjeofj lhwdhwdiwjdiwjdwdjwdj djepo
              djopdjpoed
            </p>
            <h5 className="text-muted d-flex justify-content-center">
              Sayyed Faizan
            </h5>
          </Card>
          <Card className="carousel-slide shadow">
            <h5 className="d-flex justify-content-center">What our recent traveler say</h5>
            <p>
              ojdofjewf pefjejfpejfweo foejfpoefjeo foefjeofjeofjoepf
              eofjpoewjfpoefjeofjeofpjefoje ofjeofj lhwdhwdiwjdiwjdwdjwdj djepo
              djopdjpoed
            </p>
            <h5 className="text-muted d-flex justify-content-center">
              Sayyed Faizan
            </h5>
          </Card>{" "}
        </Slider>
      </Container>
    </>
  );
};

export default Home;
