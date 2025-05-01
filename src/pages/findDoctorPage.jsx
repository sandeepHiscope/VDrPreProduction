import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./findDoctorPage.css";
import indianStates from "../data/indianStates";
import doctorDetails from "../data/doctorDetails";
import defaultUser from "../assets/Images/commonImg/VDrlogo.png";
import { RxCross2 } from "react-icons/rx";


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
  Diagnostics: ["diagnostics", "lab"],
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
          (selectedState === "" ||
            normalize(doctor.state) === normalize(selectedState))
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
          email: doc.email || "Not Mentioned",
        })),
    ];
  };

  const filteredDoctors = getFilteredDoctors();

  const doctorProfile = (doctor) => {
    navigate(`/doctorID/${doctor.id}`, { state: { doctor } });
  };

  const getDoctorImage = (doctorPhoto) => {
    if (!doctorPhoto) return defaultUser;
    return doctorPhoto.startsWith("http")
      ? doctorPhoto
      : `data:image/jpeg;base64,${doctorPhoto}`;
  };
  const symptoms = [
    "Headache",
    "Fatigue",
    "Cough",
    "Fever",
    "Nausea or Vomiting",
    "Abdominal Pain",
    "Dizziness",
    "Shortness of Breath",
    "Chest Pain",
    "Back Pain",
    "Joint or Muscle Pain",
    "Skin Rash",
    "Sore Throat",
    "Nasal Congestion",
    "Diarrhea",
    "Constipation",
    "Urinary Issues (e.g., frequency, pain)",
    "Sleep Disturbances",
    "Mood Changes (e.g., anxiety)",
    "Weight Changes",
    "Appetite Changes",
    "Menstrual Irregularities"
  ];
  const doctorss = ['Dr. Smith', 'Dr. Patel', 'Dr. Kim', 'Dr. Johnson', 'Dr. Gupta'];
  const specialties = ['Dr. Smith', 'Dr. Patel', 'Dr. Kim', 'Dr. Johnson', 'Dr. Gupta'];
  const locations = ['Dr. Smith', 'Dr. Patel', 'Dr. Kim', 'Dr. Johnson', 'Dr. Gupta'];
  const fees = ['Dr. Smith', 'Dr. Patel', 'Dr. Kim', 'Dr. Johnson', 'Dr. Gupta'];



 
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);

  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  
const [selectedLocations, setSelectedLocations] = useState([]);
const [showLocationDropdown, setShowLocationDropdown] = useState(false);

const [selectedFees, setSelectedFees] = useState([]);
const [showFeeDropdown, setShowFeeDropdown] = useState(false);

  

  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(item => item !== symptom)
        : [...prev, symptom]
    );
  };

  const handleDoctorCheckboxChange = (doctor) => {
    setSelectedDoctors(prev =>
      prev.includes(doctor)
        ? prev.filter(item => item !== doctor)
        : [...prev, doctor]
    );
  };

  const handleSpecialtyCheckboxChange = (specialty) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(item => item !== specialty)
        : [...prev, specialty]
    );
  };
   
  const handleLocationCheckboxChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(item => item !== location)
        : [...prev, location]
    );
  };

  const handleFeeCheckboxChange = (fee) => {
    setSelectedFees(prev =>
      prev.includes(fee)
        ? prev.filter(item => item !== fee)
        : [...prev, fee]
    );
  };


  const removeSymptom = (symptom) => {
    setSelectedSymptoms(prev => prev.filter(item => item !== symptom));
  };
  const removeDoctor = (doctor) => {
    setSelectedDoctors(prev => prev.filter(item => item !== doctor));
  };

  const removeSpecialty = (specialty) => {
    setSelectedSpecialties(prev => prev.filter(item => item !== specialty));
  };
  const removeLocation = (location) => {
    setSelectedLocations(prev => prev.filter(item => item !== location));
  };
  const removeFee = (fee) => {
    setSelectedFees(prev => prev.filter(item => item !== fee));
  };

  
  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };
   
  const toggleDoctorDropdown = () => {
    setShowDoctorDropdown(prev => !prev);
  };
  const toggleSpecialtyDropdown = () => {
    setShowSpecialtyDropdown(prev => !prev);
  };
  const toggleLocationDropdown = () => {
    setShowLocationDropdown(prev => !prev);
  };
  const toggleFeeDropdown = () => {
    setShowFeeDropdown(prev => !prev);
  };
  

  return (
    <>
      <div className="header-placeholder"></div>

      <div className="findDoctorPage-main-container">
        {/* this code for the filtration side bar  */}
        <div className="symptom-list">
          <h3
            className="sidetext-dropdown-header"
            onClick={toggleDropdown}
            style={{ cursor: 'pointer' }}
          >
            Symptoms {showDropdown ? '🔼' : '🔽'}
          </h3>

          {showDropdown && (
            <ul className="dropdown-content">
              {symptoms.map((symptom, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom)}
                      onChange={() => handleCheckboxChange(symptom)}
                    />
                    {symptom}
                  </label>
                </li>
              ))}
            </ul>
          )}

          {/* doctors drop down is here  */}
          <div className="doctor-listtt" style={{ marginTop: '10px' }}>
  <h3
    className="sidetext-dropdown-header2"
    onClick={toggleDoctorDropdown}
    style={{ cursor: 'pointer' }}
  >
    Doctors {showDoctorDropdown ? '🔼' : '🔽'}
  </h3>

  {showDoctorDropdown && (
    <ul className="dropdown-content">
      {doctorss.map((doctor, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={selectedDoctors.includes(doctor)}
              onChange={() => handleDoctorCheckboxChange(doctor)}
            />
            {doctor}
          </label>
        </li>
      ))}
    </ul>
  )}
