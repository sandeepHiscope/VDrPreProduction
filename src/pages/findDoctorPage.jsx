import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./findDoctorPage.css";
import indianStates from "../data/indianStates";
import doctorDetails from "../data/doctorDetails";
import defaultUser from "../assets/Images/commonImg/VDrlogo.png";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

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

  // Filter states
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);

  // Dropdown visibility states
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showFeeDropdown, setShowFeeDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showDiscountDropdown, setShowDiscountDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

  // Filter data
  const symptoms = [
    "Headache", "Fatigue", "Cough", "Fever", "Nausea or Vomiting",
    "Abdominal Pain", "Dizziness", "Shortness of Breath", "Chest Pain",
    "Back Pain", "Joint or Muscle Pain", "Skin Rash", "Sore Throat",
    "Nasal Congestion", "Diarrhea", "Constipation", 
    "Urinary Issues (e.g., frequency, pain)", "Sleep Disturbances",
    "Mood Changes (e.g., anxiety)", "Weight Changes", "Appetite Changes",
    "Menstrual Irregularities"
  ];
  
  const specialties = [
    "Cardiologist", "Dentist", "Gynaecologist", "Dermatologist", "Neurologist",
    "Orthopedist", "Pediatrician", "Pulmonologist", "Gastroenterologist",
    "Physiotherapist", "General Physician", "Diagnostics"
    // Add more from your original list as needed
  ];
  
  const locations = [
    "Delhi", "Mumbai", "Kolkata", "Kerala", "Bihar", "Rajasthan",
    "Hyderabad", "Jaipur", "Chennai", "Bengaluru"
    // Add more from your original list as needed
  ];
  
  const fees = [
    100, 200, 300, 500, 1000, 1500, 2000, 3000, 5000
  ];
  
  const ratings = [1, 2, 3, 4, 5];
  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi'];
  const availability = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const experience = ['1-3 years', '3-5 years', '5-10 years', '10+ years'];

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

  // Helper function to check if a doctor matches the symptom filter
  const matchesSymptomFilter = (doctor) => {
    if (selectedSymptoms.length === 0) return true;
    
    // This is a simplified example. In a real app, you'd need data that maps symptoms to specialties
    const symptomToSpecialtyMap = {
      "Headache": ["Neurologist"],
      "Chest Pain": ["Cardiologist"],
      "Skin Rash": ["Dermatologist"],
      "Joint or Muscle Pain": ["Orthopedist", "Physiotherapist"],
      "Abdominal Pain": ["Gastroenterologist"],
      "Cough": ["Pulmonologist"],
      // Add more mappings as needed
    };
    
    for (const symptom of selectedSymptoms) {
      const specialtiesForSymptom = symptomToSpecialtyMap[symptom] || [];
      if (specialtiesForSymptom.includes(doctor.medicalSpeciality)) {
        return true;
      }
    }
    return false;
  };

  // Helper function to check if a doctor matches the specialty filter
  const matchesSpecialtyFilter = (doctor) => {
    if (selectedSpecialties.length === 0) return true;
    return selectedSpecialties.some(specialty => 
      normalize(doctor.medicalSpeciality).includes(normalize(specialty))
    );
  };

  // Helper function to check if a doctor matches the location filter
  const matchesLocationFilter = (doctor) => {
    if (selectedLocations.length === 0) return true;
    return selectedLocations.some(location => 
      normalize(doctor.city).includes(normalize(location)) || 
      normalize(doctor.state).includes(normalize(location))
    );
  };

  // Helper function to check if a doctor matches the fee filter
  const matchesFeeFilter = (doctor) => {
    if (selectedFees.length === 0) return true;
    
    // This is a placeholder implementation
    const doctorFee = doctor.consultationFee || Math.floor(Math.random() * 5000) + 100;
    
    return selectedFees.some(fee => doctorFee <= fee);
  };

  // Helper function to check if a doctor matches the rating filter
  const matchesRatingFilter = (doctor) => {
    if (selectedRatings.length === 0) return true;
    
    // In a real app, you'd have actual rating data for each doctor
    // This is a placeholder implementation
    const doctorRating = doctor.rating || Math.floor(Math.random() * 5) + 1;
    
    return selectedRatings.includes(doctorRating);
  };

  // Helper function to check if a doctor matches the language filter
  const matchesLanguageFilter = (doctor) => {
    if (selectedLanguages.length === 0) return true;
    
    // In a real app, you'd have actual language data for each doctor
    // This is a placeholder implementation
    const doctorLanguages = doctor.languages || ['English'];
    
    return selectedLanguages.some(language => doctorLanguages.includes(language));
  };

  // Helper function to check if a doctor matches the availability filter
  const matchesAvailabilityFilter = (doctor) => {
    if (selectedAvailability.length === 0) return true;
    
    // This is a placeholder implementation
    const doctorAvailability = doctor.availability || ['Morning', 'Evening'];
    
    return selectedAvailability.some(time => doctorAvailability.includes(time));
  };

  // Helper function to check if a doctor matches the experience filter
  const matchesExperienceFilter = (doctor) => {
    if (selectedExperience.length === 0) return true;
    
    // Convert experience years to experience range category
    const getExperienceCategory = (years) => {
      if (years <= 3) return '1-3 years';
      if (years <= 5) return '3-5 years';
      if (years <= 10) return '5-10 years';
      return '10+ years';
    };
    
    const doctorExperienceYears = parseInt(doctor.experience) || 5;
    const doctorExperienceCategory = getExperienceCategory(doctorExperienceYears);
    
    return selectedExperience.includes(doctorExperienceCategory);
  };

  const getFilteredDoctors = () => {
    const normalizedSearch = normalize(searchQuery);
    
    // First, filter doctors based on search query and state
    let filteredResults = [
      ...doctors.filter(
        (doctor) =>
          (normalizedSearch === "" || matchSpeciality(doctor.medicalSpeciality, normalizedSearch)) &&
          (selectedState === "" || normalize(doctor.state) === normalize(selectedState))
      ),
      ...doctorDetails
        .filter(
          (doc) =>
            (normalizedSearch === "" || matchSpeciality(doc.speciality, normalizedSearch)) &&
            (selectedState === "" || normalize(doc.Address).includes(normalize(selectedState)))
        )
        .map((doc, index) => ({
          id: `dummy-${index}`,
          fullName: doc.name || "Not Mentioned",
          medicalSpeciality: doc.speciality || "Not Mentioned",

          experience: "5", // Added default for demonstration

          city: doc.locality || "Not Mentioned",
          state: "Not Mentioned",
          country: "India",
          hospitalCurrentWorking: doc.Address || "Not Mentioned",
          medicalLicenseNumber: "Not Mentioned",
          doctorPhoto: null,
          phone: isNaN(doc.phone) ? "Not Mentioned" : doc.phone,
          email: doc.email || "Not Mentioned",

          // Added simulated fields for filtering
          consultationFee: Math.floor(Math.random() * 5000) + 100,
          rating: Math.floor(Math.random() * 5) + 1,
          languages: ['English', Math.random() > 0.5 ? 'Hindi' : 'Tamil'],
          availability: [
            Math.random() > 0.5 ? 'Morning' : 'Afternoon',
            Math.random() > 0.5 ? 'Evening' : 'Night'
          ]
        }))

    ];
    
    // Then apply all the checkbox filters
    return filteredResults.filter(doctor => 
      matchesSymptomFilter(doctor) &&
      matchesSpecialtyFilter(doctor) &&
      matchesLocationFilter(doctor) &&
      matchesFeeFilter(doctor) &&
      matchesRatingFilter(doctor) &&
      matchesLanguageFilter(doctor) &&
      matchesAvailabilityFilter(doctor) &&
      matchesExperienceFilter(doctor)
    );
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

  // Generic handler for checkbox changes
  const handleFilterChange = (value, setter) => {
    setter(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  // Generic handler for removing selected items
  const removeSelectedItem = (item, setter) => {
    setter(prev => prev.filter(i => i !== item));
  };

  // Generic handler for toggling dropdowns
  const toggleFilterDropdown = (setter) => {
    setter(prev => !prev);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedSymptoms([]);
    setSelectedSpecialties([]);
    setSelectedLocations([]);
    setSelectedFees([]);
    setSelectedRatings([]);
    setSelectedLanguages([]);
    setSelectedAvailability([]);
    setSelectedExperience([]);
    setSearchQuery("");
    setSelectedState("");
  };

  return (
    <>
      <div className="header-placeholder"></div>

      <div className="findDoctorPage-main-container">
        {/* Filter sidebar */}
        <div className="finddoctor-filter-section">
          <div className="filter-header">
            <h2>Filters</h2>
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              Clear All
            </button>
          </div>

          {/* Selected filters display */}
          {(selectedSymptoms.length > 0 || 
            selectedSpecialties.length > 0 || 
            selectedLocations.length > 0 || 
            selectedFees.length > 0 ||
            selectedRatings.length > 0 ||
            selectedLanguages.length > 0 ||
            selectedAvailability.length > 0 ||
            selectedExperience.length > 0) && (
            <div className="selected-filters">
              <h3>Applied Filters</h3>
              <div className="filter-tags">
                {selectedSymptoms.map(symptom => (
                  <span key={symptom} className="filter-tag">
                    {symptom}
                    <button onClick={() => removeSelectedItem(symptom, setSelectedSymptoms)}>×</button>
                  </span>
                ))}
                {selectedSpecialties.map(specialty => (
                  <span key={specialty} className="filter-tag">
                    {specialty}
                    <button onClick={() => removeSelectedItem(specialty, setSelectedSpecialties)}>×</button>
                  </span>
                ))}
                {selectedLocations.map(location => (
                  <span key={location} className="filter-tag">
                    {location}
                    <button onClick={() => removeSelectedItem(location, setSelectedLocations)}>×</button>
                  </span>
                ))}
                {selectedFees.map(fee => (
                  <span key={fee} className="filter-tag">
                    ₹{fee}
                    <button onClick={() => removeSelectedItem(fee, setSelectedFees)}>×</button>
                  </span>
                ))}
                {selectedRatings.map(rating => (
                  <span key={rating} className="filter-tag">
                    {rating} Star
                    <button onClick={() => removeSelectedItem(rating, setSelectedRatings)}>×</button>
                  </span>
                ))}
                {selectedLanguages.map(language => (
                  <span key={language} className="filter-tag">
                    {language}
                    <button onClick={() => removeSelectedItem(language, setSelectedLanguages)}>×</button>
                  </span>
                ))}
                {selectedAvailability.map(time => (
                  <span key={time} className="filter-tag">
                    {time}
                    <button onClick={() => removeSelectedItem(time, setSelectedAvailability)}>×</button>
                  </span>
                ))}
                {selectedExperience.map(exp => (
                  <span key={exp} className="filter-tag">
                    {exp}
                    <button onClick={() => removeSelectedItem(exp, setSelectedExperience)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Symptoms filter */}
          <div className="filter-section">
            <h3
              className="sidetext-dropdown-header"
              onClick={() => toggleFilterDropdown(setShowDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Symptoms {showDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </h3>

            {showDropdown && (
              <ul className="dropdown-content">
                {symptoms.map((symptom, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(symptom)}
                        onChange={() => handleFilterChange(symptom, setSelectedSymptoms)}
                        className="symptoms-checkedbox"
                      />
                      {symptom}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Specialty filter */}
          <div className="filter-section">
            <h3
              className="sidetext-dropdown-header"
              onClick={() => toggleFilterDropdown(setShowSpecialtyDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Specialty {showSpecialtyDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </h3>

            {showSpecialtyDropdown && (
              <ul className="dropdown-content">
                {specialties.map((specialty, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedSpecialties.includes(specialty)}
                        onChange={() => handleFilterChange(specialty, setSelectedSpecialties)}
                        className="symptoms-checkedbox"
                      />
                      {specialty}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Location filter */}
          <div className="filter-section">
            <h3
              className="sidetext-dropdown-header"
              onClick={() => toggleFilterDropdown(setShowLocationDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Location {showLocationDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </h3>

            {showLocationDropdown && (
              <ul className="dropdown-content">
                {locations.map((location, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location)}
                        onChange={() => handleFilterChange(location, setSelectedLocations)}
                        className="symptoms-checkedbox"
                      />
                      {location}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Consultation Fee filter */}
          <div className="filter-section">
            <h3
              className="sidetext-dropdown-header"
              onClick={() => toggleFilterDropdown(setShowFeeDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Consultation Fee {showFeeDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </h3>

            {showFeeDropdown && (
              <ul className="dropdown-content">
                {fees.map((fee, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedFees.includes(fee)}
                        onChange={() => handleFilterChange(fee, setSelectedFees)}
                        className="symptoms-checkedbox"
                      />
                      ₹{fee} or less
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Rating filter */}
          <div className="filter-section">
            <h3
              className="sidetext-dropdown-header"
              onClick={() => toggleFilterDropdown(setShowRatingDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Rating {showRatingDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </h3>

            {showRatingDropdown && (
              <ul className="dropdown-content">
                {ratings.map((rating, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => handleFilterChange(rating, setSelectedRatings)}
                        className="symptoms-checkedbox"
                      />
                      {rating} Star{rating > 1 ? 's' : ''}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Language filter */}
          <div className="filter-section">
            <h3
              className="sidetext-dropdown-header"
              onClick={() => toggleFilterDropdown(setShowLanguageDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Language {showLanguageDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </h3>

            {showLanguageDropdown && (
              <ul className="dropdown-content">
                {languages.map((language, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(language)}
                        onChange={() => handleFilterChange(language, setSelectedLanguages)}
                        className="symptoms-checkedbox"
                      />
                      {language}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Availability filter */}
          <div className="filter-section">
            <h3
              className="sidetext-dropdown-header"
              onClick={() => toggleFilterDropdown(setShowAvailabilityDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Availability {showAvailabilityDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </h3>

            {showAvailabilityDropdown && (
              <ul className="dropdown-content">
                {availability.map((time, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedAvailability.includes(time)}
                        onChange={() => handleFilterChange(time, setSelectedAvailability)}
                        className="symptoms-checkedbox"
                      />
                      {time}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Experience filter */}
          <div className="filter-section">
            <h3
              className="sidetext-dropdown-header"
              onClick={() => toggleFilterDropdown(setShowExperienceDropdown)}
              style={{ cursor: 'pointer' }}
            >
              Experience {showExperienceDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </h3>

            {showExperienceDropdown && (
              <ul className="dropdown-content">
                {experience.map((exp, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedExperience.includes(exp)}
                        onChange={() => handleFilterChange(exp, setSelectedExperience)}
                        className="symptoms-checkedbox"
                      />
                      {exp}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Main content area */}
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

          <div className="filter-summary">
            <p>Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}</p>
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
                    <h3 className="card-text-head">
                      Dr. {doctor.fullName?.toUpperCase() || "Not Mentioned"}
                    </h3>
                    <p>
                      <strong>Specialty:</strong>{" "}
                      {doctor.medicalSpeciality || "Not Mentioned"}
                    </p>
                    <p>
                      <strong>Experience:</strong> {doctor.experience}{" "}
                      {doctor.experience !== "Not Mentioned"}
                    </p>
                    <p>
                      <strong>Location:</strong> {doctor.city},{" "}
                      {doctor.state !== "Not Mentioned" ? doctor.state : ""}{" "}
                      {doctor.country}
                    </p>
                    {/* <p>
                      <strong>Hospital:</strong>{" "}
                      {doctor.hospitalCurrentWorking || "Not Mentioned"}
                    </p> */}
                    {/* <p>
                      <strong>License:</strong>{" "}
                      {doctor.medicalLicenseNumber || "Not Mentioned"}
                    </p> */}
                    {/* <p>
                      <strong>Gender:</strong>{""}
                      {doctor.gender || "Not Mentioned"}
                    </p> */}
                    <p>
                      <strong>Language: </strong>{""}
                      {doctor.languages || "Not Mentioned"}
                    </p>
                    <p>
                      <strong>Rating: </strong>{""}
                      {doctor.rating || "Not Mentioned"}
                    </p>
                    <p>
                      <strong>Consultation Fee: </strong>{""}
                      {doctor.consultationFee || "Not Mentioned"}
                    </p>
                    {/* Show fee and rating if available */}
                    {doctor.consultationFee && (
                      <p>
                        <strong>Fee:</strong> ₹{doctor.consultationFee}
                      </p>
                    )}
                    {doctor.rating && (
                      <p>
                        <strong>Rating:</strong> {doctor.rating} ★
                      </p>
                    )}
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
      </div>
    </>
  );
};

export default FindDoctorPage;