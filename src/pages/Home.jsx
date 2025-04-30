///Tailwind css used in this region

import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
// image imports
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import GooglePlayLogo from "../assets/icons/apps/googleplay.png";
import AppStoreLogo from "../assets/icons/apps/applestore.png";
import CardsSlider from "../components/cardsSlider";
import indiaUsaStates from "../data/indiaUsaStates";
import doctorCategories from "../data/doctorCategories";
import tempImg from "../assets/Images/foundersImg/kiran.jpg";
import ScrollingCardsContainer from "../components/ScrollingCardsContainer";
import FindDoctorPage from "./findDoctorPage";

function Homepage() {
  const [isHomePageRendered, setIsHomePageRendered] = useState(false);

  useEffect(() => {
    console.log("Home Page Rendered");
    setIsHomePageRendered(true);
  }, []);

  // Function to handle button click
  const handleButtonClick = (store) => {
    alert(`Redirecting to ${store}`);
    // Add your redirection logic here
  };

  // Define state for country, state, and search input
  const [country, setCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // States for India and USA

  // List of doctor types

  // Update state dropdown based on selected country
  const updateStates = (e) => {
    setCountry(e.target.value);
    setSelectedState("");
  };

  // Filter doctor types based on search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter doctor types based on query
    if (query) {
      const filtered = doctorCategories.filter((doctor) =>
        doctor.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  };

  // Select doctor type from suggestions
  const selectDoctorType = (doctor) => {
    setSearchQuery(doctor);
    setFilteredDoctors([]); // Hide suggestions after selection
  };

  // doctoropinio
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector("open-icon");

      answer.classList.toggle("open");
      icon.classList.toggle("rotate");
    });
  });

  const [activeSlides, setActiveSlides] = useState("doctor");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const doctorSlides = [
    "Detailed medical explanation about health care.",
    "Expert advice on how to maintain a healthy lifestyle.",
    "Tips on managing chronic conditions effectively.",
  ];

  const patientSlides = [
    "Real-life experience with the treatment process.",
    "How the treatment helped improve my quality of life.",
    "Personal journey with the doctors and staff.",
  ];

  const slides = activeSlides === "doctor" ? doctorSlides : patientSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides]);

  const showSlides = (type) => {
    setActiveSlides(type);
    setCurrentSlideIndex(0); // Reset to the first slide when switching
  };

  return (
    <>
      <div className="homepage-container flex flex-col justify-center items-center">
        <Link to="/findDoctorPage">
          <div className="searchbar-container">
            <input
              type="text"
              placeholder="Search for Doctors near by you"
              className="searchbar-input"
            />
            <button className="searchbar-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="searchbar-icon"
              >
                <path d="M10 2a8 8 0 105.29 14.29l4.31 4.31a1 1 0 001.41-1.41l-4.31-4.31A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
            </button>
          </div>
        </Link>

        {/* Cards Slider Section */}
        {/* <div className="SlidingSecContainer"> */}
          <CardsSlider />

        <h2>More Categories to help you</h2>
        <section          className="categorySection">

        <ul className="categoryList">
          <li className="categoryItem">Dentist</li>
          <li className="categoryItem">Cardiologist</li>
          <li className="categoryItem">Dermatologist</li>
          <li className="categoryItem">Pediatrician</li>
          <li className="categoryItem">Orthopedic</li>
          <li className="categoryItem">General Physician</li>
          <li className="categoryItem">ENT Specialist</li>
          <li className="categoryItem">Gynecologist</li>
          <li className="categoryItem">Urologist</li>
          <li className="categoryItem">Neurologist</li>
          <li className="categoryItem">Psychiatrist</li>
          <li className="categoryItem">Oncologist</li>
          <li className="categoryItem">Gastroenterologist</li>
        </ul>
          
      </section>

      <section className="symptomsSection">
          <h2>Based on Symptoms</h2>
          <ul className="symptomsList">
            <li className="symptomsItem">Toothache</li>
            <li className="symptomsItem">Chest Pain</li>
            <li className="symptomsItem">Skin Rash</li>
            <li className="symptomsItem">Fever</li>
            <li className="symptomsItem">Joint Pain</li>
            <li className="symptomsItem">Cough</li>
            <li className="symptomsItem">Hearing Loss</li>
            <li className="symptomsItem">Irregular Periods</li>
            <li className="symptomsItem">Urinary Issues</li>
            <li className="symptomsItem">Headache</li>
            <li className="symptomsItem">Anxiety</li>
            <li className="symptomsItem">Lump or Swelling</li>
            <li className="symptomsItem">Abdominal Pain</li>
            <li className="symptomsItem">Back Pain</li>
            <li className="symptomsItem">Hair Loss</li>
            <li className="symptomsItem">Allergies</li>
            <li className="symptomsItem">Weight Loss</li>
            <li className="symptomsItem">Nausea</li>
            <li className="symptomsItem">Vision Problems</li>
            <li className="symptomsItem">Fatigue</li>
          </ul>
        </section>
   
        {/* Testimonials (reviews) Section */}
        <section className="content-section testimonials-section">
          <div className="section-header">
            <h2 className="text2">
              Trusted By Users, Assured By Verified Doctors
            </h2>
            <div className="section-underline"></div>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                Very helpful and easy to use. I booked an appointment within minutes and got proper consultation from home. Saved time and stress. Highly recommend!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={tempImg} alt="Sarah M." />
                </div>
                <div className="author-info">
                  <h4>p.praveen sindhu</h4>
                  <p>Patient since 2023</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                "Best experience with online healthcare. The app is smooth, doctors are professional, and reports were easy to access. Felt taken care of."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={tempImg} alt="Dr. James L." />
                </div>
                <div className="author-info">
                  <h4>Dr.L.v.s vishnuvardhanreddy.</h4>
                  <p>Cardiologist, Verified Provider</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                "Game changer for health issues. Especially during busy weeks, having a doctor a tap away really helped. Prescriptions were clear and timely."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={tempImg} alt="Robert K." />
                </div>
                <div className="author-info">
                  <h4>k.Anjaneyulu</h4>
                  <p>Parent of patient</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <div className="download-section ">
          <div className="download-container m-8 w-3/4 flex justify-evenly  items-center p-2 rounded-2xl">
            <div className="app-preview">
              <img
                src={VDrLogo}
                height="400px"
                width="900px"
                alt="App Preview"
              />
            </div>
            <div className="app-info">
              <h2 className="app-title">Download VDr App</h2>
              <p className="app-description">
                Consult with India's top doctors via video on VDr app. Get 24/7
                access to healthcare.
              </p>
              <div className="store-buttons">
                <div className="store-button">
                  <Link>
                    <img src={GooglePlayLogo} alt="Google Play Store" />
                  </Link>
                </div>
                <div className="store-button">
                  <Link>
                    <img src={AppStoreLogo} alt="Apple App Store" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="faq-container">
    <div class="faq-header">
      <h2>Frequently Asked Questions</h2>
    </div>

    <div class="faq-item">
      <input type="checkbox" id="faq1" />
      <label for="faq1">
        What is your refund policy?
        <span class="icon">+</span>
      </label>
      <div class="faq-content">
        We offer a full refund within 30 days of purchase if you're not satisfied with our service. Please contact support for more details.
      </div>
    </div>

    <div class="faq-item">
      <input type="checkbox" id="faq2" />
      <label for="faq2">
        How do I get customer support?
        <span class="icon">+</span>
      </label>
      <div class="faq-content">
        You can reach our support team 24/7 via email or through the support chat on our website.
      </div>
    </div>

    <div class="faq-item">
      <input type="checkbox" id="faq3" />
      <label for="faq3">
        Can I upgrade my plan later?
        <span class="icon">+</span>
      </label>
      <div class="faq-content">
        Absolutely! You can upgrade or downgrade your plan anytime through your account settings. Changes take effect immediately.
      </div>
    </div>

    <div class="faq-item">
      <input type="checkbox" id="faq4" />
      <label for="faq4">
        Is my data secure?
        <span class="icon">+</span>
      </label>
      <div class="faq-content">
        Yes. We use bank-level encryption, regular audits, and comply with GDPR and other global privacy regulations to keep your data safe.
      </div>
    </div>
  </div>
      </div>
    </>
  );
}

export default Homepage;
