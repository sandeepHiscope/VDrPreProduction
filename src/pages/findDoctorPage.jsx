import React, { useState, useEffect } from "react";
import "./findDoctorPage.css";
import { useNavigate } from "react-router-dom";

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

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.medicalSpeciality.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedState === "" || doctor.state.includes(selectedState))
  );

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

        <div className="doctor-list">
          {loading ? (
            <p>Loading doctors...</p>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card" onClick={() => doctorProfile(doctor)}>
                {doctor.doctorPhoto && (
                  <img
                    src={`data:image/jpeg;base64,${doctor.doctorPhoto}`}
                    alt={`Dr. ${doctor.fullName}`}
                    className="doctor-image"
                  />
                )}

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