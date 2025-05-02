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
  const specialties = [
    "Addiction Medicine Specialist",
    "Adolescent Medicine Specialist",
    "Airway Specialist",
    "Anesthesiologist",
    "Biochemist (Clinical)",
    "Cardiac Electrophysiologist",
    "Cardiac Rehab Specialist",
    "Cardiologist",
    "Cardiothoracic Surgeon",
    "Child Neurologist",
    "Clinical Data Manager",
    "Clinical Epidemiologist",
    "Clinical Hematologist",
    "Clinical Pharmacologist",
    "Clinical Toxicologist",
    "Community Medicine Specialist",
    "Dentist (General)",
    "Dermatologist",
    "Diabetologist",
    "Emergency Medicine Specialist",
    "Endocrine Surgeon",
    "Endocrinologist",
    "ENT Surgeon",
    "Epidemiologist",
    "Family Medicine Specialist",
    "Forensic Medicine Specialist",
    "Forensic Psychiatrist",
    "Gastroenterologist",
    "General Physician (Internal Medicine)",
    "General Surgeon",
    "Geriatric Psychiatrist",
    "Geriatrician",
    "Hematologist",
    "High-Altitude Physician",
    "Histopathologist",
    "Hospital Administrator (MD HA)",
    "Hyperbaric Medicine Physician",
    "Infectious Disease Specialist",
    "Infertility/Reproductive Endocrinologist",
    "Intensivist (Critical Care)",
    "Interventional Cardiologist",
    "Interventional Radiologist",
    "Lifestyle Medicine Physician",
    "Lung Transplant Team Member",
    "Maternal-Fetal Medicine Specialist",
    "Medical Oncologist",
    "Medical Policy & Health Researcher",
    "MCH Program Specialist",
    "Microbiologist",
    "Neonatologist",
    "Nephrologist",
    "Neurointerventionist",
    "Neurologist",
    "Neurological Rehabilitation Physician",
    "Neurosurgeon",
    "Neurophysiologist",
    "Nuclear Medicine Physician",
    "Occupational Health Physician",
    "Oncology Pharmacist",
    "Ophthalmologist",
    "Oral & Maxillofacial Surgeon",
    "Oral Public Health Dentist",
    "Orthodontist (Dental)",
    "Orthopaedic Surgeon",
    "Pain Medicine Specialist",
    "Palliative Medicine Physician",
    "Pathologist",
    "Pediatric Allergist/Immunologist",
    "Pediatric Anesthesiologist",
    "Pediatric Cardiologist",
    "Pediatric Dentist",
    "Pediatric Oncologist",
    "Pediatric Surgeon",
    "Pediatrician",
    "Periodontist",
    "Physical Medicine & Rehab (PMR)",
    "Plastic Surgeon",
    "Preventive Cardiologist",
    "Prosthodontist (Dental)",
    "Psychiatrist",
    "Public Health Dentist",
    "Pulmonologist",
    "Radiation Oncologist",
    "Radiologist",
    "Reproductive Health Counselor (MD)",
    "Rheumatologist",
    "Sleep Medicine Specialist",
    "Sports Medicine Specialist",
    "Surgical Oncologist",
    "Thoracic Surgeon",
    "Toxicologist",
    "Trauma Specialist (Emergency)",
    "Transfusion Medicine Specialist",
    "Transplant Physician/Surgeon",
    "Tuberculosis Specialist",
    "Urologist",
    "Vascular Surgeon"
];  const locations = [
    "Darjeeling",
    "Rishikesh",
    "Goa",
    "Shimla",
    "Kashmir",
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Kerala",
    "Bihar",
    "Rajasthan",
    "Hyderabad",
    "Jaipur",
    "Ladakh",
    "Chennai",
    "Uttarakhand",
    "Kochi",
    "Varanasi",
    "Pondicherry",
    "Bengaluru",
    "Madhya Pradesh",
    "Andhra Pradesh"
];  
const fees = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
  1200, 1500, 1800, 2000, 2200, 2500, 2700, 3000, 3200, 3500,
  3800, 4000, 4500, 5000
];
const ratings = [1, 2, 3, 4, 5];
const discounts = [5, 10, 15, 20, 25, 30];
const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];
const availability = ['Morning', 'Afternoon', 'Evening', 'Night'];
const experience = ['1-3 years', '3-5 years', '5-10 years', '10+ years'];




 
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

const [selectedRatings, setSelectedRatings] = useState([]);
const [selectedDiscounts, setSelectedDiscounts] = useState([]);
const [selectedLanguages, setSelectedLanguages] = useState([]);
const [selectedAvailability, setSelectedAvailability] = useState([]);
const [selectedExperience, setSelectedExperience] = useState([]);

const [showRatingDropdown, setShowRatingDropdown] = useState(false);
const [showDiscountDropdown, setShowDiscountDropdown] = useState(false);
const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);
const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
  

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
  const handleFilterChange = (value, setter, selectedArray) => {
    setter(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
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
  const removeSelectedItem = (item, setter, selectedArray) => {
    setter(prev => prev.filter(i => i !== item));
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
  const toggleFilterDropdown = (setter, showState) => {
  setter(prev => !prev);
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
                  <label >
                    <input
                    
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom)}
                      onChange={() => handleCheckboxChange(symptom)}
                      className="symptoms-checkedbox"
                    
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
    Doctor Name {showDoctorDropdown ? '🔼' : '🔽'}
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
              className="symptoms-checkedbox"

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
              className="symptoms-checkedbox"

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
              className="symptoms-checkedbox"

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
              className="symptoms-checkedbox"

            />
            {fee}
          </label>
        </li>
      ))}
    </ul>
  )}
