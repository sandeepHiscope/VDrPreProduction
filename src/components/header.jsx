import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import headerImages from "../data/headerImages";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { Home, Search, Shield, Bell, ShoppingBag, User, Info } from "lucide-react"; // Import Lucide icons

const MainHeader = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [position, setPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % headerImages.length);
      setPosition((prev) => (prev + 20) % 100);
    }, 5000);

    const updateWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handleLoginClick = () => {
    navigate("/loginAndRegistrationPage");
    setIsOpen(false);
  };

  const toggleSlide = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <section className="header-section">
      <button
        className="toggle-button"
        onClick={toggleSlide}
        aria-label="Toggle Menu"
      >
        {isOpen ? <ImCross className="secicon" /> : <IoReorderThreeOutline />}
      </button>

      <div
        className="header-background"
        style={{
          backgroundImage: `url(${headerImages[currentImage].img})`,
          backgroundPosition: `right ${position}% top 0%`,
        }}
      ></div>

      <nav className="nav-container">
        <Link to="/" onClick={handleNavClick}>
          <img src={VDrLogo} alt="VDrapp Logo" className="header-logo" />
        </Link>

        <div className="nav-menu">
          <div className={isOpen ? "nav-links-open" : "nav-links"}>
            <Link
              to="/findDoctorPage"
              className="nav-link flex items-center"
              onClick={handleNavClick}
            >
              <Search className="icon w-5 h-5 mr-2 text-neutral-900" /> Find a Doctor
            </Link>
            <Link
              to="/verifyDoc"
              className="nav-link flex items-center"
              onClick={handleNavClick}
            >
              <Shield className="icon w-5 h-5 mr-2 text-neutral-900" /> Verify Doc
            </Link>
            <Link
              to="/sosPage"
              className="nav-link flex items-center sos-link"
              onClick={handleNavClick}
            >
              <Bell className="icon w-5 h-5 mr-2 text-neutral-900" /> SOS
            </Link>

            <a
              href="https://vdr-door-delivery-medicines.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center"
              onClick={handleNavClick}
            >
              <ShoppingBag className="icon w-5 h-5 mr-2 text-neutral-900" /> Doorstep Meds
            </a>
            <a
              href="https://vdr-insurance.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center"
              onClick={handleNavClick}
            >
              <Shield className="icon w-5 h-5 mr-2 text-neutral-900" /> Insurance
            </a>

            <Link
              to="/founderPage"
              className="nav-link flex items-center"
              onClick={handleNavClick}
            >
              <User className="icon w-5 h-5 mr-2 text-neutral-900" /> Founder Page
            </Link>
            
            {/* <Link
              to="/whyVDr"
              className="nav-link flex items-center"
              onClick={handleNavClick}
            >
              <Info className="icon w-5 h-5 mr-2 text-neutral-900" /> Why VDr
            </Link> */}

            <button
              className="login-button-header nav-link flex items-center"
              onClick={handleLoginClick}
            >
              <User className="icon w-5 h-5 mr-2 text-neutral-900" /> Login/Signup
            </button>
            <Link to="/docDashboard" className="nav-link">DocDashboard</Link>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default MainHeader;