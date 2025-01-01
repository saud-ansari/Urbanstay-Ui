import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiBaseUrl } from "../../../constants/apiConstant";
import { format } from "date-fns";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseLocalStorage } from "../../../constants/localstorage";

const Listing = () => {
  const [property, setProperty] = useState([]);
  const [value, setValue] = UseLocalStorage("userInfo", "");
  const id = value?.id;

  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setValue(value); //optional
    axios
      .get(`${apiBaseUrl}/Property/ByHostId/${id}`)
      .then((res) => {
        setProperty(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, load]);

  const handleDelete = (delid) => {
    const del = window.confirm("Are you sure");
    if (del) {
      axios
        .delete(`${apiBaseUrl}/Property/${delid}`)
        .then((res) => {
          toast.success("Deleted Successfully");
          setLoad(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    }
  };

  return (
    <>
      <Table striped hover responsive="sm" size="sm" style={{fontSize:'14px'}} >
        <thead>
          <tr>
            <th>Actions</th>
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
          {property &&
            property.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="d-flex p-3">
                    <Button
                      variant="primary"
                      size={"sm"}
                      onClick={() =>
                        navigate(`/landlord/AddProperty/${item.propertyId}`)
                      }
                    >
                      {" "}
                      <Pencil size={8} />{" "}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.propertyId)}
                    >
                      {" "}
                      <Trash size={8} />{" "}
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
                  <td>{format(new Date(item.updatedAt), "dd-MM-yy")}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default Listing;
