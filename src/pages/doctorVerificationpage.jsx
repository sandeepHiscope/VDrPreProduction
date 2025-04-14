import React, { useState } from "react";
import "./doctorVerificationpage.css";
import { useNavigate } from "react-router-dom";
import Fotter from "../components/footer";

const DoctorVerification = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    medicalLicenseNumber: "",
    medicalLicense: null,
    medicalSpecialty: "",
    boardCertificate: null,
    educationBackground: "",
    educationCertificates: null,
    hospitalWorking: "",
    experience: "",
    hospitalClinic: "",
    complaints: "",
    description: "",
  });

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


    try {
      const response = await fetch("http://localhost:8080/api/doctorsverification/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Doctor verification form submitted successfully!");
        setFormData({
          fullName: "",
          medicalLicenseNumber: "",
          medicalLicense: null,
          medicalSpecialty: "",
          boardCertificate: null,
          educationBackground: "",
          educationCertificates: null,
          hospitalWorking: "",
          experience: "",
          hospitalClinic: "",
          complaints: "",
          description: "",
        });
        navigate("/demoPage");
      } else {
        const error = await response.text();
        throw new Error(error || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting doctor verification form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
   <div  className="doctorverification-page-container"> 
      <div className="login-change">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b07d1dfbb02eae67caa3e2cfdf5c9867238ca7e72eb515ca4ba7a5fa71896a65"
          alt="Healthcare illustration"
          className="hero-image1"
        />
      </div>

      <div className="doctorverification-container">
        <div className="doctorverification-container1">
          <h2 className="doctorVerification-h2">Doctor Verification Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Medical License Number *</label>
              <input
                type="text"
                name="medicalLicenseNumber"
                value={formData.medicalLicenseNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Medical License *</label>
              <input
                type="file"
                name="medicalLicense"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Medical Specialty *</label>
              <input
                type="text"
                name="medicalSpecialty"
                value={formData.medicalSpecialty}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Board Certificate *</label>
              <input
                type="file"
                name="boardCertificate"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Educational Background *</label>
              <input
                type="text"
                name="educationBackground"
                value={formData.educationBackground}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Educational Certificates *</label>
              <input
                type="file"
                name="educationCertificates"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Hospital Currently Working *</label>
              <input
                type="text"
                name="hospitalWorking"
                value={formData.hospitalWorking}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Experience *</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Hospital (or) Clinic *</label>
              <input
                type="text"
                name="hospitalClinic"
                value={formData.hospitalClinic}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Any Complaints or Disciplinary Actions Filed?</label>
              <select
                name="complaints"
                value={formData.complaints}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description (If any?)</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide any details..."
                className="doctorVerification-textarea"
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
      </div>
  );
};

export default DoctorVerification;