</div>
   
{/* rating drop down */}

<div className="rating-list" style={{ marginTop: '10px' }}>
      <h3
        className="dropdown-header-rating"
        onClick={() => toggleFilterDropdown(setShowRatingDropdown, showRatingDropdown)}
        style={{ cursor: 'pointer' }}
      >
        Rating {showRatingDropdown ? '🔼' : '🔽'}
      </h3>

      {showRatingDropdown && (
        <ul className="dropdown-content">
          {ratings.map((rating, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleFilterChange(rating, setSelectedRatings, selectedRatings)}
                  className="checkbox"
                />
                {rating} Star
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Discount Dropdown */}
    <div className="discount-list" style={{ marginTop: '10px' }}>
      <h3
        className="dropdown-header-discount"
        onClick={() => toggleFilterDropdown(setShowDiscountDropdown, showDiscountDropdown)}
        style={{ cursor: 'pointer' }}
      >
        Discount {showDiscountDropdown ? '🔼' : '🔽'}
      </h3>

      {showDiscountDropdown && (
        <ul className="dropdown-content">
          {discounts.map((discount, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedDiscounts.includes(discount)}
                  onChange={() => handleFilterChange(discount, setSelectedDiscounts, selectedDiscounts)}
                  className="checkbox"
                />
                {discount}%
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>

{/* Language Dropdown */}
<div className="language-list" style={{ marginTop: '10px' }}>
      <h3
        className="dropdown-header-discount"
        onClick={() => toggleFilterDropdown(setShowLanguageDropdown, showLanguageDropdown)}
        style={{ cursor: 'pointer' }}
      >
        Language {showLanguageDropdown ? '🔼' : '🔽'}
      </h3>

      {showLanguageDropdown && (
        <ul className="dropdown-content">
          {languages.map((language, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language)}
                  onChange={() => handleFilterChange(language, setSelectedLanguages, selectedLanguages)}
                  className="checkbox"
                />
                {language}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Availability Dropdown */}
    <div className="availability-list" style={{ marginTop: '10px' }}>
      <h3
        className="dropdown-header-discount"
        onClick={() => toggleFilterDropdown(setShowAvailabilityDropdown, showAvailabilityDropdown)}
        style={{ cursor: 'pointer' }}
      >
        Availability {showAvailabilityDropdown ? '🔼' : '🔽'}
      </h3>

      {showAvailabilityDropdown && (
        <ul className="dropdown-content">
          {availability.map((time, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedAvailability.includes(time)}
                  onChange={() => handleFilterChange(time, setSelectedAvailability, selectedAvailability)}
                  className="checkbox"
                />
                {time}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Experience Dropdown */}
    <div className="experience-list" style={{ marginTop: '10px' }}>
      <h3
        className="dropdown-header-discount"
        onClick={() => toggleFilterDropdown(setShowExperienceDropdown, showExperienceDropdown)}
        style={{ cursor: 'pointer' }}
      >
        Experience {showExperienceDropdown ? '🔼' : '🔽'}
      </h3>

      {showExperienceDropdown && (
        <ul className="dropdown-content">
          {experience.map((exp, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedExperience.includes(exp)}
                  onChange={() => handleFilterChange(exp, setSelectedExperience, selectedExperience)}
                  className="checkbox"
                />
                {exp}
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
            {/* displaying the doctors rating  in the container  */}
            <h2 className="sub-head-selected">Selected Ratings</h2>
    <ul className="selected-list">
      {selectedRatings.map((rating, index) => (
        <li key={index} className="selected-item">
          {rating} Star
          <RxCross2
            className="cross-icon"
            onClick={() => removeSelectedItem(rating, setSelectedRatings, selectedRatings)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </li>
      ))}
    </ul>

            {/* displaying the doctors discount  in the container  */}
            <h2 className="sub-head-selected">Selected Discounts</h2>
    <ul className="selected-list">
      {selectedDiscounts.map((discount, index) => (
        <li key={index} className="selected-item">
          {discount}%
          <RxCross2
            className="cross-icon"
            onClick={() => removeSelectedItem(discount, setSelectedDiscounts, selectedDiscounts)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </li>
      ))}
    </ul>

                {/* displaying the doctors language  in the container  */}

                <h2 className="sub-head-selected">Selected Languages</h2>
    <ul className="selected-list">
      {selectedLanguages.map((language, index) => (
        <li key={index} className="selected-item">
          {language}
          <RxCross2
            className="cross-icon"
            onClick={() => removeSelectedItem(language, setSelectedLanguages, selectedLanguages)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </li>
      ))}
    </ul>

                {/* displaying the doctors avalibility  in the container  */}

                <h2 className="sub-head-selected">Selected Availability</h2>
    <ul className="selected-list">
      {selectedAvailability.map((time, index) => (
        <li key={index} className="selected-item">
          {time}
          <RxCross2
            className="cross-icon"
            onClick={() => removeSelectedItem(time, setSelectedAvailability, selectedAvailability)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </li>
      ))}
    </ul>

                    {/* displaying the doctors Experience  in the container  */}

                    <h2 className="sub-head-selected">Selected Experience</h2>
    <ul className="selected-list">
      {selectedExperience.map((exp, index) => (
        <li key={index} className="selected-item">
          {exp}
          <RxCross2
            className="cross-icon"
            onClick={() => removeSelectedItem(exp, setSelectedExperience, selectedExperience)}
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
