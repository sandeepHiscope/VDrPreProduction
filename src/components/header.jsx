import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import HeaderImages from "../data/headerImages";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { LoginContext } from "../context/loginContext";
 
import {
  Search,
  Shield,
  Bell,
  ShoppingBag,
  ShieldQuestion,
} from "lucide-react";

const NAV_LINKS = [
  {
    to: "/findDoctorPage",
    label: "Find a Doc",
    icon: <Search className="headericons" />,
  },
  {
    to: "/verifyDoc",
    label: "Verify a Doc",
    icon: <Shield className="headericons" />,
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
    to: "/medicalLabTechnicianDashboard",
    label: "Diagnosis Dash",
   
    icon: <ShieldQuestion className="headericons" />,
  },
];

const MainHeader = () => {
  
  const [currentImage, setCurrentImage] = useState(0);
  const [position, setPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, isUser, isDoctor, setUser, setDoctor, setLogin } =
    useContext(LoginContext);

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
  const docLogged = () => {
    setDoctor(true);
    setUser(false);
    setLogin(true);
    window.alert("Doctor logged in successfully!");
  };
  const userLogged = () => {
    setUser(true);
    setDoctor(false);
    setLogin(true);
    window.alert("User logged in successfully!");
  };
  const loggedOut = () => {
    setLogin(false);
    window.alert("Logged out successfully!");
  };
  return (
 

      <nav className="header-nav-container">
         <button
               className="toggle-button"
               onClick={toggleSlide}
               aria-label="Toggle Menu"
             >
               {isOpen ? <ImCross className="secicon" /> : <IoReorderThreeOutline />}
             </button>
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
                  target="_self"
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
            {/* <button
              className="nav-link flex items-center cursor-pointer"
              onClick={docLogged}
            >
              Doc login ✅
            </button>
            <button
              className="nav-link flex items-center cursor-pointer"
              onClick={userLogged}
            >
              User login ✅
            </button>
            <button
              className="nav-link flex items-center cursor-pointer"
              onClick={loggedOut}
            >
              Logout ❌
            </button> */}
          {/* only dev purpose */}

            {isLoggedIn ? (
              isDoctor ? (
                <Link
                  to="/docDashboard"
                  className="nav-link flex items-center text-blue-600"
                  onClick={handleNavClick}
                >
                  <FaUserDoctor className="headericons" /> DocDashboard
                </Link>
              ) : (
                <Link
                  to="/userDashboard"
                  className="nav-link flex items-center text-blue-600"
                  onClick={handleNavClick}
                >
                  <FaUser className="headericons" /> UserDashboard
                </Link>
              )
            ) : (
              <button
                className="login-button-header nav-link text-green-600"
                onClick={handleLoginClick}
              >
                Login/Signup
              </button>
              
            )}
          </div>
        </div>
      </nav>
  );
};

export default MainHeader;
