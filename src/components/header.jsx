import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import HeaderImages from "../data/headerImages";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { Home, Search, Shield, Bell, ShoppingBag, User, ShieldQuestion } from "lucide-react";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { FaUserDoctor } from "react-icons/fa6";


const NAV_LINKS = [
  {
    to: "/findDoctorPage",
    label: "Find a Doctor",
    icon: <Search className="headericons" />,
  },
  {
    to: "/verifyDoc",
    label: "Scan Doc",

    icon: <Shield className="headericons" />,

  },
  {
    to: "/whyVDr",
    label: "Why VDr",

    icon: <ShieldQuestion className="headericons" />,
  },
  {
    to: "/sosPage",
    label: "SOS",
    icon: <Bell className="headericons" />,
    className: "sos-link",
  },
  

  {
    to: "/whyVDr",
    label: "Why VDr",

    icon: <ShieldQuestion className="headericons" />,
   

  },

  {
    href: "https://vdr-door-delivery-medicines.netlify.app/",
    label: "Doorstep Meds",
    icon: <ShoppingBag className="headericons" />,
    external: true,
  },
  {
    href: "https://vdr-insurance.netlify.app/",
    label: "Insurance",
    icon: <Shield className="headericons" />,
    external: true,
  },

  {
    to: "/docDashboard",
    label: "DocDashboard",
    icon:<FaUserDoctor  className="headericons"/>

  },
];

const MainHeader = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [position, setPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HeaderImages.length);
      setPosition((prev) => (prev + 20) % 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    navigate("/LoginAndRegistrationPage");
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
          backgroundImage: `url(${HeaderImages[currentImage].img})`,
          backgroundPosition: `right ${position}% top 0%`,
        }}
      ></div>

      <nav className="nav-container">
        <Link to="/" onClick={handleNavClick}>
          <img src={VDrLogo} alt="VDrapp Logo" className="header-logo" />
        </Link>

        <div className="nav-menu">
          <div className={isOpen ? "nav-links-open" : "nav-links"}>
            {NAV_LINKS.map((link, index) =>
              link.external ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`nav-link flex items-center ${
                    link.className || ""
                  }`}
                  onClick={handleNavClick}
                >
                  {link.icon} {link.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.to}
                  className={`nav-link flex items-center ${
                    link.className || ""
                  }`}
                  onClick={handleNavClick}
                >
                  {link.icon} {link.label}
                </Link>
              )
            )}
            <button
              className="login-button-header nav-link flex items-center"
              onClick={handleLoginClick}
            >
              <User className="icon w-5 h-5 mr-2 text-neutral-900" />{" "}
              Login/Signup
            </button>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default MainHeader;
