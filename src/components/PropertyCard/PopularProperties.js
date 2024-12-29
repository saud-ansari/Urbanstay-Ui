import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseImage, apiBaseUrl } from "../../constants/apiConstant";
import { Col, Row, Button, Card, Container, Modal } from "react-bootstrap";
import "./PopularProperties.css";
import { GeoAltFill } from "react-bootstrap-icons";

const PopularProperties = ({Searchproperty }) => {
  const [properties, setProperties] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [propertModal, setPropertyModal] = useState(null);



  useEffect(() => {
    if (Array.isArray(Searchproperty)) {
      setProperties(Searchproperty);
    }else{
      axios
      .get(`${apiBaseUrl}/Property`)
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => console.log(err));
    }
  },[Searchproperty]);

  const handleBook = (property) => {
    setModalShow(true);
    setPropertyModal(property);

  };
  return (
    
    <Container className="popular-properties">
      <h2 className="text-center">Popular Properties</h2>
      <Row className="property-cards mt-4">
        {properties.map((property) => (
          <Col xs={12} sm={6} md={4} lg={3} key={property.id} className="mb-4">
            <Card className="property-card h-100">
              <Card.Img
                variant="top"
                src={`${apiBaseImage}/PropertyImg/${property.imagePath}`}
              />
              <Card.Body>
                <Card.Title className="title-ellipsis">
                  {property.title}
                </Card.Title>
                <Row>
                  <Col lg={6} xs={6} className="text-start">
                    <Card.Text>
                      <span className="text-muted">
                        /{property.propertyType}
                      </span>
                    </Card.Text>
                  </Col>
                  <Col lg={6} xs={6} className="text-end">
                    <span className="text-muted">
                      <GeoAltFill />
                      {property.city}
                    </span>
                  </Col>
                </Row>
                <h5 className="price">₨ {property.pricePerNight}</h5>
                <Button
                  variant="primary"
                  className="book-btn"
                  onClick={() => handleBook(property)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={modalShow}
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {
            propertModal &&
            <div className="xyz">
                <h2 className="title-ellipsis">{propertModal.title}</h2>
            </div>
        }
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PopularProperties;
