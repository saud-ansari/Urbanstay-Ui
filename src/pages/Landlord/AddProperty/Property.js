import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../../../constants/apiConstant";
import { Plus } from "react-bootstrap-icons";
import { UseSessionStorage } from "../../../constants/SessionStorage";

const Property = () => {
  const [value ,setValue]  = UseSessionStorage("userInfo", '');
  const iid = value?.id;
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    hostId: id ? id : iid,
    title: "",
    description: "",
    imagePath: "",
    imagePath2: "",
    imagePath3: "",
    imagePath4: "",
    imagePath5: "",
    isActive: id ? 1 : '',
    address: "",
    city: "",
    country: "",
    zipCode: "",
    propertyType: "",
    availabilityCalendar: "",
    pricePerNight: "",
    houseRules: "",
    instantBooking: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "pricePerNight" || name === "zipCode") && isNaN(value))
      return;

    setProperty({
      ...property,
      [name]:
        name === "isActive"
          ? value === "true"
          : name === "instantBooking"
          ? value === "true"
          : value,
    });
    console.log(property);
  };

  const handleSubmit = () => {
    if (
      property.title &&
      property.description &&
      property.imagePath &&
      property.imagePath2 &&
      property.imagePath3 &&
      property.imagePath4 &&
      property.imagePath5 &&
      property.address &&
      property.city &&
      property.country &&
      property.state &&
      property.zipCode &&
      property.propertyType &&
      property.availabilityCalendar &&
      property.pricePerNight &&
      property.houseRules &&
      property.instantBooking !== " " &&
      property.isActive !== " "
    ) {
      if (id) {
        axios
          .put(`${apiBaseUrl}/Property/${id}`, property)
          .then((res) => {
            if (res) {
              toast.success("Property updated successfully");
              navigate(`/landlord/listing`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`http://localhost:57614/api/Property`, property)
          .then((res) => {
            if (res) {
              navigate(`/landlord/listing`);
              toast.success("Property added successfully");
            }
          })
          .catch((err) => {
            toast.error("Something went wrong");
            if (err.response) {
              console.log("Server Response:", err.response.data);
            } else {
              console.log("Error:", err.message);
            }
          });
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}/Property/ById/${id}`)
        .then((res) => {
          if (res.data) {
            setProperty(...res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleUplaoad = (e) => {
  setFiles([...e.target.files]);
  };



  const handlefileImage = () => {
    if (files.length !== 5) {
      toast.error("Please select exactly 5 images.");
      return;
    }
  
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
  
    // Upload files
    axios
      .post("http://localhost:57614/api/Property/upload", formData)
      .then((res) => {
        if (res.data && res.data.imagePaths && res.data.imagePaths.length === 5) {
          setProperty({
            ...property,
            imagePath: res.data.imagePaths[0],
            imagePath2: res.data.imagePaths[1],
            imagePath3: res.data.imagePaths[2],
            imagePath4: res.data.imagePaths[3],
            imagePath5: res.data.imagePaths[4],
          });
          toast.success("Images added successfully!");
        } else {
          toast.error("Failed to process uploaded images.");
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        toast.error("Failed to upload images.");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Col xs={12} sm={12} md={6} lg={6}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Name the property"
              name="title"
              value={property.title}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Description"
              name="description"
              value={property.description}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Active</Form.Label>
            <Form.Select
              aria-label="Floating label select example"
              name="isActive"
              value={property.isActive}
              onChange={handleChange}
            >
              <option>IS Active ?</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder="Enter City"
              name="city"
              value={property.city}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            name="address"
            value={property.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={property.country}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              name="state"
              value={property.state}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name="zipCode"
              value={property.zipCode}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Property Type</Form.Label>
            <Form.Control
              name="propertyType"
              value={property.propertyType}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Price Per Night</Form.Label>
            <Form.Control
              name="pricePerNight"
              value={property.pricePerNight}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Available Dates</Form.Label>
            <Form.Control
              name="availabilityCalendar"
              value={property.availabilityCalendar}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>House Rules</Form.Label>
            <Form.Control
              name="houseRules"
              value={property.houseRules}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Instant Booking</Form.Label>
            <Form.Select
              aria-label="Floating label select example"
              name="instantBooking"
              value={property.instantBooking}
              onChange={handleChange}
            >
              <option>Choose ?</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleUplaoad}
              disabled={uploading}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>ImagePath1</Form.Label>
            <Form.Control
              name="imagePath"
              value={property.imagePath}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>ImagePath2</Form.Label>
            <Form.Control
              name="imagePath2"
              value={property.imagePath2}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>ImagePath3</Form.Label>
            <Form.Control
              name="imagePath3"
              value={property.imagePath3}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>ImagePath4</Form.Label>
            <Form.Control
              name="imagePath4"
              value={property.imagePath4}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>ImagePath5</Form.Label>
            <Form.Control
              name="imagePath5"
              value={property.imagePath5}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Button
          disabled={uploading}
          style={{
            backgroundColor: "#7952b3",
            color: "White",
            borderColor: "#7952b3",
            margin: "10px 10px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button disabled={uploading} style={{
            backgroundColor: "#7952b3",
            color: "White",
            borderColor: "#7952b3",
            margin: "10px 10px",
          }} onClick={()=>handlefileImage()}> <Plus size={20}/>Upload Image</Button>
      </Form>
    </>
  );
};

export default Property;
