import React, { useState } from "react";
import "./findDoctorPage.css";

import Header from "../components/header";

import DoctorVerification from "./doctorVerificationpage";

import Home from "./Home";
import Login from "./loginPage";
import IndividualRegisterPage from "./individualRegisterPage";
import SosPage from "./sosPage";
import DoctorRegisterPage from "./doctorRegisterPage";
import FounderPage from "./ourFoundersPage";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import Fotter from "../components/footer";

// Sample Doctor Data
const doctorData = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialization: "Orthopedic",
    experience: "12 years",
    location: "Mumbai, Maharashtra",
    rating: 9.5,
    image: "./src/assets/Images/comingSoonPage/bag1.png", // Add doctor image URL here
  },
  {
    id: 2,
    name: "Dr. Raj Mehta",
    specialization: "Cardiologist",
    experience: "15 years",
    location: "Bengaluru, Karnataka",
    rating: 9.2,
    image: "./src/assets/Images/comingSoonPage/bag1.png",
  },
  {
    id: 3,
    name: "Dr. Priya Verma111",
    specialization: "Dermatologist",
    experience: "8 years",
    location: "Delhi",
    rating: 8.8,
    image: "./src/assets/Images/comingSoonPage/bag1.png",
  },
  {
    id: 4,
    name: "Dr. Amit Roy",
    specialization: "Neurologist",
    experience: "10 years",
    location: "Chennai, Tamil Nadu",
    rating: 9.0,
    image: "https://via.placeholder.com/120",
  },
];

// Main Component
const FindDoctorPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectDoctor, setSelectDoctor] = useState("");
  const [print, setPrint] = useState("Select State and Doctor to find doctors");

  // Filter Doctors based on search query and state
  const filteredDoctors = doctorData.filter(
    (doctor) =>
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedState === "" || doctor.location.includes(selectedState))
  );

  return (
    <>
      <div className="header-placeholder">
       
      </div>
      <div className="main-container">
        {/* Header Space */}

        {/* Search Bar Section */}
        <div className="search-bar-container">
          {/* Specialization Search */}
          <input
            type="text"
            placeholder="Search by specialization"
            className="specialization-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* State Dropdown */}
          <select
            className="state-dropdown"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi">Delhi</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
        </div>

        {/* Doctor List Section */}
        <div className="doctor-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                {/* Doctor Image */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-image"
                />

                {/* Doctor Information */}
                <div className="doctor-info">
                  <p>{doctor.name}</p>
                  <p>{doctor.specialization}</p>
                  <p>{doctor.experience}</p>
                  <p>{doctor.location}</p>
                  <p>⭐ {doctor.rating} / 10</p>
                </div>

                {/* Book Appointment Button */}
                <button className="book-btn">Book Appointment</button>
              </div>
            ))
          ) : (
            <p className="no-results">
              No doctors found. Please refine your search.
            </p>
          )}
        </div>
      </div>
     
    </>
  );
};

export default FindDoctorPage;
