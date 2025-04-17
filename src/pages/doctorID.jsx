import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./doctorID.css";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";

const DoctorID = () => {
  const location = useLocation();
  const { doctor: stateDoctor } = location.state;
  const { id } = useParams();

  const doctor = {
    name: stateDoctor?.fullName || "not mentioned",
    license: stateDoctor?.medicalLicenseNumber || "not mentioned",
    expiry: stateDoctor?.expiry || "not mentioned",
    specialization: stateDoctor?.medicalSpeciality || "not mentioned",
    clinics: stateDoctor?.hospitalCurrentWorking || "not mentioned",
    experience:
      stateDoctor?.experience && stateDoctor?.experience !== "not mentioned"
        ? `A dedicated specialist with ${stateDoctor.experience}+ years of experience.`
        : "A dedicated specialist with experience not mentioned.",
    image: stateDoctor?.doctorPhoto
      ? `data:image/jpeg;base64,${stateDoctor.doctorPhoto}`
      : VDrLogo,
    phone: stateDoctor?.phone || "not mentioned",
    email: stateDoctor?.email || "not mentioned",
    address: stateDoctor?.hospitalCurrentWorking || "not mentioned"
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
        <p><strong>Phone            :</strong> {doctor.phone}</p>
        <p><strong>Email            :</strong> {doctor.email}</p>
        <p><strong>Address          :</strong> {doctor.address}</p>
      </div>

      <p className="experience">{doctor.experience}</p>

      <div className="button-group">
        <button className="book-btn1">Book Appointment</button>
        <button className="rate-btn1">Rate</button>
      </div>
    </div>
  );
};

export default DoctorID;
