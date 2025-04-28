import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowUp, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import './footer.css';
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={VDrLogo} alt="App Logo" className="footer-logo" />
          <h2 className="app-name">Verified-Doctor</h2>
          <p className="tagline">Trusted Care, Anytime, Anywhere, Always.</p>
        </div>

        <div className="footer-icons">
          <a href="https://www.facebook.com/"> <FaFacebookF title="Facebook" className="footer-icon" /></a>
          <a href="https://x.com/"><FaTwitter title="Twitter" className="footer-icon" /></a>
          <a href="https://in.indeed.com/"> <FaLinkedinIn title="LinkedIn" className="footer-icon" /></a>
          <a href="https://www.instagram.com/"> <FaInstagram title="Instagram" className="footer-icon" /></a>
        </div>
        <a href="#">  <FaArrowUp title="Back to Top" className="footer-iconarrow" /></a>


        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <Link to="/findDoctorPage"><li>Find a Doctor</li></Link>
            <Link to="/verifyDoc"><li>Verify Doc</li></Link>
            <Link to="/sosPage"><li>SOS</li></Link>
            <Link to="/whyVDr"><li>Why VDr</li></Link>
            <Link to="/findDoctorPage"><li>Doorstep Meds</li></Link>
            <Link to="/insurancePage"><li>Insurance</li></Link>
            <Link to="/docDashboard"><li>DocDashboard</li></Link>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-subscription">
          <h4>Stay Updated</h4>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="footer-email-input"
          />
        <Link to="userDashboard" ><button onClick={handleSubscribe} className="footer-subscribe-button">Subscribe</button></Link> 
        </div>
        <div className="footer-contact">
          <a href="tel:+1234567890"><FaPhoneAlt /> +1 234 567 890</a>
          <a href="mailto:support@verifieddoctor.com"><FaEnvelope /> support@verifieddoctor.com</a>
        </div>
      </div>

    <p2 className="copyright">© 2025 Verified-Doctor. All rights reserved.</p2>
    </footer>
  );
};

export default Footer;
