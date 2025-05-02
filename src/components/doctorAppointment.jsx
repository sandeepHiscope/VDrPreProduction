import React, { useState } from "react";
import "./doctorAppointment.css";

const dummyDoctorData = {
  id: "doc123",
  name: "Dr. John Doe",
  specialty: "Cardiologist",
  experience: "10 yrs",
    rating: 4.6,
  hospital: {
    name: "City Health Hospital",
    address: "123 Main Street, Metropolis"
  },
  fee: 1000,
  image: "./src/assets/Images/foundersImg/sai.jpg"
};

const DoctorAppointment = () => {
  const [mode, setMode] = useState("inClinic");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const today = new Date();
  const twoWeeks = [...Array(14)].map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const timeSlots = Array.from({ length: 22 }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime("");
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const renderInClinic = () => (
    <div className="appointment-content">
      <div className="doctor-header">
        <img src={dummyDoctorData.image} alt="Doctor" className="doctor-image" />
        <div className="doctor-details">
          <h3>{dummyDoctorData.name}</h3>
          <p>{dummyDoctorData.specialty} - {dummyDoctorData.experience} experience</p>
            <p>Rating: {dummyDoctorData.rating} ⭐</p>
        </div>
      </div>
      <div className="hospital-details">
        <h4>{dummyDoctorData.hospital.name}</h4>
        <p>{dummyDoctorData.hospital.address}</p>
      </div>
      <div className="date-slot">
        <label>Select Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} min={twoWeeks[0]} max={twoWeeks[13]} />
      </div>
      {selectedDate && (
        <div className="time-slot">
          <label>Select Time Slot:</label>
          <div className="slots">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={selectedTime === time ? "active" : ""}
                onClick={() => handleTimeChange(time)}>
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedTime && (
        <div className="confirmation">
          <p>Selected Slot: {selectedDate} at {selectedTime}</p>

          <div className="notes-box">
  <label htmlFor="notes">Patient Symptoms / Notes:</label>
  <textarea
    id="notes"
    placeholder="Describe symptoms or any other relevant info..."
    className="notes-input"
    rows="3"
  ></textarea>
</div>

<div className="file-upload-box">
  <label htmlFor="reports">Upload Medical Reports (X-rays, Blood Tests, etc.):</label>
  <input
    type="file"
    id="reports"
    multiple
    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
    className="file-input"
  />
</div>


          <div className="coupon-box">
  <label htmlFor="coupon">Apply Coupon:</label>
  <input
    type="text"
    id="coupon"
    placeholder="Enter coupon code"
    className="coupon-input"
  />
</div>

          <button className="payment-button">Pay ₹{dummyDoctorData.fee}</button>
        </div>
      )}
    </div>
  );

  const renderOnline = () => (
    <div className="appointment-content">
      <div className="doctor-header">
        <img src={dummyDoctorData.image} alt="Doctor" className="doctor-image" />
        <div className="doctor-details">
          <h3>{dummyDoctorData.name}</h3>
          <p>{dummyDoctorData.specialty} - {dummyDoctorData.experience} experience</p>
            <p>Rating: {dummyDoctorData.rating} ⭐</p>
        </div>
      </div>
      <div className="date-slot">
        <label>Select Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} min={twoWeeks[0]} max={twoWeeks[13]} />
      </div>
      {selectedDate && (
        <div className="time-slot">
          <label>Select Time Slot:</label>
          <div className="slots">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={selectedTime === time ? "active" : ""}
                onClick={() => handleTimeChange(time)}>
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedTime && (
        <div className="confirmation">
          <p>Selected Slot: {selectedDate} at {selectedTime}</p>

          <div className="notes-box">
  <label htmlFor="notes">Patient Symptoms / Notes:</label>
  <textarea
    id="notes"
    placeholder="Describe symptoms or any other relevant info..."
    className="notes-input"
    rows="3"
  ></textarea>
</div>

<div className="file-upload-box">
  <label htmlFor="reports">Upload Medical Reports (X-rays, Blood Tests, etc.):</label>
  <input
    type="file"
    id="reports"
    multiple
    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
    className="file-input"
  />
</div>

          <div className="coupon-box">
  <label htmlFor="coupon">Apply Coupon:</label>
  <input
    type="text"
    id="coupon"
    placeholder="Enter coupon code"
    className="coupon-input"
  />
</div>
          <button className="payment-button">Pay ₹{dummyDoctorData.fee}</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="appointment-card">
      <div className="mode-toggle">
        <button
          className={mode === "inClinic" ? "active" : ""}
          onClick={() => setMode("inClinic")}>In Clinic</button>
        <button
          className={mode === "online" ? "active" : ""}
          onClick={() => setMode("online")}>Online</button>
      </div>
      {mode === "inClinic" ? renderInClinic() : renderOnline()}
    </div>
  );
};

export default DoctorAppointment;
