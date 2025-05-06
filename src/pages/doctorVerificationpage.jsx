
import React, { useState } from 'react';
import './DoctorVerificationPage.css';
import { useNavigate, useLocation } from "react-router-dom";

const DoctorVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorEmail = location.state?.email || "";
  
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: '',
    email: doctorEmail,
    gender: '',
    age: '',
    personalAddress: '',
    doctorPhoto: null,
    medicalLicenseNumber: "",
    licenseExpiry: '',
    medicalLicense: null,
    medicalSpecialty: "",
    boardCertificate: null,
    educationBackground: "",
    educationCertificates: null,
    language: '',
    experience: "",
    hospitalWorking: "",
    hospitalClinic: "",
    complaints: "",
    description: "",
    country: "",
    state: "",
    city: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    formDataToSend.append('email', formData.email);
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('medicalLicenseNumber', formData.medicalLicenseNumber);
    formDataToSend.append('medicalSpeciality', formData.medicalSpecialty);
    formDataToSend.append('educationalBackground', formData.educationBackground);
    formDataToSend.append('hospitalCurrentWorking', formData.hospitalWorking);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('hospitalOrClinic', formData.hospitalClinic);
    formDataToSend.append('disciplinaryActions', formData.complaints);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('mobileNo', formData.mobileNo);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('personalAddress', formData.personalAddress);
    formDataToSend.append('language', formData.language);
    
    if (formData.medicalLicense) {
      formDataToSend.append('medicalLicenseFile', formData.medicalLicense);
    }
    if (formData.boardCertificate) {
      formDataToSend.append('boardCertificateFile', formData.boardCertificate);
    }
    if (formData.educationCertificates) {
      formDataToSend.append('educationalCertificateFile', formData.educationCertificates);
    }
    if (formData.doctorPhoto) {
      formDataToSend.append('doctorPhoto', formData.doctorPhoto);
    }

    try {
      const response = await fetch("http://localhost:8080/doctorverfication/save", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Doctor verification submitted successfully!");
        navigate("/docDashboard");
      } else {
        const error = await response.text();
        throw new Error(error || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting doctor verification form:", error);
      alert(`Error submitting form: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <h1>Doctor Verification Form</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-sections">
            {/* Personal Information Section */}
            <div className="form-section">
              <h2>Personal Information</h2>
              
              <div className="input-group full-width">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="mobileNo">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    readOnly={doctorEmail !== ""}
                    required
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label htmlFor="age">Age *</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    min="18"
                    required
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="language">Languages *</label>
                  <input
                    type="text"
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    placeholder="Languages (comma separated)"
                    required
                  />
                </div>
              </div>
              
              <div className="input-group full-width">
                <label htmlFor="personalAddress">Personal Address *</label>
                <textarea
                  id="personalAddress"
                  name="personalAddress"
                  value={formData.personalAddress}
                  onChange={handleChange}
                  placeholder="Personal Address"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="file-upload-group">
                <label htmlFor="doctorPhoto">Doctor Photo *</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="doctorPhoto"
                    name="doctorPhoto"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                  <div className="file-upload-label">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>{formData.doctorPhoto ? formData.doctorPhoto.name : 'Upload Photo'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Information Section */}
            <div className="form-section">
              <h2>Professional Information</h2>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="medicalLicenseNumber">Medical License Number *</label>
                  <input
                    type="text"
                    id="medicalLicenseNumber"
                    name="medicalLicenseNumber"
                    value={formData.medicalLicenseNumber}
                    onChange={handleChange}
                    placeholder="License Number"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="licenseExpiry">License Expiry Date *</label>
                  <input
                    type="date"
                    id="licenseExpiry"
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="file-upload-row">
                <div className="file-upload-group">
                  <label htmlFor="medicalLicense">Medical License Document *</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="medicalLicense"
                      name="medicalLicense"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                    />
                    <div className="file-upload-label">
                      <i className="fas fa-file-pdf"></i>
                      <span>{formData.medicalLicense ? formData.medicalLicense.name : 'Upload License'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="file-upload-group">
                  <label htmlFor="boardCertificate">Board Certificate *</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="boardCertificate"
                      name="boardCertificate"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                    />
                    <div className="file-upload-label">
                      <i className="fas fa-file-medical"></i>
                      <span>{formData.boardCertificate ? formData.boardCertificate.name : 'Upload Certificate'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="medicalSpecialty">Medical Specialty *</label>
                  <input
                    type="text"
                    id="medicalSpecialty"
                    name="medicalSpecialty"
                    value={formData.medicalSpecialty}
                    onChange={handleChange}
                    placeholder="Specialization"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="experience">Experience (Years) *</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Years of Experience"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div className="input-group full-width">
                <label htmlFor="educationBackground">Educational Background *</label>
                <input
                  type="text"
                  id="educationBackground"
                  name="educationBackground"
                  value={formData.educationBackground}
                  onChange={handleChange}
                  placeholder="Educational Background"
                  required
                />
              </div>
              
              <div className="file-upload-group">
                <label htmlFor="educationCertificates">Educational Certificates *</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="educationCertificates"
                    name="educationCertificates"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <div className="file-upload-label">
                    <i className="fas fa-file-pdf"></i>
                    <span>{formData.educationCertificates ? formData.educationCertificates.name : 'Upload Certificates'}</span>
                  </div>
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="hospitalWorking">Hospital Currently Working *</label>
                  <input
                    type="text"
                    id="hospitalWorking"
                    name="hospitalWorking"
                    value={formData.hospitalWorking}
                    onChange={handleChange}
                    placeholder="Current Hospital"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="hospitalClinic">Hospital/Clinic Name *</label>
                  <input
                    type="text"
                    id="hospitalClinic"
                    name="hospitalClinic"
                    value={formData.hospitalClinic}
                    onChange={handleChange}
                    placeholder="Hospital/Clinic Name"
                    required
                  />
                </div>
              </div>
              
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="complaints">Any Complaints or Disciplinary Actions?</label>
                  <select
                    id="complaints"
                    name="complaints"
                    value={formData.complaints}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              
              {formData.complaints === 'yes' && (
                <div className="input-group full-width">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please provide details"
                    rows="3"
                  ></textarea>
                </div>
              )}
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Verification"}
            </button>
            <button type="reset" className="reset-button">Reset Form</button>
          </div>
        </form>
      </div>
      
      {/* Here's the Easter Egg! When you press the Konami code (up, up, down, down, left, right, left, right, b, a), 
          the form will briefly animate and show a fun doctor animation */}
      <div id="doctor-easter-egg" className="easter-egg">
        <div className="easter-egg-message">
          <h3>🎉 Congratulations! 🎉</h3>
          <p>You found the secret doctor mode!</p>
          <div className="dancing-doctor">👨‍⚕️</div>
        </div>
      </div>
    </div>
  );
};

// Konami code Easter Egg implementation
document.addEventListener('DOMContentLoaded', function() {
  // The Konami Code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiCodePosition = 0;

  document.addEventListener('keydown', function(e) {
    // Check if the key pressed matches the next key in the Konami Code sequence
    const requiredKey = konamiCode[konamiCodePosition];
    
    if (e.key === requiredKey) {
      konamiCodePosition++;
      
      // If the entire sequence has been entered correctly
      if (konamiCodePosition === konamiCode.length) {
        activateEasterEgg();
        konamiCodePosition = 0; // Reset for next time
      }
    } else {
      konamiCodePosition = 0; // Reset on incorrect key
    }
  });

  function activateEasterEgg() {
    const easterEgg = document.getElementById('doctor-easter-egg');
    easterEgg.classList.add('active');
    
    // Hide the easter egg after a few seconds
    setTimeout(() => {
      easterEgg.classList.remove('active');
    }, 5000);
  }
});

export default DoctorVerificationPage;