</div>
         {/* 1. Doctor Specialty Dropdown jsx Copy code */}
         <div className="specialty-listtt" style={{ marginTop: '10px' }}>
  <h3
    className="sidetext-dropdown-header2"
    onClick={toggleSpecialtyDropdown}
    style={{ cursor: 'pointer' }}
  >
    Specialty {showSpecialtyDropdown ? '🔼' : '🔽'}
  </h3>

  {showSpecialtyDropdown && (
    <ul className="dropdown-content">
      {specialties.map((specialty, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={selectedSpecialties.includes(specialty)}
              onChange={() => handleSpecialtyCheckboxChange(specialty)}
            />
            {specialty}
          </label>
        </li>
      ))}
    </ul>
  )}
</div>
         {/* 1. Doctor location  Dropdown jsx Copy code */}
         <div className="location-listtt" style={{ marginTop: '10px' }}>
  <h3
    className="sidetext-dropdown-header2"
    onClick={toggleLocationDropdown}
    style={{ cursor: 'pointer' }}
  >
    Location {showLocationDropdown ? '🔼' : '🔽'}
  </h3>

  {showLocationDropdown && (
    <ul className="dropdown-content">
      {locations.map((location, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={selectedLocations.includes(location)}
              onChange={() => handleLocationCheckboxChange(location)}
            />
            {location}
          </label>
        </li>
      ))}
    </ul>
  )}
</div>
         {/* 1. Consultation Fee Dropdown jsx Copy code */}
         <div className="fee-listtt" style={{ marginTop: '10px' }}>
  <h3
    className="sidetext-dropdown-header2"
    onClick={toggleFeeDropdown}
    style={{ cursor: 'pointer' }}
  >
    Consultation Fee {showFeeDropdown ? '🔼' : '🔽'}
  </h3>

  {showFeeDropdown && (
    <ul className="dropdown-content">
      {fees.map((fee, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={selectedFees.includes(fee)}
              onChange={() => handleFeeCheckboxChange(fee)}
            />
            {fee}
          </label>
        </li>
      ))}
    </ul>
  )}
</div>
   


{/* this is the last div we have  */}
        </div> 


        
        


        {/* the filtration side bar code is completed  */}
        
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
                    <h3>
                      Dr. {doctor.fullName?.toUpperCase() || "Not Mentioned"}
                    </h3>
                    <p>
                      <strong>Specialty:</strong>{" "}
                      {doctor.medicalSpeciality || "Not Mentioned"}
                    </p>
                    <p>
                      <strong>Experience:</strong> {doctor.experience}{" "}
                      {doctor.experience !== "Not Mentioned" && "years"}
                    </p>
                    <p>
                      <strong>Location:</strong> {doctor.city},{" "}
                      {doctor.state !== "Not Mentioned" ? doctor.state : ""}{" "}
                      {doctor.country}
                    </p>
                    <p>
                      <strong>Hospital:</strong>{" "}
                      {doctor.hospitalCurrentWorking || "Not Mentioned"}
                    </p>
                    <p>
                      <strong>License:</strong>{" "}
                      {doctor.medicalLicenseNumber || "Not Mentioned"}
                    </p>
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
        {/* this code is for the selecte list . */}
        <div className="selected-one">
          <h1 className="selected-one-head">The Selected Options </h1>
          <h2 className="sub-head-selected">Symptoms</h2>
          <ul className="selected-list">
          {selectedSymptoms.map((symptom, index) => (
            <li key={index} className="symptoms-text">{symptom} <RxCross2 className="cross-icons" onClick={() => removeSymptom(symptom)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}/>
            </li>
          ))}
          </ul>
           {/* displaying the doctors in the container  */}

        <h2 className="sub-head-selected">Doctors</h2>
<ul className="selected-list">
  {selectedDoctors.map((doctor, index) => (
    <li key={index} className="symptoms-text">
      {doctor}
      <RxCross2
        className="cross-icons"
        onClick={() => removeDoctor(doctor)}
        style={{ cursor: 'pointer', marginLeft: '10px' }}
      />
    </li>
  ))}
</ul>
           {/* displaying the doctors Specialty  in the container  */}
           <h2 className="sub-head-selected">Specialties</h2>
<ul className="selected-list">
  {selectedSpecialties.map((specialty, index) => (
    <li key={index} className="symptoms-text">
      {specialty}
      <RxCross2
        className="cross-icons"
        onClick={() => removeSpecialty(specialty)}
        style={{ cursor: 'pointer', marginLeft: '10px' }}
      />
    </li>
  ))}
</ul>
           {/* displaying the doctors location  in the container  */}
             
           <h2 className="sub-head-selected">Locations</h2>
<ul className="selected-list">
  {selectedLocations.map((location, index) => (
    <li key={index} className="symptoms-text">
      {location}
      <RxCross2
        className="cross-icons"
        onClick={() => removeLocation(location)}
        style={{ cursor: 'pointer', marginLeft: '10px' }}
      />
    </li>
  ))}
</ul>
            {/* displaying the doctors location  in the container  */}

            <h2 className="sub-head-selected">Consultation Fees</h2>
<ul className="selected-list">
  {selectedFees.map((fee, index) => (
    <li key={index} className="symptoms-text">
      {fee}
      <RxCross2
        className="cross-icons"
        onClick={() => removeFee(fee)}
        style={{ cursor: 'pointer', marginLeft: '10px' }}
      />
    </li>
  ))}
</ul>
     
{/* this div is last for displaying */}
        </div> 
       


{/* the code is ended here  */}
      </div>
    </>
  );
};

export default FindDoctorPage;
