import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Pagination, Row, Table } from "react-bootstrap";
import { apiBaseUrl } from "../../../constants/apiConstant";
import { UseLocalStorage } from "../../../constants/localstorage";
import { format } from "date-fns";
import { Pencil, Plus, Trash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Listing = () => {
  const [properties, setProperties] = useState([]);  
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = UseLocalStorage("userInfo", "");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const id = value?.id;

  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setValue(value); //optional
    axios
      .get(`${apiBaseUrl}/Property/ByHostId/${id}`)
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, load, value, setValue]); // Added setValue to dependency array

  const handleDelete = (delid) => {
    const del = window.confirm("Are you sure");
    if (del) {
      axios
        .delete(`${apiBaseUrl}/Property/${delid}`)
        .then((res) => {
          toast.success("Deleted Successfully");
          setLoad(!load);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    }
  };

  // Filter Properties based on Name term 
  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase())
 );

   // Get current Properties for pagination
 const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

   // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [...Array(Math.max(1, Math.ceil(filteredProperties.length / itemsPerPage)))];

  return (
    <>
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Property List</Card.Title>

            <Row className="mt-2 mb-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>Search</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by Property Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={2} className="text-end">
                <Link to="../AddProperty\Property.js" className="btn btn-primary btn-sm">
                  <Plus size={24} /> New Property
                </Link>
              </Col>
            </Row>

            <div className="table-responsive">
              <Table
                striped
                bordered
                hover
                size="sm"
                className="table-sm"
              >
                <thead>
                  <tr className="table-primary">
                    <th style={{ width: "10%" }}>Action</th>                    
                    <th>Name</th>
                    <th>Image</th>
                    <th>Active</th>
                    <th>Address</th>
                    <th>Property Type</th>
                    <th>Available Date</th>
                    <th>Price</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                  </tr>
                </thead>
                <tbody>
                  {properties &&
                    currentProperties.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="d-flex justify-content-around">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() =>
                                navigate(`/landlord/AddProperty/${item.propertyId}`)
                              }
                            >                              
                              <Pencil/>                              
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(item.propertyId)}
                            >                           
                              <Trash/>
                            </Button>
                          </td>
                          <td>{item.title}</td>
                          <td>{item.imagePath}</td>
                          <td>{item.isActive ? "yes" : "no"}</td>
                          <td>{item.address}</td>
                          <td>{item.propertyType}</td>
                          <td>{item.availabilityCalendar}</td>
                          <td>{item.pricePerNight}</td>
                          <td>{format(new Date(item.createdAt), "dd-MM-yyyy")}</td>
                          <td>{format(new Date(item.updatedAt), "dd-MM-yyyy")}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
            <Pagination>
            {pageNumbers.map(
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
          </Card.Body>
        </Card>
      </Container>      
    </>
  );
};

export default Listing;
