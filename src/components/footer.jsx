import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import { FaArrowAltCircleUp } from "react-icons/fa";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    
    <footer className="footer-container">
      <div className="all-components">
        <Link to="/">
          <img src={VDrLogo} alt="VDr Logo" className="footer-logo" />
        </Link>
     
      <div className="footer-bottom">
      <p className="first-text">
        VDr is committed to connecting you with top healthcare professionals.
      </p>
        <p className="second-text">&copy; {new Date().getFullYear()} VDr. All Rights Reserved.</p>
        </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <div className="scrool-to-top">
            <a href="#">
        <FaArrowAltCircleUp /></a>
        </div>
        </div>
        </div>
<<<<<<< Updated upstream
=======
        <div className="footer-contact">
          <a href="tel:+1"><FaPhoneAlt /> +91 1234567890 </a>
          <a href="mailto:support@verifieddoctor.com"><FaEnvelope /> support@verifieddoctor.com</a>
        </div>
      </div>

    <p2 className="copyright">© 2025 Verified-Doctor. All rights reserved.</p2>
>>>>>>> Stashed changes
    </footer>
  );
};

export default Footer;
