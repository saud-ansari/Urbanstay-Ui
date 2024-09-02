import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
  Table,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Pencil, Plus, Trash } from "react-bootstrap-icons";
import Loader from "../../../components/Loader/Loader";

import { apiBaseUrl } from "../../../constants/apiConstant";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setIsLoader(true);
    axios
      .get(`${apiBaseUrl}/user`)
      .then((res) => {
        setIsLoader(false);
        setUsers(res.data);
      })
      .catch((err) => {
        setIsLoader(false);
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    const con = window.confirm("Are you sure?");
    if (con) {
      setIsLoader(true);
      axios
        .delete(`${apiBaseUrl}/user/${id}`)
        .then((res) => {
          setIsLoader(false);
          getUsers();
          toast.info("User deleted successfully!");
        })
        .catch((err) => {
          setIsLoader(false);
          console.log(err);
        });
    }
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter ? user.role === roleFilter : true)
  );

  // Get current users for pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render Popover for a given text
  const renderPopover = (text) => (
    <Popover id="popover-basic" className="custom-popover">
      <Popover.Body>{text}</Popover.Body>
    </Popover>
  );

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Users</Card.Title>
          {isLoader && <Loader />}
          <Row className="mt-2 mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Search</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by Username"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">Filter by Role</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Landlords">Landlords</option>
                <option value="Tenants">Tenants</option>
              </Form.Select>
            </Col>
            <Col md={2} className="text-end">
              <Link to="../user" className="btn btn-primary btn-sm">
                <Plus size={24} /> New User
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
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Role</th>
                  <th>Added Date</th>
                  <th>Added By</th>
                  <th>Modified Date</th>
                  <th>Modified By</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex justify-content-around">
                      <Button 
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`../user/${item.id}`)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteUser(item.id)}
                      >
                        <Trash />
                      </Button>
                    </td>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.username}</td>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={renderPopover(item.email)}
                    >
                      <td className="text-truncate" style={{ maxWidth: "150px" }}>
                        {item.email}
                      </td>
                    </OverlayTrigger>
                    <td>{item.mobileNo}</td>
                    <td>
                      <Badge
                        bg={
                          item.role === "Super Admin"
                            ? "danger"
                            : item.role === "Admin"
                            ? "info"
                            : item.role === "Landlords"
                            ? "warning"
                            : "success"
                        }
                        style={{ minWidth: "75px" }}
                      >
                        {item.role}
                      </Badge>
                    </td>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={renderPopover(
                        format(new Date(item.addedDate), "dd-MM-yyyy")
                      )}
                    >
                      <td className="text-truncate" style={{ maxWidth: "120px" }}>
                        {format(new Date(item.addedDate), "dd-MM-yyyy")}
                      </td>
                    </OverlayTrigger>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={renderPopover(item.addedBy)}
                    >
                      <td className="text-truncate" style={{ maxWidth: "120px" }}>
                        {item.addedBy}
                      </td>
                    </OverlayTrigger>
                    {item.modifiedDate && (
                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="top"
                        overlay={renderPopover(
                          format(new Date(item.modifiedDate), "dd-MM-yyyy")
                        )}
                      >
                        <td className="text-truncate" style={{ maxWidth: "120px" }}>
                          {format(new Date(item.modifiedDate), "dd-MM-yyyy")}
                        </td>
                      </OverlayTrigger>
                    )}
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={renderPopover(item.modifiedBy)}
                    >
                      <td className="text-truncate" style={{ maxWidth: "120px" }}>
                        {item.modifiedBy}
                      </td>
                    </OverlayTrigger>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination>
            {[...Array(Math.ceil(filteredUsers.length / itemsPerPage))].map(
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
  );
};

export default UserList;
