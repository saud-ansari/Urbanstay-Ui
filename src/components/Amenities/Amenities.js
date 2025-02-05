import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Wifi, Tv, Snow, Snow2, XCircle, CarFront, Droplet, Gear } from 'react-bootstrap-icons';

const amenities = [
    { name: 'Wifi', available: true, icon: <Wifi /> },
    { name: 'TV', available: true, icon: <Tv /> },
    { name: 'Heating', available: false, icon: <Snow2 /> },
    { name: 'Air Conditioning', available: true, icon: <Snow /> },
    { name: 'Iron', available: true, icon: <Droplet /> },
    { name: 'Washing Machine', available: true, icon: <Gear /> },
    { name: 'Free Parking', available: true, icon: <CarFront /> },
];

const AmenitiesCard = () => {
    return (
        <Card className="p-3 shadow-sm rounded-lg">
            <Card.Header className="bg-danger text-white text-center">
                <h4 className="mb-0">Amenities</h4>
            </Card.Header>
            <Card.Body>
                <div className="d-flex flex-wrap">
                    {amenities.map((amenity, index) => (
                        <div
                            key={index}
                            className="d-flex align-items-center mb-3 mr-4" // Space between items
                            style={{ flexBasis: '45%' }} // Control item width for wrapping
                        >
                            <div className="d-flex align-items-center gap-2">
                                
                                <p className="fw-bold">
                                <span className='me-2'>{amenity.icon}</span>
                                    {amenity.name}
                                    <span className={(amenity.available ? 'text-success' : 'text-danger') + ' ms-2 fw-bold'}>
                                        {amenity.available ? 'Yes' : <XCircle />}
                                    </span>
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};

export default AmenitiesCard;
