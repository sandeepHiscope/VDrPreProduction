import React from "react";
import "./doctorID.css"; // Assuming you have a CSS file for styling

const DoctorID = () => {
  const doctor = {
    name: "Dr. Jane Smith",
    license: "MD12345",
    expiry: "2025-12-31",
    specialization: "Cardiology",
    clinics: "City Hospital, Private Clinic",
    experience: "A dedicated cardiologist with 15+ years of experience in treating various heart conditions.",
    image: "src/assets/Images/headerImages/doc.jpg"
  };

  return (
    <div className="doctor-card1">
      <img src="src/assets/Images/commonImg/VDrlogoBg.png" alt="Logo" className="logo" />
      <img src={doctor.image} alt={doctor.name} className="doctor-img" />
      <h2>{doctor.name}</h2>

      <div className="details">
        <p><strong>License          :</strong> {doctor.license}</p>
        <p><strong>Expiry           :</strong> {doctor.expiry}</p>
        <p><strong>Specialization   :</strong> {doctor.specialization}</p>
        <p><strong>Clinics/Hospitals:</strong> {doctor.clinics}</p>
      </div>

      <p className="experience">{doctor.experience}  </p>
      
      <div className="button-group">
        <button className="book-btn1">Book Appointment</button>
        <button className="rate-btn1">Rate</button>
      </div>
    </div>
  );
};

export default DoctorID;
