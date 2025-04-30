import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./findDoctorPage.css";
import indianStates from "../data/indianStates";
import doctorDetails from "../data/doctorDetails";
import defaultUser from "../assets/Images/commonImg/VDrlogo.png";
import FiltrationSideBar from "../components/filterationSideBar";

const GET_DOCTOR_API_URL = "http://localhost:8080/doctorverfication/all";

const specialityKeywords = {
  Cardiologist: ["cardiologist", "cardiology", "heart"],
  Dentist: ["dentist", "dental", "teeth"],
  Gynaecologist: ["gynaecologist", "gynecology", "obgyn"],
  Dermatologist: ["dermatologist", "skin"],
  Neurologist: ["neurologist", "neuro"],
  Orthopedist: ["orthopedist", "orthopedic", "bones"],
  Pediatrician: ["pediatrician", "child"],
  Pulmonologist: ["pulmonologist", "lungs", "respiratory"],
  Gastroenterologist: ["gastroenterologist", "gastro", "digestive"],
  Physiotherapist: ["physiotherapist", "physio"],
  "General Physician": ["general physician", "physician", "gp"],
  Diagnostics: ["diagnostics", "lab"]
};

const normalize = (str) => str?.toString().trim().toLowerCase() || "";

const matchSpeciality = (doctorSpeciality, searchQuery) => {
  const normDoctor = normalize(doctorSpeciality);
  const normSearch = normalize(searchQuery);
  const keywords = specialityKeywords[normSearch] || [normSearch];
  return keywords.some((keyword) => normDoctor.includes(keyword));
};

const FindDoctorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const listRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const specialityFromURL = queryParams.get("speciality") || "";

  const [searchQuery, setSearchQuery] = useState(specialityFromURL);
  const [selectedState, setSelectedState] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(GET_DOCTOR_API_URL);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    setSearchQuery(specialityFromURL);
    if (specialityFromURL && listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [specialityFromURL]);

  const getFilteredDoctors = () => {
    const normalizedSearch = normalize(searchQuery);

    return [
      ...doctors.filter(
        (doctor) =>
          matchSpeciality(doctor.medicalSpeciality, normalizedSearch) &&
          (selectedState === "" || normalize(doctor.state) === normalize(selectedState))
      ),
      ...doctorDetails
        .filter(
          (doc) =>
            matchSpeciality(doc.speciality, normalizedSearch) &&
            (selectedState === "" ||
              normalize(doc.Address).includes(normalize(selectedState)))
        )
        .map((doc, index) => ({
          id: `dummy-${index}`,
          fullName: doc.name || "Not Mentioned",
          medicalSpeciality: doc.speciality || "Not Mentioned",
          experience: "Not Mentioned",
          city: doc.locality || "Not Mentioned",
          state: "Not Mentioned",
          country: "India",
          hospitalCurrentWorking: doc.Address || "Not Mentioned",
          medicalLicenseNumber: "Not Mentioned",
          doctorPhoto: null,
          phone: isNaN(doc.phone) ? "Not Mentioned" : doc.phone,
          email: doc.email || "Not Mentioned"
        }))
    ];
  };

  const filteredDoctors = getFilteredDoctors();

  const doctorProfile = (doctor) => {
    navigate(`/doctorID/${doctor.id}`, { state: { doctor } });
  };

  const getDoctorImage = (doctorPhoto) => {
    if (!doctorPhoto) return defaultUser;
    return doctorPhoto.startsWith("http") ? doctorPhoto : `data:image/jpeg;base64,${doctorPhoto}`;
  };

  return (
    <>
   
      <div className="header-placeholder"></div>
     
      <div className="findDoctorPage-main-container">
      <FiltrationSideBar/>
      <div className="con">
        <div className="findDoctorPage-search-bar-container1">
          <input
            type="text"
            placeholder="Search by specialization"
            className="findDoctorPage-specialization-search1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="findDoctorPage-state-dropdown"
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

        <div className="doctor-list" ref={listRef}>
       
          {loading ? (
            <p>Loading doctors...</p>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="doctor-card"
                onClick={() => doctorProfile(doctor)}
              >
                <img
                  src={getDoctorImage(doctor.doctorPhoto)}
                  alt={`Dr. ${doctor.fullName}`}
                  className="doctor-image"
                />
                <div className="doctor-info">
                  <h3>Dr. {doctor.fullName?.toUpperCase() || "Not Mentioned"}</h3>
                  <p><strong>Specialty:</strong> {doctor.medicalSpeciality || "Not Mentioned"}</p>
                  <p><strong>Experience:</strong> {doctor.experience} {doctor.experience !== "Not Mentioned" && "years"}</p>
                  <p><strong>Location:</strong> {doctor.city}, {doctor.state !== "Not Mentioned" ? doctor.state : ""} {doctor.country}</p>
                  <p><strong>Hospital:</strong> {doctor.hospitalCurrentWorking || "Not Mentioned"}</p>
                  <p><strong>License:</strong> {doctor.medicalLicenseNumber || "Not Mentioned"}</p>
                </div>
                <button className="book-btn">Book Appointment</button>
              </div>
            ))
          ) : (
            <p className="no-results">No doctors found. Please refine your search.</p>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default FindDoctorPage;
