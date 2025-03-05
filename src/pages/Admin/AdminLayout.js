import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { UseSessionStorage } from '../../constants/SessionStorage';
import './AdminLayout.css'

const AdminLayout = () => {
    const navigate = useNavigate();
    const [user] = UseSessionStorage('userInfo', '')

    const [isOpen, setIsOpen] = useState(true);


    useEffect(() => {
        if (!user) {
            navigate("/login?from=admin");
        }
    }, [navigate]);

    return (
        <Container fluid>
            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                <ul className="sidebar-menu">
                    <li>
                        <NavLink to='/admin/dashboard' >
                            <FaCog /> <span className={isOpen ? "show" : "hide"}>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/admin/users'>
                            <FaUser /> <span className={isOpen ? "show" : "hide"}>Users</span>
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to='/'>
                        <FaHome /> <span className={isOpen ? "show" : "hide"}>Home</span>
                    </NavLink>    
                    </li>                       
                </ul>
            </div>
            <div className="content" style={{position: 'absolute'}}>
                <div className="container">
                <Outlet />
                </div>
            </div>            
        </Container>
    )
}

export default AdminLayout