import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="footer-col">
                                    <h3 className='mb-4'>
                                        {/* <Image className='footer-logo'
                                            src="Logo-icon.png"
                                            alt="Company Logo"
                                        /> */}
                                        Urbanstay</h3>
                                    <p>
                                        Discover comfortable, stylish, and fully equipped accommodations for your next getaway.
                                        <br />Stay easy, stay urban!"
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 text-center">
                                <div className="footer-col">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li>
                                            <Link to="/home">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/properties">Properties</Link>
                                        </li>
                                        <li>
                                            <Link to="/about">About Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="footer-col text-center">
                                    <h4>Follow Us</h4>
                                    <div className="social-links">
                                        <div className="social-links">
                                            <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faFacebookF} />
                                            </Link>
                                            <Link to="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faTwitter} />
                                            </Link>
                                            <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faInstagram} />
                                            </Link>
                                            <Link to="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faLinkedinIn} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="copy-right text-center">
                            <p>
                                &copy; 2021 <Link to="/">Urbansaty</Link>. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer
