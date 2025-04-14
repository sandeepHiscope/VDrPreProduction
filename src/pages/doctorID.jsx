import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./doctorID.css";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";

const DoctorID = () => {
  const location = useLocation();
  const { doctor: stateDoctor } = location.state;
  const { id } = useParams();

  const doctor = {
    name: stateDoctor?.fullName ,
    license: stateDoctor?.medicalLicenseNumber || "MD12345",
    expiry: stateDoctor?.expiry || "2025-12-31",
    specialization: stateDoctor?.medicalSpeciality,
    clinics: stateDoctor?.hospitalCurrentWorking || "City Hospital, Private Clinic",
    experience:
      `A dedicated cardiologist with${stateDoctor?.experience}+years of experience in treating various heart conditions. `||
      "A dedicated cardiologist with 15+ years of experience in treating various heart conditions.",
    image: stateDoctor?.doctorPhoto
      ? `data:image/jpeg;base64,${stateDoctor.doctorPhoto}`
      : "src/assets/Images/headerImages/doc.jpg",
  };

  return (
    <div className="doctor-card1">
      <img src={VDrLogo} alt="Logo" className="logo" />
      <img src={doctor.image} alt={doctor.name} className="doctor-img" />
      <h2>Dr. {doctor.name.toUpperCase()}</h2>

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
