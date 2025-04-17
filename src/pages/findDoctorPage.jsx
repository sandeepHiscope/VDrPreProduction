import React, { useState, useEffect } from "react";
import "./findDoctorPage.css";
import { useNavigate } from "react-router-dom";
import indianStates from "../data/indianStates";
import doctorDetails from "../data/doctorDetails";
import defaultUser from "../assets/Images/commonImg/VDrlogo.png"; 

const GET_DOCTOR_API_URL = "http://localhost:8080/api/doctorsverification/all";

const FindDoctorPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(GET_DOCTOR_API_URL);
        const data = await response.json();
        setDoctors(data);
        console.log("Fetched doctors:", data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = [
    ...doctors.filter(
      (doctor) =>
        doctor.medicalSpeciality.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedState === "" || doctor.state?.toLowerCase() === selectedState.toLowerCase())
    ),
    ...doctorDetails
      .filter(
        (doc) =>
          typeof doc.speciality === "string" &&
          doc.speciality.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedState === "" || (doc.Address && doc.Address.toLowerCase().includes(selectedState.toLowerCase())))
      )
      .map((doc, index) => ({
        id: `dummy-${index}`,
        fullName: doc.name || "not mentioned",
        medicalSpeciality: doc.speciality || "not mentioned",
        experience: "not mentioned",
        city: doc.locality || "not mentioned",
        state: "not mentioned",
        country: "India",
        hospitalCurrentWorking: doc.Address || "not mentioned",
        medicalLicenseNumber: "not mentioned",
        doctorPhoto: null,
        phone: isNaN(doc.phone) ? "not mentioned" : doc.phone,
        email: doc.email || "not mentioned"
      }))
  ];
  

  const doctorProfile = (doctor) => {
    navigate(`/doctorID/${doctor.id}`, { state: { doctor } });
  };

  return (
    <>
      <div className="header-placeholder"></div>
      <div className="main-container">
        <div className="search-bar-container1">
          <input
            type="text"
            placeholder="Search by specialization"
            className="specialization-search1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="state-dropdown"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="doctor-list">
          {loading ? (
            <p>Loading doctors...</p>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card" onClick={() => doctorProfile(doctor)}>
                <img
                  src={
                    doctor.doctorPhoto
                      ? `data:image/jpeg;base64,${doctor.doctorPhoto}`
                      : defaultUser
                  }
                  alt={`Dr. ${doctor.fullName}`}
                  className="doctor-image"
                />

                <div className="doctor-info">
                  <h3>Dr. {doctor.fullName.toUpperCase()}</h3>
                  <p><strong>Specialty: </strong> {doctor.medicalSpeciality}</p>
                  <p><strong>Experience: </strong> {doctor.experience} years</p>
                  <p><strong>Location: </strong> {doctor.city}, {doctor.state}, {doctor.country}</p>
                  <p><strong>Hospital: </strong> {doctor.hospitalCurrentWorking}</p>
                  <p><strong>License: </strong> {doctor.medicalLicenseNumber}</p>
                </div>
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
